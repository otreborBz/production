import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './styles';
import { COLORS } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useModelos, Modelo } from '../../contexts/ModelosContext';
import { useHomeNavigation } from '../../contexts/HomeContext';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../../components/Button';

type ModelData = {
  id: string;
  modelo: string;
  fioMarcha: {
    modeloFio: string;
    resistencia: string;
  };
  fioAuxiliar: {
    modeloFio: string;
    resistencia: string;
  };
};

const DATA: ModelData[] = [];

const FAMILIAS = ['RG','AE2', 'AZ', 'VR', 'TC', 'TC2', 'TC3'];
const TIPOS_FIO = ['CU', 'AL'];

type HomeStackParamList = {
  HomeScreen: undefined;
  ModelosList: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

export function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [listModalVisible, setListModalVisible] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState('');
  const [modelo, setModelo] = useState('');
  const [fioMarcha, setFioMarcha] = useState('');
  const [nominalOhmsMarcha, setNominalOhmsMarcha] = useState('');
  const [fioAuxiliar, setFioAuxiliar] = useState('');
  const [nominalOhmsAuxiliar, setNominalOhmsAuxiliar] = useState('');
  const { addModelo, modelos, findModeloByName, deleteModelo, updateModelo } = useModelos();
  const { handleBuscarModelo, modelosBuscados, removeModeloBuscado } = useHomeNavigation();
  const [editingModelo, setEditingModelo] = useState<Modelo | null>(null);
  const [expandedModelId, setExpandedModelId] = useState<string | null>(null);
  const [tipoFioMarcha, setTipoFioMarcha] = useState('');
  const [tipoFioAuxiliar, setTipoFioAuxiliar] = useState('');

  function handleEditModelo(modelo: Modelo) {
    setEditingModelo(modelo);
    setSelectedFamily(modelo.familia);
    setModelo(modelo.modelo);
    setFioMarcha(modelo.fioMarcha.modeloFio);
    setNominalOhmsMarcha(modelo.fioMarcha.resistencia);
    setFioAuxiliar(modelo.fioAuxiliar.modeloFio);
    setNominalOhmsAuxiliar(modelo.fioAuxiliar.resistencia);
    setListModalVisible(false);
    setCreateModalVisible(true);
  }

  async function handleCreateModelo() {
    const newModelo = {
      familia: selectedFamily,
      modelo: modelo,
      fioMarcha: {
        modeloFio: fioMarcha,
        resistencia: nominalOhmsMarcha,
      },
      fioAuxiliar: {
        modeloFio: fioAuxiliar,
        resistencia: nominalOhmsAuxiliar,
      },
    };
    
    if (editingModelo) {
      await updateModelo(editingModelo.id, newModelo);
      setEditingModelo(null);
    } else {
      await addModelo(newModelo);
    }
    setCreateModalVisible(false);
    resetForm();
  }

  function resetForm() {
    setSelectedFamily('');
    setModelo('');
    setFioMarcha('');
    setNominalOhmsMarcha('');
    setFioAuxiliar('');
    setNominalOhmsAuxiliar('');
    setTipoFioMarcha('');
    setTipoFioAuxiliar('');
  }

  function handleOpenCreateModal() {
    resetForm();
    setCreateModalVisible(true);
  }

  async function handleRemoveModelo(modeloId: string) {
    await removeModeloBuscado(modeloId);
  }

  function handleFioMarchaChange(value: string) {
    setFioMarcha(`${value} ${tipoFioMarcha}`);
  }

  function handleFioAuxiliarChange(value: string) {
    setFioAuxiliar(`${value} ${tipoFioAuxiliar}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={handleOpenCreateModal}
          >
            <MaterialIcons name="add-circle" size={40} color={COLORS.primary} />
            <Text style={styles.iconButtonText}>Criar Modelo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => setListModalVisible(true)}
          >
            <MaterialIcons name="list-alt" size={40} color={COLORS.primary} />
            <Text style={styles.iconButtonText}>Modelos Criados</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={modelosBuscados}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.modelCard}>
              <View style={styles.modelTitleContainer}>
                <Text style={styles.modelTitle}>modelo {item.modelo}</Text>
              </View>
              <View style={styles.modelInfo}>
                <View style={styles.infoRow}>
                  <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>Fio marcha</Text>
                    <Text style={styles.infoValue}>
                      {item.fioMarcha.modeloFio ? `${item.fioMarcha.modeloFio} CU` : '-'}
                    </Text>
                    <Text style={styles.infoLabel}>nominal ohms</Text>
                    <Text style={styles.infoValue}>
                      {item.fioMarcha.resistencia || '-'}
                    </Text>
                  </View>
                  <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>Fio auxiliar</Text>
                    <Text style={styles.infoValue}>
                      {item.fioAuxiliar.modeloFio ? `${item.fioAuxiliar.modeloFio} CU` : '-'}
                    </Text>
                    <Text style={styles.infoLabel}>nominal ohms</Text>
                    <Text style={styles.infoValue}>
                      {item.fioAuxiliar.resistencia || '-'}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => handleRemoveModelo(item.id)}
              >
                <MaterialIcons name="close" size={20} color={COLORS.danger} />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.modelsList}
        />
      </View>

      <Modal
        visible={listModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Modelos Criados</Text>
              <TouchableOpacity 
                onPress={() => setListModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={modelos}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.modelCard}>
                  <View style={styles.modelHeader}>
                    <Text style={styles.modelTitle}>{item.modelo}</Text>
                    <View style={styles.modelHeaderActions}>
                      <TouchableOpacity 
                        onPress={() => setExpandedModelId(expandedModelId === item.id ? null : item.id)}
                        style={styles.actionIconButton}
                      >
                        <MaterialIcons 
                          name={expandedModelId === item.id ? "expand-less" : "expand-more"} 
                          size={24} 
                          color={COLORS.primary} 
                        />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => handleEditModelo(item)}
                        style={styles.actionIconButton}
                      >
                        <MaterialIcons name="edit" size={24} color={COLORS.primary} />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => deleteModelo(item.id)}
                        style={styles.actionIconButton}
                      >
                        <MaterialIcons name="delete" size={24} color={COLORS.danger} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {expandedModelId === item.id && (
                    <>
                      <View style={styles.modelInfo}>
                        <View style={styles.infoRow}>
                          <View style={styles.infoColumn}>
                            <Text style={styles.infoHeader}>Fio da marcha</Text>
                            <Text style={styles.infoValue}>{item.fioMarcha.modeloFio}</Text>
                            <Text style={styles.infoHeader}>nominal ohms</Text>
                            <Text style={styles.infoValue}>{item.fioMarcha.resistencia}</Text>
                          </View>
                          <View style={styles.infoColumn}>
                            <Text style={styles.infoHeader}>Fio auxiliar</Text>
                            <Text style={styles.infoValue}>{item.fioAuxiliar.modeloFio}</Text>
                            <Text style={styles.infoHeader}>nominal ohms</Text>
                            <Text style={styles.infoValue}>{item.fioAuxiliar.resistencia}</Text>
                          </View>
                        </View>
                      </View>
                    </>
                  )}
                </View>
              )}
              contentContainerStyle={styles.listContent}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={createModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setCreateModalVisible(false);
          resetForm();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingModelo ? 'Editar modelo' : 'Criar modelo'}
            </Text>

            <Text style={styles.label}>Família</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedFamily}
                onValueChange={setSelectedFamily}
                style={styles.picker}
              >
                <Picker.Item label="Selecione uma família" value="" />
                {FAMILIAS.map((familia) => (
                  <Picker.Item key={familia} label={familia} value={familia} />
                ))}
              </Picker>
            </View>

            <Text style={styles.label}>Modelo</Text>
            <TextInput
              style={styles.input}
              value={modelo}
              onChangeText={setModelo}
              autoCapitalize="characters"
            />

            <View style={styles.inputRow}>
              <View style={styles.inputColumn}>
                <Text style={styles.label}>Fio da marcha</Text>
                <View style={styles.fioInputContainer}>
                  <TextInput
                    style={styles.fioInput}
                    value={fioMarcha.split(' ')[0]}
                    onChangeText={handleFioMarchaChange}
                    keyboardType="numeric"
                    placeholder="21,5"
                  />
                  <View style={styles.tipoFioContainer}>
                    <Picker
                      selectedValue={tipoFioMarcha}
                      onValueChange={setTipoFioMarcha}
                      style={styles.tipoFioPicker}
                    >
                      {TIPOS_FIO.map((tipo) => (
                        <Picker.Item key={tipo} label={tipo} value={tipo} />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>

              <View style={styles.inputColumn}>
                <Text style={styles.label}>nom. ohms</Text>
                <TextInput
                  style={styles.input}
                  value={nominalOhmsMarcha}
                  onChangeText={setNominalOhmsMarcha}
                  keyboardType="numeric"
                  placeholder="1,32"
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputColumn}>
                <Text style={styles.label}>Fio auxiliar</Text>
                <View style={styles.fioInputContainer}>
                  <TextInput
                    style={styles.fioInput}
                    value={fioAuxiliar.split(' ')[0]}
                    onChangeText={handleFioAuxiliarChange}
                    keyboardType="numeric"
                    placeholder="21,5"
                  />
                  <View style={styles.tipoFioContainer}>
                    <Picker
                      selectedValue={tipoFioAuxiliar}
                      onValueChange={setTipoFioAuxiliar}
                      style={styles.tipoFioPicker}
                    >
                      {TIPOS_FIO.map((tipo) => (
                        <Picker.Item key={tipo} label={tipo} value={tipo} />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>

              <View style={styles.inputColumn}>
                <Text style={styles.label}>nom. ohms</Text>
                <TextInput
                  style={styles.input}
                  value={nominalOhmsAuxiliar}
                  onChangeText={setNominalOhmsAuxiliar}
                  keyboardType="numeric"
                  placeholder="1,32"
                />
              </View>
            </View>

            <View style={styles.modalButtons}>
              <Button
                title="Cancelar"
                onPress={() => {
                  setCreateModalVisible(false);
                  resetForm();
                }}
                variant="danger"
              />
              <Button
                title="Lançar"
                onPress={handleCreateModelo}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
} 