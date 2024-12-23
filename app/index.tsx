import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import transactionsData from "../transactionsData.json";
import { Transaction } from "@/types/transactions";
import { useAuthentication } from "@/hooks/useAuthentication";
import { TransactionDetail } from "@/components/TransactionDetail";
import { TransactionItem } from "@/components/TransactionItem";
import { SortButtons } from "@/components/SortButtons";

export default function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>(
    transactionsData as Transaction[]
  );
  const [showAmount, setShowAmount] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [sortOption, setSortOption] = useState<string>("date"); // default sort option
  const [sortDirection, setSortDirection] = useState<string>("asc"); // default sort ascending
  const { authenticate, checkDeviceForHardware, checkForBiometrics } =
    useAuthentication();

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

    // Toggle sort direction if the same option is clicked again
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
      <StatusBar style="auto" />
      <Text style={styles.heading}>Transactions History</Text>

      <TouchableOpacity
        style={authenticated ? styles.hideButton : styles.showButton}
        onPress={() => {
          if (authenticated) {
            setAuthenticated(false);
            return;
          }
          checkDeviceForHardware();
          checkForBiometrics();
          authenticate(setAuthenticated);
        }}
      >
        <Text style={styles.buttonText}>
          {authenticated ? "Logout" : "Login"}
        </Text>
      </TouchableOpacity>

      {authenticated ? (
        <>
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
              ``
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
        </>
      ) : (
        <Text style={styles.authMessage}>
          Please authenticate to view transactions.
        </Text>
      )}
    </View>
  );
}

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
  authMessage: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 16,
    color: "#6b7280",
  },
  showButton: {
    backgroundColor: "#4CAF50", // Green color for "Show" button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  hideButton: {
    backgroundColor: "#f44336", // Red color for "Hide" button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
