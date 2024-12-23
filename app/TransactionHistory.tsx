import React, { useState } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { Transaction } from "@/types/transactions";
import { TransactionItem } from "@/components/TransactionItem";
import { SortButtons } from "@/components/SortButtons";
import transactionsData from "../transactionsData.json"; // Transaction data
import { TransactionDetail } from "@/components/TransactionDetail";

export const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(
    transactionsData as Transaction[]
  );
  const [showAmount, setShowAmount] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [sortOption, setSortOption] = useState<string>("date"); // Default sort option
  const [sortDirection, setSortDirection] = useState<string>("asc"); // Default sort ascending
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleAmountVisibility = () => {
    setShowAmount(!showAmount);
  };

  const handleTransactionPress = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleBackPress = () => {
    setSelectedTransaction(null);
  };

  const sortTransactions = (option: string) => {
    let sortedTransactions = [...transactions];

    if (option === sortOption) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortOption(option);
      setSortDirection("asc"); // Default to ascending when switching sort options
    }

    switch (option) {
      case "date":
        sortedTransactions.sort((a, b) => {
          if (sortDirection === "asc") {
            return a.date > b.date ? 1 : -1;
          } else {
            return a.date < b.date ? 1 : -1;
          }
        });
        break;
      case "amount":
        sortedTransactions.sort((a, b) => {
          if (sortDirection === "asc") {
            return a.amount - b.amount;
          } else {
            return b.amount - a.amount;
          }
        });
        break;
      case "type":
        sortedTransactions.sort((a, b) => {
          if (sortDirection === "asc") {
            return a.type > b.type ? 1 : -1;
          } else {
            return a.type < b.type ? 1 : -1;
          }
        });
        break;
      default:
        break;
    }
    setTransactions(sortedTransactions);
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.amount.toString().includes(searchQuery)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {selectedTransaction ? "Transaction Details" : "Transactions History"}
      </Text>
      {selectedTransaction ? (
        <TransactionDetail
          transaction={selectedTransaction}
          onBackPress={handleBackPress}
        />
      ) : (
        <>
          <Button
            title={showAmount ? `Hide Amount` : "Show Amount"}
            onPress={toggleAmountVisibility}
          />
          <SortButtons onSort={sortTransactions} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by description, type, or amount"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#6b7280"
          />
          <FlatList
            data={filteredTransactions}
            renderItem={({ item }) => (
              <TransactionItem
                transaction={item}
                showAmount={showAmount}
                onPress={handleTransactionPress}
              />
            )}
            keyExtractor={(item) => item.id}
            refreshing={false}
            onRefresh={() => console.log("Refresh transactions")}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#111827",
  },
  searchInput: {
    marginVertical: 16,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
});
