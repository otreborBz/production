import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Text, FlatList, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '../../theme/colors';
import { useModelos } from '../../contexts/ModelosContext';
import { Modelo } from '../../contexts/ModelosContext';
import { useHomeNavigation } from '../../contexts/HomeContext';
import { Button } from '../../components/Button';
import { useProducao } from '../../contexts/ProducaoContext';
import { storage } from '../../services/storage';
import { useOrders } from '../../contexts/OrdersContext';

type Order = {
  id: string;
  family: string;
  model: string;
  quantity: string;
};

export function Orders() {
  const { orders, setOrders } = useOrders();
  const [modalVisible, setModalVisible] = useState(false);
  const [model, setModel] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [modeloEncontrado, setModeloEncontrado] = useState<Modelo | null>(null);
  const { findModeloByName } = useModelos();
  const { handleBuscarModelo, removeModeloBuscado, modelosBuscados } = useHomeNavigation();
  const { adicionarProducao, removerProducao } = useProducao();
  
  // Carregar ordens salvas quando o app iniciar
  useEffect(() => {
    async function loadStoredOrders() {
      const storedOrders = await storage.getOrders();
      console.log('Ordens carregadas:', storedOrders); // Debug
      if (storedOrders) {
        setOrders(storedOrders);
      }
    }
    loadStoredOrders();
  }, []);

  // Salvar ordens sempre que houver mudanças
  useEffect(() => {
    console.log('Salvando ordens:', orders); // Debug
    async function saveOrdersToStorage() {
      console.log('Iniciando salvamento:', orders);
      await storage.saveOrders(orders);
      console.log('Salvamento concluído');
    }
    
    if (orders.length > 0) {
      saveOrdersToStorage();
    }
  }, [orders]);

  useEffect(() => {
    if (model) {
      const foundModelo = findModeloByName(model);
      setModeloEncontrado(foundModelo || null);
    } else {
      setModeloEncontrado(null);
    }
  }, [model]);

  function handleCreateOrder() {
    if (model) {
      handleBuscarModelo(model);
    }
    
    if (editingOrder) {
      const updatedOrders = orders.map(order => 
        order.id === editingOrder.id 
          ? {
              ...order,
              model,
              quantity,
            }
          : order
      );
      console.log('Atualizando ordem:', updatedOrders); // Debug
      setOrders(updatedOrders);
    } else {
      const newOrder = {
        id: String(Date.now()),
        family: '', // Remover a família
        model,
        quantity,
      };
      console.log('Nova ordem:', newOrder); // Debug
      setOrders(prevOrders => {
        const newOrders = [...prevOrders, newOrder];
        console.log('Estado atualizado:', newOrders); // Debug
        return newOrders;
      });
      
      adicionarProducao(model, Number(quantity));
    }
    
    handleCloseModal();
  }

  function handleCloseModal() {
    setModalVisible(false);
    setEditingOrder(null);
    setModel('');
    setQuantity('');
  }

  async function handleDeleteOrder(id: string) {
    const orderToDelete = orders.find(order => order.id === id);
    if (orderToDelete) {
      const updatedOrders = orders.filter(order => order.id !== id);
      setOrders(updatedOrders);

      const hasOtherOrderWithSameModel = updatedOrders.some(
        order => order.model === orderToDelete.model
      );

      if (!hasOtherOrderWithSameModel) {
        const modeloToRemove = modelosBuscados.find(m => m.modelo === orderToDelete.model);
        if (modeloToRemove) {
          await removeModeloBuscado(modeloToRemove.id);
        }
        removerProducao(orderToDelete.model);
      }
    }
  }

  function handleEditOrder(order: Order) {
    setEditingOrder(order);
    setModel(order.model || '');
    setQuantity(order.quantity);
    setModalVisible(true);
  }

  function handleClearOrders() {
    Alert.alert(
      'Limpar Ordens',
      'Tem certeza que deseja limpar todas as ordens? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            await storage.clearOrders();
            setOrders([]);
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      {/* Header da lista */}
      <View style={styles.listHeader}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Modelo</Text>
          <Text style={styles.headerText}>Quantidade</Text>
          <View style={styles.actionsHeader} />
        </View>
      </View>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text 
              style={styles.modelColumn}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.model.toUpperCase()}
            </Text>
            <Text style={styles.quantityColumn}>{item.quantity}</Text>
            <View style={styles.orderActions}>
            
              <TouchableOpacity 
                onPress={() => handleEditOrder(item)}
                style={styles.actionButton}
              >
                <MaterialIcons name="edit" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => handleDeleteOrder(item.id)}
                style={styles.actionButton}
              >
                <MaterialIcons name="close" size={20} color={COLORS.danger} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity 
        style={styles.clearButton}
        onPress={handleClearOrders}
      >
        <MaterialIcons name="delete-sweep" size={24} color={COLORS.danger} />
        <Text style={styles.clearButtonText}>Limpar Ordens</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.fabButton}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="add" size={32} color="#FFF" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Ordem</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Modelo"
              value={model}
              onChangeText={(text) => setModel(text.toUpperCase())}
              autoCapitalize="characters"
            />

            <TextInput
              style={styles.input}
              placeholder="Quantidade"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />

            <View style={styles.buttonContainer}>
              <Button
                title="Cancelar"
                onPress={handleCloseModal}
                variant="danger"
              />
              <Button
                title={editingOrder ? 'Atualizar' : 'Lançar'}
                onPress={handleCreateOrder}
              />
            </View>
          </View>
        </View>
      </Modal>

      {modeloEncontrado && (
        <View style={styles.modeloInfo}>
          <Text style={styles.modeloTitle}>Modelo Encontrado:</Text>
          <View style={styles.modeloCard}>
            <Text style={styles.modeloText}>Família: {modeloEncontrado.familia}</Text>
            <Text style={styles.modeloText}>Modelo: {modeloEncontrado.modelo}</Text>
            <View style={styles.fiosContainer}>
              <View style={styles.fioInfo}>
                <Text style={styles.fioTitle}>Fio da marcha:</Text>
                <Text>Modelo: {modeloEncontrado.fioMarcha.modeloFio}</Text>
                <Text>Resistência: {modeloEncontrado.fioMarcha.resistencia}Ω</Text>
              </View>
              <View style={styles.fioInfo}>
                <Text style={styles.fioTitle}>Fio auxiliar:</Text>
                <Text>Modelo: {modeloEncontrado.fioAuxiliar.modeloFio}</Text>
                <Text>Resistência: {modeloEncontrado.fioAuxiliar.resistencia}Ω</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}