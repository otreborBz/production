import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import WheelPicker from 'react-native-wheel-picker-android';
import { styles } from './styles';
import { COLORS } from '../../theme/colors';

export const TimePicker = ({ onTimeSelect }) => {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showNativePicker, setShowNativePicker] = useState(false);
  const [showWheelPicker, setShowWheelPicker] = useState(false);
  
  const hours = Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({length: 60}, (_, i) => i.toString().padStart(2, '0'));

  const handleNativeTimeChange = (event, time) => {
    setShowNativePicker(false);
    if (time) {
      setSelectedTime(time);
      onTimeSelect(time);
    }
  };

  const handleQuickTimeSelect = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const newTime = new Date();
    newTime.setHours(parseInt(hours), parseInt(minutes));
    setSelectedTime(newTime);
    onTimeSelect(newTime);
  };

  return (
    <View style={styles.container}>
      {/* Botão para abrir o picker nativo */}
      <TouchableOpacity 
        style={styles.mainButton}
        onPress={() => setShowNativePicker(true)}>
        <Text style={styles.mainButtonText}>Selecionar Horário</Text>
      </TouchableOpacity>

      {/* Quick Time Buttons */}
      <View style={styles.quickTimeContainer}>
        {['08:00', '12:00', '18:00'].map((time) => (
          <TouchableOpacity 
            key={time}
            style={styles.timeButton}
            onPress={() => handleQuickTimeSelect(time)}>
            <Text style={styles.timeButtonText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Native Time Picker */}
      {showNativePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={handleNativeTimeChange}
        />
      )}

      {/* Custom Wheel Picker Modal */}
      <Modal
        visible={showWheelPicker}
        transparent
        animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.wheelPickerContainer}>
              <WheelPicker
                data={hours}
                style={styles.wheelPicker}
                selectedItemTextColor={COLORS.primary}
                onItemSelected={(index) => console.log(hours[index])}
              />
              <Text style={styles.timeSeparator}>:</Text>
              <WheelPicker
                data={minutes}
                style={styles.wheelPicker}
                selectedItemTextColor={COLORS.primary}
                onItemSelected={(index) => console.log(minutes[index])}
              />
            </View>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowWheelPicker(false)}>
              <Text style={styles.closeButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
