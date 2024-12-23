import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface SortButtonsProps {
  onSort: (option: string) => void;
}

export const SortButtons: React.FC<SortButtonsProps> = ({ onSort }) => (
  <View style={styles.sortButtonContainer}>
    <TouchableOpacity style={styles.sortButton} onPress={() => onSort("date")}>
      <Text style={styles.sortButtonText}>Date</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.sortButton}
      onPress={() => onSort("amount")}
    >
      <Text style={styles.sortButtonText}>Amount</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.sortButton} onPress={() => onSort("type")}>
      <Text style={styles.sortButtonText}>Type</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  sortButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  sortButton: {
    backgroundColor: "#e5e7eb",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  sortButtonText: {
    fontSize: 16,
    color: "#1f2937",
  },
});
