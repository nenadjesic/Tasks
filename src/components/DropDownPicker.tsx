import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


//DROPDOWN LISTA GENERICNOG TIPA. 

interface GenericDropdownProps<T> {
  testID?: string; 
  label: string;
  data: T[];                 
  value: string | null;        
  labelField: keyof T;         
  valueField: keyof T;          
  placeholder?: string;
  onChange: (value: string) => void; 
}

const DropdownPicker = <T extends any>({
  testID, 
  label,
  data,
  value,
  labelField,
  valueField,
  placeholder = "Clean...",
  onChange,
}: GenericDropdownProps<T>) => {
  return (
    <View style={styles.container} testID={testID}> 
      {label && <Text style={styles.label}>{label}</Text>}
      <Dropdown
        accessibilityLabel={testID} 
        style={styles.dropdown}
        data={data}
        labelField={labelField as string}
        valueField={valueField as string}
        placeholder={placeholder}
        value={value}
        onChange={(item) => {
          const val = item[valueField] as unknown as string;
          onChange(val);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333'
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fafafa'
  },
  placeholderStyle: { fontSize: 16, color: '#999' },
  selectedTextStyle: { fontSize: 16, color: '#000' },
});

export default DropdownPicker;
