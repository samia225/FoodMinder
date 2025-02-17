import React from "react";
import { View, Text, FlatList, Button, StyleSheet, SafeAreaView } from "react-native";

type ListExpProps = {
  items: string[];
  addItem: () => void;
};

const ItemList: React.FC<ListExpProps> = ({ items, addItem }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.listContainer}>
        {/* Title */}
        <Text style={styles.title}>Expiring Items</Text>

        {/* List of items */}
        <FlatList
          data={items}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent} // Centering the list
        />

        {/* Button at the bottom */}
        <View style={styles.buttonContainer}>
          <Button title="See More Items" onPress={addItem} color="#007AFF" />
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    justifyContent: "center", // Centers the content vertically
    alignItems: "center", // Centers the content horizontally
  },
  listContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20, // Rounded corners
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  listContent: {
    alignItems: "center", // Centers list items horizontally
  },
  item: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 15,
    alignSelf: "center",
  },
});

export default ItemList;