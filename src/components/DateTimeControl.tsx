import React, { useState } from 'react';
import { View, Button, Platform, Text, StyleSheet } from 'react-native';

import DateTimePicker, { 
  DateTimePickerAndroid, 
  DateTimePickerEvent 
} from '@react-native-community/datetimepicker';


type PickerMode = 'date' | 'time';

interface DateTimeControlProps {
  testID?: string;
  label?: string;
  value: Date | null;                   
  mode?: PickerMode;  
  placeholder?: string;
  onChange: (date: Date) => void;   
}

const DateTimeControl: React.FC<DateTimeControlProps> = ({ 
  testID,
  label, 
  value, 
  onChange, 
  mode = 'date', 
  placeholder = "Nije odabrano" 
}) => {
  const [showIOS, setShowIOS] = useState<boolean>(false);

  const formatDisplay = (): string => {
    if (!value) return placeholder;
    
    if (mode === 'time') {
      return value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return value.toLocaleDateString();
  };

  const handlePickerChange = (event: DateTimePickerEvent, selectedDate?: Date): void => {
   
    if (Platform.OS === 'ios') setShowIOS(false);

    if (event.type === 'set' && selectedDate) {
      onChange(selectedDate);
    }
  };

  const openPicker = (): void => {
    if (Platform.OS === 'android') {
      
      DateTimePickerAndroid.open({
        value: value || new Date(),
        onChange: handlePickerChange,
        mode: mode,
        is24Hour: true, testID: undefined
      });
    } else {
      setShowIOS(true);
    }
  };

  return (
    <View style={styles.container} testID={testID}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.pickerWrapper}>
        <Text style={styles.displayValue}>{formatDisplay()}</Text>
        <Button  title={mode === 'time' ? "Choose a time" : "Choose a date"} onPress={openPicker} />
      </View>

      {showIOS && Platform.OS === 'ios' && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={handlePickerChange }
          testID= ""
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333'
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fafafa'
  },
  displayValue: {
    fontSize: 16,
    color: '#333'
  }
});

export default DateTimeControl;
