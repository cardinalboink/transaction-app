import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { Transaction } from "../types/transactions";

interface TransactionDetailProps {
  transaction: Transaction;
  onBackPress: () => void;
}

export const TransactionDetail: React.FC<TransactionDetailProps> = ({
  transaction,
  onBackPress,
}) => (
  <View style={styles.transactionDetail}>
    <Button title="Back" onPress={onBackPress} />
    <Text style={styles.detailText}>Amount: RM {transaction.amount}</Text>
    <Text style={styles.detailText}>Date: {transaction.date}</Text>
    <Text style={styles.detailText}>
      Description: {transaction.description}
    </Text>
    <Text
      style={
        transaction.type === "debit"
          ? styles.transactionTypeDebit
          : styles.transactionTypeCredit
      }
    >
      Type: {transaction.type}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  transactionDetail: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 16,
  },
  detailText: {
    fontSize: 16,
    color: "#1f2937",
    marginBottom: 8,
  },
  transactionTypeDebit: {
    fontSize: 14,
    color: "#ef4444",
    marginTop: 4,
  },
  transactionTypeCredit: {
    fontSize: 14,
    color: "#10b981",
    marginTop: 4,
  },
});
