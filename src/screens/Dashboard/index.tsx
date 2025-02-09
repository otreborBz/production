import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, Alert, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '../../theme/colors';
import { useProducao } from '../../contexts/ProducaoContext';
import { useProducaoHora } from '../../contexts/ProducaoHoraContext';
import { Picker } from '@react-native-picker/picker';
import { useModelos } from '../../contexts/ModelosContext';
import { pdfGenerator } from '../../services/pdfGenerator';
import DateTimePicker from '@react-native-community/datetimepicker';
import { storage } from '../../services/storage';
import { PermissionsAndroid } from 'react-native';

// Adicionar interface para o tipo de parada
interface Parada {
  codigo: number;
  descricao: string;
  minutosPerdidos: number;
}

export function Dashboard() {
  const { producaoDiaria, atualizarMarcha, atualizarTeste, removerProducao, clearProducoes, atualizarRecuperado } = useProducao();
  const { 
    producoesHora, 
    adicionarProducaoHora,
    buscarProducaoHora, 
    removerProducaoHora, 
    clearProducoesHora,
    atualizarProducaoHora
  } = useProducaoHora();
  const { clearModelos } = useModelos();
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
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTimeType, setSelectedTimeType] = useState<'inicio' | 'fim'>('inicio');
  const [tempHour, setTempHour] = useState('');
  const [tempMinute, setTempMinute] = useState('');
  const [paradas, setParadas] = useState<Parada[]>([]);
  const [paradaModalVisible, setParadaModalVisible] = useState(false);
  const [deleteHoraModalVisible, setDeleteHoraModalVisible] = useState(false);
  const [selectedProducaoHora, setSelectedProducaoHora] = useState<string | null>(null);
  const [minutosPerdidos, setMinutosPerdidos] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTurno, setSelectedTurno] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedLinha, setSelectedLinha] = useState('');
  const [acoesModalVisible, setAcoesModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProducaoHora | null>(null);
  
  const LINHAS = ['A', 'B', 'C', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'VR'];
  const TURNOS = ['A', 'B', 'C', 'X', 'Y'];

  // Verifique se producaoDiaria é um array
  const producaoDiariaArray = Array.isArray(producaoDiaria) ? producaoDiaria : [];

  // Criar array com as 24 horas do dia
  const horariosDisponiveis = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4).toString().padStart(2, '0');
    const minute = ((i % 4) * 15).toString().padStart(2, '0');
    return `${hour}:${minute}`;
  });

  // Função para validar se a hora fim é maior que a hora início
  function validarHorarios(inicio: string, fim: string): boolean {
    if (!inicio || !fim) return true;
    const [horaInicio, minutoInicio] = inicio.split(':').map(Number);
    const [horaFim, minutoFim] = fim.split(':').map(Number);
    
    if (horaFim > horaInicio) return true;
    if (horaFim === horaInicio) return minutoFim > minutoInicio;
    return false;
  }

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

  // Adicionar função para adicionar nova parada
  function handleAdicionarParada() {
    if (!codigoParada || !descricaoParada || !minutosPerdidos) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const minutosRestantes = calcularMinutosRestantes();
    if (Number(minutosPerdidos) > minutosRestantes) {
      Alert.alert('Erro', `Você só pode adicionar até ${minutosRestantes} minutos`);
      return;
    }

    setParadas([...paradas, {
      codigo: Number(codigoParada),
      descricao: descricaoParada,
      minutosPerdidos: Number(minutosPerdidos)
    }]);

    setCodigoParada('');
    setDescricaoParada('');
    setMinutosPerdidos('');
    setParadaModalVisible(false);
  }

  // Modificar função de limpar campos
  function limparCamposProducaoHora() {
    setHoraInicio('');
    setHoraFim('');
    setMetaHora('');
    setRealProduzido('');
    setCodigoParada('');
    setDescricaoParada('');
    setParadas([]);
  }

  // Modificar função de salvar produção hora
  function handleSalvarProducaoHora() {
    if (!horaInicio || !horaFim || !metaHora || !realProduzido || !selectedTurno) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    const producao = {
      horaInicio,
      horaFim,
      meta: Number(metaHora),
      realProduzido: Number(realProduzido),
      turno: selectedTurno,
      paradas: paradas,
    };

    if (selectedProducaoHora) {
      // Edição
      atualizarProducaoHora(selectedProducaoHora, producao);
    } else {
      // Nova produção
      adicionarProducaoHora(producao);
    }

    setProducaoHoraModalVisible(false);
    limparCamposProducaoHora();
    setSelectedProducaoHora(null);
  }

  function handleVerDetalhes(id: string) {
    const producao = buscarProducaoHora(id);
    if (producao) {
      setProducaoSelecionada(producao);
      setDetalhesModalVisible(true);
    }
  }

  function handleOpenTimePicker(type: 'inicio' | 'fim') {
    setSelectedTimeType(type);
    setTimePickerVisible(true);
  }

  function handleTimeSelect(hour: string, minute: string) {
    const timeString = `${hour}:${minute}`;
    
    if (selectedTimeType === 'inicio') {
      setHoraInicio(timeString);
      if (!validarHorarios(timeString, horaFim)) {
        setHoraFim('');
      }
    } else {
      setHoraFim(timeString);
    }
    
    setTempHour('');
    setTempMinute('');
    setTimePickerVisible(false);
  }

  // Adicionar função para lidar com a exclusão
  function handleDeleteProducaoHora(id: string) {
    Alert.alert(
      'Remover Produção',
      'Deseja realmente remover esta produção?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: () => {
            removerProducaoHora(id);
          }
        }
      ]
    );
  }

  // Modificar a função de cálculo de minutos perdidos
  function calcularMinutosPerdidosTotal(meta: number, realProduzido: number): number {
    if (!meta || !realProduzido || isNaN(meta) || isNaN(realProduzido)) {
      return 0;
    }
    
    const producaoPorMinuto = meta / 60;
    if (producaoPorMinuto <= 0) return 0;
    
    const minutosNecessarios = Math.ceil((meta - realProduzido) / producaoPorMinuto);
    return Math.max(0, minutosNecessarios);
  }

  // Modificar a função de cálculo de minutos restantes
  function calcularMinutosRestantes(): number {
    if (!metaHora || !realProduzido) return 0;
    
    const totalMinutosPerdidos = paradas.reduce((total, parada) => total + parada.minutosPerdidos, 0);
    const minutosAJustificar = calcularMinutosPerdidosTotal(Number(metaHora), Number(realProduzido));
    return Math.max(0, minutosAJustificar - totalMinutosPerdidos);
  }

  function handleClearAllData() {
    Alert.alert(
      'Limpar Dados',
      'Deseja realmente limpar todos os dados de produção?\n\nIsso não afetará os modelos salvos.',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            await clearProducoes();
            await clearProducoesHora();
            await storage.clearFiltros();
            
            // Resetar os estados dos filtros
            setSelectedDate(new Date());
            setSelectedLinha('');
            setSelectedTurno('');

            Alert.alert('Sucesso', 'Dados de produção limpos com sucesso!');
          }
        }
      ]
    );
  }

  function handleExportProducaoDiaria() {
    if (!selectedLinha || !selectedTurno) {
      Alert.alert('Atenção', 'Selecione a linha e o turno antes de exportar');
      return;
    }

    try {
      pdfGenerator.generateProducaoDiariaPDF(
        producaoDiaria,
        selectedLinha,
        selectedTurno,
        formatDate(selectedDate)
      );
      Alert.alert('Sucesso', 'PDF gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      Alert.alert(
        'Erro',
        'Não foi possível gerar o PDF. Verifique as permissões do aplicativo.'
      );
    }
  }

  function handleExportProducaoHora() {
    if (!selectedLinha || !selectedTurno) {
      Alert.alert('Atenção', 'Selecione a linha e o turno antes de exportar');
      return;
    }

    try {
      pdfGenerator.generateProducaoHoraPDF(
        producoesHora,
        selectedLinha,
        formatDate(selectedDate),
        selectedTurno
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível gerar o PDF');
    }
  }

  // Função para formatar a data
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  // Carregar filtros salvos quando o app iniciar
  useEffect(() => {
    async function loadStoredFiltros() {
      const storedFiltros = await storage.getFiltros();
      if (storedFiltros) {
        setSelectedDate(new Date(storedFiltros.data));
        setSelectedLinha(storedFiltros.linha);
        setSelectedTurno(storedFiltros.turno);
      }
    }
    loadStoredFiltros();
  }, []);

  // Salvar filtros quando houver mudanças
  useEffect(() => {
    storage.saveFiltros({
      data: selectedDate.toISOString(),
      linha: selectedLinha,
      turno: selectedTurno,
    });
  }, [selectedDate, selectedLinha, selectedTurno]);

  // Função para lidar com a mudança de data
  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  // Função para lidar com a mudança de linha
  const handleLinhaChange = (value: string) => {
    setSelectedLinha(value);
  };

  // Função para lidar com a mudança de turno
  const handleTurnoChange = (value: string) => {
    setSelectedTurno(value);
  };

  // Adicionar função para remover produção diária
  function handleRemoveProducao(modelo: string) {
    Alert.alert(
      'Remover Produção',
      'Deseja realmente remover esta produção?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: () => {
            removerProducao(modelo);
          }
        }
      ]
    );
  }

  function handleEditProducaoHora(producao: ProducaoHora) {
    // Preencher os estados com os dados da produção selecionada
    setHoraInicio(producao.horaInicio);
    setHoraFim(producao.horaFim);
    setMetaHora(producao.meta.toString());
    setRealProduzido(producao.realProduzido.toString());
    setParadas(producao.paradas);
    setSelectedProducaoHora(producao.id);
    
    // Abrir o modal de edição
    setProducaoHoraModalVisible(true);
  }

  // Função para abrir o modal de ações
  function handleOpenAcoes(item: ProducaoHora) {
    setSelectedItem(item);
    setAcoesModalVisible(true);
  }

  // Adicione verificação de permissões
  useEffect(() => {
    async function checkPermissions() {
      try {
        if (Platform.OS === 'android') {
          const permissions = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          ]);

          if (
            permissions['android.permission.WRITE_EXTERNAL_STORAGE'] !== 'granted' ||
            permissions['android.permission.READ_EXTERNAL_STORAGE'] !== 'granted'
          ) {
            Alert.alert(
              'Permissão Necessária',
              'O app precisa de permissão para acessar o armazenamento para funcionar corretamente.'
            );
          }
        }
      } catch (err) {
        console.error('Erro ao verificar permissões:', err);
      }
    }

    checkPermissions();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.filterContainer}>
          <View style={styles.dateRow}>
            <Text style={styles.label}>Data</Text>
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {formatDate(selectedDate)}
              </Text>
              <MaterialIcons name="calendar-today" size={20} color={COLORS.text} />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}
          </View>

          <View style={styles.pickerRow}>
            <View style={styles.pickerColumn}>
              <Text style={styles.label}>Linha</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedLinha}
                  onValueChange={handleLinhaChange}
                  style={styles.picker}
                >
                  <Picker.Item label="..." value="" />
                  {LINHAS.map((linha) => (
                    <Picker.Item key={linha} label={linha} value={linha} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.pickerColumn}>
              <Text style={styles.label}>Turno</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedTurno}
                  onValueChange={setSelectedTurno}
                  style={styles.picker}
                >
                  <Picker.Item label="..." value="" />
                  {TURNOS.map((turno) => (
                    <Picker.Item key={turno} label={turno} value={turno} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.producaoContainer}>
          <Text style={styles.headerTitle}>Produção Diária</Text>
          
          <View style={styles.tableHeader}>
            <Text style={[styles.columnHeader, styles.modeloHeader]}>Modelo</Text>
            <Text style={[styles.columnHeader, styles.marchaHeader]}>Marcha</Text>
            <Text style={[styles.columnHeader, styles.testeHeader]}>Teste</Text>
            <Text style={[styles.columnHeader, styles.recuperadoHeader]}>Recup.</Text>
            <View style={styles.statusHeader}></View>
          </View>

          {producaoDiaria.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={[styles.modeloCell]}>{item.modelo}</Text>
              <TextInput
                style={styles.inputCell}
                value={String(item.marcha)}
                onChangeText={(value) => handleUpdateMarcha(item.id, value)}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.inputCell}
                value={String(item.teste)}
                onChangeText={(value) => handleUpdateTeste(item.id, value)}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.inputCell}
                value={item.recuperado > 0 ? String(item.recuperado) : ''}
                onChangeText={(value) => atualizarRecuperado(item.id, Number(value) || 0)}
                keyboardType="numeric"
                placeholder="0"
              />
              <View style={styles.statusCell}>
                <TouchableOpacity 
                  onPress={() => handleRemoveProducao(item.modelo)}
                  style={styles.deleteButton}
                >
                  <MaterialIcons name="delete" size={24} color={COLORS.danger} />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity 
            style={styles.exportButton}
            onPress={handleExportProducaoDiaria}
          >
            <MaterialIcons name="picture-as-pdf" size={20} color={COLORS.primary} />
            <Text style={styles.exportButtonText}>Exportar Produção PDF</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.producaoContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Produção Hora x Hora</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setProducaoHoraModalVisible(true)}
            >
              <MaterialIcons name="add" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.tableHeader}>
            <Text style={[styles.columnHeader, styles.horaCell]}>Horário</Text>
            <Text style={[styles.columnHeader, styles.realCell]}>Real</Text>
            <Text style={[styles.columnHeader, styles.totalCell]}>Meta</Text>
            <Text style={[styles.columnHeader, styles.acoesContainer]}>Ações</Text>
          </View>

          {producoesHora.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.horaCell}>{`${item.horaInicio} - ${item.horaFim}`}</Text>
              <Text style={styles.realCell}>{item.realProduzido}</Text>
              <Text style={styles.totalCell}>{item.meta}</Text>
              <TouchableOpacity 
                style={styles.acoesButton}
                onPress={() => handleOpenAcoes(item)}
              >
                <MaterialIcons name="more-vert" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity 
            style={styles.exportButton}
            onPress={handleExportProducaoHora}
          >
            <MaterialIcons name="picture-as-pdf" size={20} color={COLORS.primary} />
            <Text style={styles.exportButtonText}>Exportar Hora x Hora</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.clearButton}
          onPress={handleClearAllData}
        >
          <MaterialIcons name="delete-sweep" size={24} color={COLORS.danger} />
          <Text style={styles.clearButtonText}>Limpar Dados</Text>
        </TouchableOpacity>
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
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <ScrollView 
            style={styles.modalScroll}
            contentContainerStyle={styles.modalScrollContent}
            showsVerticalScrollIndicator={false}
          >
          <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {selectedProducaoHora ? 'Editar Produção' : 'Nova Produção Hora x Hora'}
              </Text>
            
            <View style={styles.inputRow}>
              <View style={styles.inputColumn}>
                <Text style={styles.label}>Hora Início</Text>
                  <TouchableOpacity 
                    style={styles.timePickerButton}
                    onPress={() => handleOpenTimePicker('inicio')}
                  >
                    <Text style={styles.timePickerText}>
                      {horaInicio || 'Selecione'}
                    </Text>
                  </TouchableOpacity>
              </View>

              <View style={styles.inputColumn}>
                <Text style={styles.label}>Hora Fim</Text>
                  <TouchableOpacity 
                    style={[
                      styles.timePickerButton,
                      !horaInicio && styles.timePickerButtonDisabled
                    ]}
                    onPress={() => horaInicio && handleOpenTimePicker('fim')}
                    disabled={!horaInicio}
                  >
                    <Text style={[
                      styles.timePickerText,
                      !horaInicio && styles.timePickerTextDisabled
                    ]}>
                      {horaFim || 'Selecione'}
                    </Text>
                  </TouchableOpacity>
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

              <Text style={styles.label}>Paradas</Text>
              {paradas.length === 0 ? (
                <>
                  {horaInicio && horaFim && metaHora && realProduzido ? (
                    <Text style={styles.minutosInfo}>
                      Minutos a justificar: {calcularMinutosPerdidosTotal(Number(metaHora), Number(realProduzido))}
                    </Text>
                  ) : (
                    <Text style={styles.minutosInfoDisabled}>
                      Preencha os horários, meta e produção para ver os minutos a justificar
                    </Text>
                  )}
                  <TouchableOpacity
                    style={styles.addFirstParadaButton}
                    onPress={() => setParadaModalVisible(true)}
                    disabled={!horaInicio || !horaFim || !metaHora || !realProduzido}
                  >
                    <MaterialIcons 
                      name="add-circle-outline" 
                      size={24} 
                      color={!horaInicio || !horaFim || !metaHora || !realProduzido ? COLORS.disabled : COLORS.primary} 
                    />
                    <Text style={[
                      styles.addFirstParadaText,
                      (!horaInicio || !horaFim || !metaHora || !realProduzido) && styles.addFirstParadaTextDisabled
                    ]}>
                      Adicionar Primeira Parada
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.paradasContainer}>
                  <View style={styles.paradasHeader}>
                    <Text style={styles.minutosInfo}>
                      Minutos restantes: {calcularMinutosRestantes()}
                    </Text>
                  </View>
                  <View style={styles.paradasList}>
                    {paradas.map((parada, index) => (
                      <View key={index} style={styles.paradaItem}>
                        <View style={styles.paradaInfo}>
                          <Text style={styles.paradaCodigo}>Código: {parada.codigo}</Text>
                          <Text style={styles.paradaDescricao}>{parada.descricao}</Text>
                          <Text style={styles.paradaMinutos}>Minutos: {parada.minutosPerdidos}</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.removeParadaButton}
                          onPress={() => {
                            const newParadas = paradas.filter((_, i) => i !== index);
                            setParadas(newParadas);
                          }}
                        >
                          <MaterialIcons name="delete" size={20} color={COLORS.danger} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                  <TouchableOpacity
                    style={styles.addParadaButton}
                    onPress={() => setParadaModalVisible(true)}
                  >
                    <MaterialIcons name="add" size={24} color={COLORS.primary} />
                    <Text style={styles.addParadaText}>Adicionar Nova Parada</Text>
                  </TouchableOpacity>
                </View>
              )}

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
          </ScrollView>
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
              <Text style={styles.modalTitle}>Detalhes das Paradas</Text>
              <TouchableOpacity 
                onPress={() => setDetalhesModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.detalhesContent}>
              <View style={styles.detalhesTotalInfo}>
                <Text style={styles.detalhesTotalLabel}>Total de Minutos Perdidos:</Text>
                <Text style={styles.detalhesTotalValue}>
                  {producaoSelecionada?.paradas.reduce((total, parada) => total + parada.minutosPerdidos, 0)} min
                </Text>
              </View>

              {producaoSelecionada?.paradas.map((parada, index) => (
                <View key={index} style={styles.detalheParada}>
                  <View style={styles.detalheHeader}>
                    <Text style={styles.detalheTitle}>Parada {index + 1}</Text>
                    <Text style={styles.detalheMinutos}>{parada.minutosPerdidos} min</Text>
                  </View>
                  <View style={styles.detalheLine}>
                    <Text style={styles.detalheLabel}>Código:</Text>
                    <Text style={styles.detalheValue}>{parada.codigo}</Text>
                  </View>
                  <View style={styles.detalheLine}>
                    <Text style={styles.detalheLabel}>Descrição:</Text>
                    <Text style={styles.detalheValue}>{parada.descricao}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={timePickerVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Selecione o Horário {selectedTimeType === 'inicio' ? 'Inicial' : 'Final'}
              </Text>

            <View style={styles.timePickerContainer}>
              <View style={styles.timePickerColumn}>
                <Text style={styles.timePickerLabel}>Hora</Text>
                <ScrollView style={styles.timePickerScroll}>
                  {Array.from({ length: 24 }, (_, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[
                        styles.timeOption,
                        tempHour === i.toString().padStart(2, '0') && styles.timeOptionSelected
                      ]}
                      onPress={() => setTempHour(i.toString().padStart(2, '0'))}
                    >
                      <Text style={[
                        styles.timeOptionText,
                        tempHour === i.toString().padStart(2, '0') && styles.timeOptionTextSelected
                      ]}>
                        {i.toString().padStart(2, '0')}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.timePickerColumn}>
                <Text style={styles.timePickerLabel}>Minuto</Text>
                <ScrollView style={styles.timePickerScroll}>
                  {Array.from({ length: 60 }, (_, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[
                        styles.timeOption,
                        tempMinute === i.toString().padStart(2, '0') && styles.timeOptionSelected
                      ]}
                      onPress={() => setTempMinute(i.toString().padStart(2, '0'))}
                    >
                      <Text style={[
                        styles.timeOptionText,
                        tempMinute === i.toString().padStart(2, '0') && styles.timeOptionTextSelected
                      ]}>
                        {i.toString().padStart(2, '0')}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <Text style={styles.timePreview}>
              Horário selecionado: {tempHour || '--'}:{tempMinute || '--'}
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setTempHour('');
                  setTempMinute('');
                  setTimePickerVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton, 
                  styles.confirmButton,
                  (!tempHour || !tempMinute) && styles.modalButtonDisabled
                ]}
                onPress={() => {
                  if (tempHour && tempMinute) {
                    handleTimeSelect(tempHour, tempMinute);
                  }
                }}
                disabled={!tempHour || !tempMinute}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={paradaModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {paradas.length === 0 ? 'Adicionar Primeira Parada' : 'Adicionar Nova Parada'}
            </Text>

            <Text style={styles.label}>Minutos Perdidos</Text>
            <Text style={styles.minutosInfo}>
              Minutos restantes a justificar: {calcularMinutosRestantes()}
            </Text>
            <TextInput
              style={[styles.input, styles.codigoInput]}
              value={minutosPerdidos}
              onChangeText={setMinutosPerdidos}
              placeholder="Minutos"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Código da Parada</Text>
            <TextInput
              style={[styles.input, styles.codigoInput]}
              value={codigoParada}
              onChangeText={setCodigoParada}
              placeholder="Código"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Descrição da Parada</Text>
            <TextInput
              style={[styles.input, styles.descricaoInput]}
              value={descricaoParada}
              onChangeText={setDescricaoParada}
              placeholder="Descrição"
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setParadaModalVisible(false);
                  setCodigoParada('');
                  setDescricaoParada('');
                  setMinutosPerdidos('');
                }}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton, 
                  styles.confirmButton,
                  calcularMinutosRestantes() < Number(minutosPerdidos) && styles.modalButtonDisabled
                ]}
                onPress={handleAdicionarParada}
                disabled={calcularMinutosRestantes() < Number(minutosPerdidos)}
              >
                <Text style={styles.buttonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={deleteHoraModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar exclusão</Text>
            <Text style={styles.modalText}>
              Deseja realmente excluir esta produção hora x hora?
              </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setDeleteHoraModalVisible(false)}
              >
                <Text style={styles.buttonText}>Não</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => {
                  removerProducaoHora(selectedProducaoHora);
                }}
              >
                <Text style={styles.buttonText}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Ações */}
      <Modal
        visible={acoesModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setAcoesModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setAcoesModalVisible(false)}
        >
          <View style={styles.acoesModalContent}>
            <TouchableOpacity 
              style={styles.acaoButton}
              onPress={() => {
                handleVerDetalhes(selectedItem?.id || '');
                setAcoesModalVisible(false);
              }}
            >
              <MaterialIcons name="visibility" size={24} color={COLORS.primary} />
              <Text style={styles.acaoText}>Detalhes</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.acaoButton}
              onPress={() => {
                if (selectedItem) handleEditProducaoHora(selectedItem);
                setAcoesModalVisible(false);
              }}
            >
              <MaterialIcons name="edit" size={24} color={COLORS.primary} />
              <Text style={styles.acaoText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.acaoButton, styles.acaoButtonDanger]}
              onPress={() => {
                handleDeleteProducaoHora(selectedItem?.id || '');
                setAcoesModalVisible(false);
              }}
            >
              <MaterialIcons name="delete" size={24} color={COLORS.danger} />
              <Text style={[styles.acaoText, styles.acaoTextDanger]}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
} 