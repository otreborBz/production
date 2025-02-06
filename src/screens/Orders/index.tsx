import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '../../theme/colors';
import { useModelos } from '../../contexts/ModelosContext';
import { Modelo } from '../../contexts/ModelosContext';
import { useHomeNavigation } from '../../contexts/HomeContext';
import { Button } from '../../components/Button';
import { useProducao } from '../../contexts/ProducaoContext';

const FAMILIAS = ['RG','AE2', 'AZ', 'VR', 'TC', 'TC2', 'TC3'];

type Order = {
  id: string;
  family: string;
  model: string;
  quantity: string;
};

export function Orders() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState(FAMILIAS[0]);
  const [model, setModel] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [modeloEncontrado, setModeloEncontrado] = useState<Modelo | null>(null);
  const { findModeloByName } = useModelos();
  const { handleBuscarModelo, removeModeloBuscado, modelosBuscados } = useHomeNavigation();
  const { adicionarProducao, removerProducao } = useProducao();
  
  const [orders, setOrders] = useState([]);

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
      // Atualizar ordem existente
      setOrders(orders.map(order => 
        order.id === editingOrder.id 
          ? {
              ...order,
              family: selectedFamily,
              model,
              quantity,
            }
          : order
      ));
    } else {
      // Criar nova ordem
      const newOrder = {
        id: String(Date.now()),
        family: selectedFamily,
        model,
        quantity,
      };
      setOrders([...orders, newOrder]);
      
      // Adicionar à produção diária
      adicionarProducao(model, Number(quantity));
    }
    
    handleCloseModal();
  }

  function handleCloseModal() {
    setModalVisible(false);
    setEditingOrder(null);
    setSelectedFamily(FAMILIAS[0]);
    setModel('');
    setQuantity('');
  }

  async function handleDeleteOrder(id: string) {
    const orderToDelete = orders.find(order => order.id === id);
    if (orderToDelete) {
      // Primeiro removemos a ordem da lista
      const updatedOrders = orders.filter(order => order.id !== id);
      setOrders(updatedOrders);

      // Agora verificamos se ainda existe alguma ordem com o mesmo modelo
      const hasOtherOrderWithSameModel = updatedOrders.some(
        order => order.model === orderToDelete.model
      );

      // Se não existir mais nenhuma ordem com o mesmo modelo
      if (!hasOtherOrderWithSameModel) {
        // Remove da Home
        const modeloToRemove = modelosBuscados.find(m => m.modelo === orderToDelete.model);
        if (modeloToRemove) {
          await removeModeloBuscado(modeloToRemove.id);
        }
        
        // Remove da Produção Diária
        removerProducao(orderToDelete.model);
      }
    }
  }

  function handleEditOrder(order: Order) {
    setEditingOrder(order);
    setSelectedFamily(order.family || FAMILIAS[0]);
    setModel(order.model || '');
    setQuantity(order.quantity);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      {/* Header da lista */}
      <View style={styles.listHeader}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Fam.</Text>
          <Text style={styles.headerText}>mod.</Text>
          <Text style={styles.headerText}>quant.</Text>
          <View style={styles.actionsHeader} />
        </View>
      </View>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderColumn}>{item.family}</Text>
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
            <Text style={styles.modalTitle}>
              {editingOrder ? 'Editar Ordem' : 'Nova Ordem'}
            </Text>
            
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Família:</Text>
              <Picker
                selectedValue={selectedFamily}
                onValueChange={(itemValue) => setSelectedFamily(itemValue)}
                style={styles.picker}
              >
                {FAMILIAS.map((familia) => (
                  <Picker.Item key={familia} label={familia} value={familia} />
                ))}
              </Picker>
            </View>
            
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