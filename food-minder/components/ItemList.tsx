import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

interface Item {
  id: string;
  emoji: string;
  name: string;
  expiry: string;
}

interface ItemListProps {
  items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.emoji}>{item.emoji}</Text>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.expiryText}>Expires: {item.expiry}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginRight: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: 120,
  },
  emoji: {
    fontSize: 30,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  expiryText: {
    fontSize: 14,
    color: "#FF5733",
    marginTop: 4,
  },
});

export default ItemList;