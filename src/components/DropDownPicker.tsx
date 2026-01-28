import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

// Definiramo generički interfejs za propse
interface GenericDropdownProps<T> {
  label: string;
  data: T[];                    // Niz bilo kojeg tipa podataka
  value: string | null;         // Trenutno odabrana vrijednost
  labelField: keyof T;          // Ključ iz objekta T koji će se prikazati (npr. 'label')
  valueField: keyof T;          // Ključ iz objekta T koji služi kao ID (npr. 'value')
  placeholder?: string;
  onChange: (value: string) => void; // Šaljemo nazad samo vrijednost stringu
}

// <T extends any> govori TypeScriptu da je ovo generička komponenta
const DropdownPicker = <T extends any>({
  label,
  data,
  value,
  labelField,
  valueField,
  placeholder = "Izaberi...",
  onChange,
}: GenericDropdownProps<T>) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        labelField={labelField as string}
        valueField={valueField as string}
        placeholder={placeholder}
        value={value}
        onChange={(item) => {
          // Dinamički pristupamo polju koje je definisano kao valueField
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
