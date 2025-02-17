import React from "react";
import { View, Text, StyleSheet } from "react-native";

type FoodItemProps = {
  foodItem: {
    id: string;
    emoji: string;
    name: string;
  };
};

const FoodItem: React.FC<FoodItemProps> = ({ foodItem }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{foodItem.emoji}</Text>
      <Text style={styles.name}>{foodItem.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 8,
    borderRadius: 10,
    width: 100, // Fixed width for each item
    height: 120, // Proper height for visibility
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  emoji: {
    fontSize: 30,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
});

export default FoodItem;