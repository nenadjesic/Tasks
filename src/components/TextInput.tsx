import React from "react";
import { View, TextInput, StyleSheet, TextInputProps, DimensionValue } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";


interface Props extends TextInputProps {
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  width?: DimensionValue; 
}

const AppTextInput: React.FC<Props> = ({ icon, width = "100%", ...otherProps }) => {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, styles.input]} // Združimo stile za boljšo kontrolo
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    alignItems: "center", 
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1, 
  }
});

export default AppTextInput;
