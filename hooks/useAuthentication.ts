import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";

export const useAuthentication = () => {
  const authenticate = async (setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        setAuthenticated(true);
      } else {
        Alert.alert("Authentication failed");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      Alert.alert("Authentication failed");
    }
  };

  const checkDeviceForHardware = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      console.log("Device compatible with biometrics:", compatible);
    } catch (error) {
      console.error("Error checking hardware:", error);
    }
  };

  const checkForBiometrics = async () => {
    try {
      const biometricRecords = await LocalAuthentication.isEnrolledAsync();
      console.log("Biometric records found on device:", biometricRecords);
    } catch (error) {
      console.error("Error checking for biometrics:", error);
    }
  };

  return { authenticate, checkDeviceForHardware, checkForBiometrics };
};
