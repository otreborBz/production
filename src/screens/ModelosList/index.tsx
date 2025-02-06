import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';

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

export function ModelosList() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.modelCard}>
            <Text style={styles.modelTitle}>{item.modelo}</Text>
            <View style={styles.modelInfo}>
              <View style={styles.infoRow}>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoHeader}>Fio da marcha</Text>
                  <Text style={styles.infoModeloFio}>{item.fioMarcha.modeloFio}</Text>
                  <View style={styles.resistenciaContainer}>
                    <Text style={styles.ohmsLabel}>Ω</Text>
                    <Text style={styles.resistenciaValue}>{item.fioMarcha.resistencia}</Text>
                  </View>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoHeader}>Fio auxiliar</Text>
                  <Text style={styles.infoModeloFio}>{item.fioAuxiliar.modeloFio}</Text>
                  <View style={styles.resistenciaContainer}>
                    <Text style={styles.ohmsLabel}>Ω</Text>
                    <Text style={styles.resistenciaValue}>{item.fioAuxiliar.resistencia}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
} 