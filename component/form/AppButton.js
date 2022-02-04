import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const AppButton = ({label , handleClick , ...otherProps}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleClick}
        {...otherProps}
      >
        <Text style={styles.text}> {label} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 25,
    height: 35,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  container: {
    flexDirection: "row",
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
  },
});

export default AppButton;
