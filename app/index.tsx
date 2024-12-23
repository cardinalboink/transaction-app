import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useAuthentication } from "@/hooks/useAuthentication"; // Authentication hook
import { TransactionHistory } from "./TransactionHistory"; // Import TransactionHistory

export default function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const { authenticate, checkDeviceForHardware, checkForBiometrics } =
    useAuthentication();

  const toggleAuthentication = () => {
    if (authenticated) {
      setAuthenticated(false); // Logout
      return;
    }
    checkDeviceForHardware();
    checkForBiometrics();
    authenticate(setAuthenticated); // Authenticate user
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {authenticated ? (
        <TransactionHistory /> // Show transaction history after authentication
      ) : (
        <Text style={styles.authMessage}>
          Please authenticate to view transactions.
        </Text>
      )}

      <TouchableOpacity
        style={{
          ...styles.authButton,
          backgroundColor: authenticated ? "#CCCCCC" : "#4CAF50",
        }}
        onPress={toggleAuthentication}
      >
        <Text style={styles.buttonText}>
          {authenticated ? "Logout" : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-start", // Content aligns from top
  },
  authButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
    marginTop: "auto", // This pushes the button to the bottom of the screen
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  authMessage: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 20,
  },
});
