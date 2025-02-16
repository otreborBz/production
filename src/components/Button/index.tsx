import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '../../theme/colors';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: keyof typeof MaterialIcons.glyphMap;
  loading?: boolean;
  fullWidth?: boolean;
};

export function Button({ 
  title, 
  onPress, 
  variant = 'primary',
  icon,
  loading = false,
  fullWidth = false
}: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <>
          {icon && (
            <MaterialIcons 
              name={icon} 
              size={24} 
              color={variant === 'secondary' ? COLORS.primary : '#FFF'} 
              style={styles.icon}
            />
          )}
          <Text style={variant === 'secondary' ? styles.secondaryText : styles.text}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
} 