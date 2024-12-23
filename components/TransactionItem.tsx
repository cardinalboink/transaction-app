import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Transaction } from "../types/transactions";

interface TransactionItemProps {
  transaction: Transaction;
  showAmount: boolean;
  onPress: (transaction: Transaction) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  showAmount,
  onPress,
}) => (
  <TouchableOpacity onPress={() => onPress(transaction)}>
    <View style={styles.transactionItem}>
      <Text style={styles.transactionDate}>{transaction.date}</Text>
      <Text style={styles.transactionDescription}>
        {transaction.description}
      </Text>
      <Text style={styles.transactionAmount}>
        {showAmount ? `RM ${transaction.amount}` : "*****"}
      </Text>
      <Text
        style={
          transaction.type === "debit"
            ? styles.transactionTypeDebit
            : styles.transactionTypeCredit
        }
      >
        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  transactionItem: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
  },
  transactionDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  transactionDescription: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    color: "#111827",
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
