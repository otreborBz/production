import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '../../theme/colors';
import { useProducao } from '../../contexts/ProducaoContext';
import { useProducaoHora } from '../../contexts/ProducaoHoraContext';
import { Picker } from '@react-native-picker/picker';

export function Dashboard() {
  const { producaoDiaria, atualizarMarcha, atualizarTeste, removerProducao } = useProducao();
  const [selectedModelo, setSelectedModelo] = useState<string | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [producaoHoraModalVisible, setProducaoHoraModalVisible] = useState(false);
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [metaHora, setMetaHora] = useState('');
  const [realProduzido, setRealProduzido] = useState('');
  const [codigoParada, setCodigoParada] = useState('');
  const [descricaoParada, setDescricaoParada] = useState('');
  const [detalhesModalVisible, setDetalhesModalVisible] = useState(false);
  const [producaoSelecionada, setProducaoSelecionada] = useState<ProducaoHora | null>(null);
  
  const { adicionarProducaoHora, producoesHora, buscarProducaoHora } = useProducaoHora();

  // Array com horários minuto a minuto (24h * 60min = 1440 minutos)
  const horariosDisponiveis = Array.from({ length: 1440 }, (_, i) => {
    const hour = Math.floor(i / 60);
    const minute = i % 60;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  function handleUpdateMarcha(id: string, value: string) {
    atualizarMarcha(id, Number(value) || 0);
  }

  function handleUpdateTeste(id: string, value: string) {
    atualizarTeste(id, Number(value) || 0);
  }

  function handleLongPress(modelo: string) {
    setSelectedModelo(modelo);
    setDeleteModalVisible(true);
  }

  function handleConfirmDelete() {
    if (selectedModelo) {
      removerProducao(selectedModelo);
    }
    setDeleteModalVisible(false);
    setSelectedModelo(null);
  }

  function handleSalvarProducaoHora() {
    if (!horaInicio || !horaFim || !metaHora || !realProduzido) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    adicionarProducaoHora({
      horaInicio,
      horaFim,
      meta: Number(metaHora),
      realProduzido: Number(realProduzido),
      codigoParada,
      descricaoParada,
    });

    setProducaoHoraModalVisible(false);
    limparCamposProducaoHora();
  }

  function limparCamposProducaoHora() {
    setHoraInicio('');
    setHoraFim('');
    setMetaHora('');
    setRealProduzido('');
    setCodigoParada('');
    setDescricaoParada('');
  }

  function handleVerDetalhes(id: string) {
    const producao = buscarProducaoHora(id);
    if (producao) {
      setProducaoSelecionada(producao);
      setDetalhesModalVisible(true);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.producaoContainer}>
          <Text style={styles.sectionTitle}>Produção Diária</Text>
          
          <View style={styles.tableHeader}>
            <Text style={[styles.columnHeader, styles.modeloHeader]}>Modelo</Text>
            <Text style={[styles.columnHeader, styles.metaHeader]}>Meta</Text>
            <Text style={[styles.columnHeader, styles.marchaHeader]}>Marcha</Text>
            <Text style={[styles.columnHeader, styles.testeHeader]}>Teste</Text>
            <View style={[styles.columnHeader, styles.statusHeader]}></View>
          </View>

          {producaoDiaria.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.tableRow}
              onLongPress={() => handleLongPress(item.modelo)}
              delayLongPress={500}
            >
              <Text 
                style={styles.modeloCell}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.modelo}
              </Text>
              <Text style={styles.metaCell}>{item.meta}</Text>
              <TextInput
                style={styles.inputCell}
                value={item.marcha > 0 ? String(item.marcha) : ''}
                onChangeText={(value) => handleUpdateMarcha(item.id, value)}
                keyboardType="numeric"
                placeholder="0"
              />
              <TextInput
                style={styles.inputCell}
                value={item.teste > 0 ? String(item.teste) : ''}
                onChangeText={(value) => handleUpdateTeste(item.id, value)}
                keyboardType="numeric"
                placeholder="0"
              />
              <View style={styles.statusCell}>
                <MaterialIcons 
                  name={item.concluido ? "check-circle" : "cancel"} 
                  size={20}
                  color={item.concluido ? COLORS.success : COLORS.danger} 
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.producaoContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Produção Hora x Hora</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setProducaoHoraModalVisible(true)}
            >
              <MaterialIcons name="add" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.tableHeader}>
            <Text style={[styles.columnHeader, styles.horaHeader]}>Hora</Text>
            <Text style={[styles.columnHeader, styles.metaHeader]}>Meta</Text>
            <Text style={[styles.columnHeader, styles.realHeader]}>Real</Text>
            <Text style={[styles.columnHeader, styles.totalHeader]}>Total</Text>
            <View style={[styles.columnHeader, styles.acoesHeader]} />
          </View>

          {producoesHora.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.horaCell}>
                {item.horaInicio} - {item.horaFim}
              </Text>
              <Text style={styles.metaCell}>{item.meta}</Text>
              <Text style={styles.realCell}>{item.realProduzido}</Text>
              <Text style={styles.totalCell}>{item.total}</Text>
              <TouchableOpacity 
                style={styles.detalhesButton}
                onPress={() => handleVerDetalhes(item.id)}
              >
                <MaterialIcons name="info" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar exclusão</Text>
            <Text style={styles.modalText}>
              Deseja realmente excluir o modelo {selectedModelo} da produção diária?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.buttonText}>Não</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.buttonText}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={producaoHoraModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Lançamento de Produção Hora x Hora</Text>
            
            <View style={styles.inputRow}>
              <View style={styles.inputColumn}>
                <Text style={styles.label}>Hora Início</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={horaInicio}
                    onValueChange={setHoraInicio}
                    style={styles.picker}
                    mode="dropdown"
                  >
                    <Picker.Item label="Selecione" value="" color={COLORS.text} />
                    {horariosDisponiveis.map((horario) => (
                      <Picker.Item 
                        key={horario} 
                        label={horario} 
                        value={horario}
                        color={COLORS.text}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.inputColumn}>
                <Text style={styles.label}>Hora Fim</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={horaFim}
                    onValueChange={setHoraFim}
                    style={styles.picker}
                    mode="dropdown"
                  >
                    <Picker.Item label="Selecione" value="" color={COLORS.text} />
                    {horariosDisponiveis.map((horario) => (
                      <Picker.Item 
                        key={horario} 
                        label={horario} 
                        value={horario}
                        color={COLORS.text}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            <Text style={styles.label}>Meta</Text>
            <TextInput
              style={styles.input}
              value={metaHora}
              onChangeText={setMetaHora}
              placeholder="0"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Real Produzido</Text>
            <TextInput
              style={styles.input}
              value={realProduzido}
              onChangeText={setRealProduzido}
              placeholder="0"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Código da Parada</Text>
            <TextInput
              style={styles.input}
              value={codigoParada}
              onChangeText={setCodigoParada}
              placeholder="Código"
            />

            <Text style={styles.label}>Descrição da Parada</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={descricaoParada}
              onChangeText={setDescricaoParada}
              placeholder="Descrição"
              multiline
              numberOfLines={3}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setProducaoHoraModalVisible(false);
                  limparCamposProducaoHora();
                }}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleSalvarProducaoHora}
              >
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={detalhesModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, styles.detalhesModalContent]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detalhes da Parada</Text>
              <TouchableOpacity 
                onPress={() => setDetalhesModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.detalhesContent}>
              <Text style={styles.label}>Código</Text>
              <Text style={styles.detalheText}>
                {producaoSelecionada?.codigoParada || '-'}
              </Text>

              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.detalheText}>
                {producaoSelecionada?.descricaoParada || '-'}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
} 