**Transaction App**

This is a simple mobile app built with React Native and Expo that displays transaction history with authentication features. It includes a variety of functionalities like transaction sorting, viewing transaction details, and biometric authentication.

Features
Biometric Authentication: Users must authenticate using biometrics (Fingerprint/Face ID) to view the transaction history.
Transaction Display: Displays a list of transactions with amount, date, description, and type.
Transaction Sorting: Sort transactions by date, amount, or type.
Transaction Detail View: View detailed information for a selected transaction.
Amount Masking: Toggle between showing or hiding the transaction amounts for security.
Prerequisites
Before setting up the project, make sure you have the following installed:

Node.js: Ensure you have Node.js installed (v14 or higher).
Expo CLI: The Expo CLI is required for running the project in development mode.
Install Expo CLI
If you don't have Expo CLI installed, you can install it globally via npm:

bash
Copy code
npm install -g expo-cli
Setup Instructions
1. Clone the Repository
Clone this repository to your local machine:

bash
Copy code
git clone https://github.com/cardinalboink/transaction-app.git
Navigate to the project directory:

bash
Copy code
cd transaction-app
2. Install Dependencies
Once you've cloned the repository, install the project dependencies:

bash
Copy code
npm install
3. Start the Expo Project
To start the development server, run the following command:

bash
Copy code
expo start
This will open the Expo developer tools in your default web browser. You can now scan the QR code using the Expo Go app (available on iOS and Android) or press i to run the app in an iOS simulator (or a for an Android emulator).

4. Authentication Setup
This app uses Expo's biometric authentication. Ensure your device supports fingerprint or face recognition for biometric authentication to work correctly.

5. Running on a Device or Emulator
If you prefer to test it on an emulator or real device, follow the steps below:

iOS Device/Simulator:
Open the Expo Go app and scan the QR code.
Or press i to run it on an iOS simulator.
Android Device/Emulator:
Open the Expo Go app and scan the QR code.
Or press a to run it on an Android emulator.
