// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// type CardProps = {
//   emoji: string;
//   name: string;
//   expiryDate: string;
// };

// const Card: React.FC<CardProps> = ({ emoji, name, expiryDate }) => (
//   <View style={styles.card}>
//     <Text style={styles.emoji}>{emoji}</Text>
//     <Text style={styles.foodName}>{name}</Text>
//     <Text style={styles.expiryDate}>Expires: {expiryDate}</Text>
//   </View>
// );

// export default Card;

// const styles = StyleSheet.create({
//   card: {
//     flex: 1,
//     margin: 5,
//     height: 120,
//     backgroundColor: "#f8f9fa",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//     padding: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 3 },
//     elevation: 3,
//   },
//   emoji: {
//     fontSize: 30, // Large emoji
//     marginBottom: 5,
//   },
//   foodName: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   expiryDate: {
//     fontSize: 14,
//     color: "red", // Make expiration date stand out
//     marginTop: 5,
//   },
// });
