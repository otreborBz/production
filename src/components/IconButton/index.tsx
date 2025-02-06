import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';

type IconButtonProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
  color?: string;
};

export function IconButton({ icon, label, onPress, color = '#000' }: IconButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialIcons name={icon} size={32} color={color} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
} 