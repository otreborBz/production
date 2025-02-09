import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const ProductionList = ({ productions, onDeleteProduction }) => {
  const handleLongPress = (productionId) => {
    onDeleteProduction(productionId);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productionItem}
      onLongPress={() => handleLongPress(item.id)}
      delayLongPress={800}
    >
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{item.startTime} - {item.endTime}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.productionText}>Produção: {item.quantity}</Text>
        {item.stopCode && (
          <Text style={styles.stopCodeText}>Código Parada: {item.stopCode}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produção por Hora</Text>
      <FlatList
        data={productions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};
