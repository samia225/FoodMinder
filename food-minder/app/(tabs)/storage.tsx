import React, { useState } from "react";
import { View, Text, ScrollView, FlatList, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

// Define food item type
type FoodItem = {
  id: string;
  emoji: string;
  name: string;
  expiryDate: string;
};

// Sample data
const data: FoodItem[] = [
    { id: "1", emoji: "🍎", name: "Apple", expiryDate: "2025-02-17" }, // 1 day left
    { id: "2", emoji: "🥦", name: "Broccoli", expiryDate: "2025-02-18" }, // 2 days left
    { id: "3", emoji: "🥛", name: "Milk", expiryDate: "2025-02-19" }, // 3+ days left
    { id: "4", emoji: "🍞", name: "Bread", expiryDate: "2025-02-17" }, // 1 day left
    { id: "5", emoji: "🍗", name: "Chicken", expiryDate: "2025-02-20" }, // 3+ days left
    { id: "6", emoji: "🍌", name: "Banana", expiryDate: "2025-02-18" }, // 2 days left
    { id: "7", emoji: "🥕", name: "Carrot", expiryDate: "2025-02-21" }, // 3+ days left
    { id: "8", emoji: "🍇", name: "Grapes", expiryDate: "2025-02-22" }, // 3+ days left
    { id: "9", emoji: "🥚", name: "Eggs", expiryDate: "2025-02-25" }, // 3+ days left
    { id: "10", emoji: "🍊", name: "Orange", expiryDate: "2025-02-19" }, // 3+ days left
    { id: "11", emoji: "🥩", name: "Beef", expiryDate: "2025-02-20" }, // 3+ days left
    { id: "12", emoji: "🧀", name: "Cheese", expiryDate: "2025-02-28" }, // 3+ days left
    { id: "13", emoji: "🍉", name: "Watermelon", expiryDate: "2025-02-26" }, // 3+ days left
  ];
  

// Card Component
const Card: React.FC<{ emoji: string; name: string; expiryDate: string }> = ({
  emoji,
  name,
  expiryDate,
}) => (
  <View style={styles.card}>
    <Text style={styles.emoji}>{emoji}</Text>
    <Text style={styles.foodName}>{name}</Text>
    <Text style={styles.expiryDate}>Expires: {expiryDate}</Text>
  </View>
);

// Main Card Screen
const CardScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Helper function to get remaining days
  const getDaysLeft = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const difference = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return difference;
  };

  // Filter and sort data
  const sortedData = [...data]
    .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => getDaysLeft(a.expiryDate) - getDaysLeft(b.expiryDate));

  // Categorize items
  const items1Day = sortedData.filter((item) => getDaysLeft(item.expiryDate) === 1);
  const items2Days = sortedData.filter((item) => getDaysLeft(item.expiryDate) === 2);
  const items3OrMore = sortedData.filter((item) => getDaysLeft(item.expiryDate) >= 3);

  // Function to handle camera button press
  const openCamera = () => {
    launchCamera({ mediaType: "photo" }, (response) => {
      if (response.assets) {
        console.log(response.assets[0].uri);
      }
    });
  };

  // Function to handle gallery button press
  const openGallery = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.assets) {
        console.log(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for food..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

    <ScrollView contentContainerStyle={{ padding: 5 }}>
      {/* Section - 1 Day Left */}
      {items1Day.length > 0 && <Text style={styles.sectionHeader}>1 Day Left</Text>}
      <FlatList
        data={items1Day}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Card emoji={item.emoji} name={item.name} expiryDate={item.expiryDate} />
        )}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={false}
      />

      {/* Section - 2 Days Left */}
      {items2Days.length > 0 && <Text style={styles.sectionHeader}>2 Days Left</Text>}
      <FlatList
        data={items2Days}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Card emoji={item.emoji} name={item.name} expiryDate={item.expiryDate} />
        )}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={false}
      />

      {/* Section - 3 or More Days Left */}
      {items3OrMore.length > 0 && <Text style={styles.sectionHeader}>3+ Days Left</Text>}
      <FlatList
        data={items3OrMore}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Card emoji={item.emoji} name={item.name} expiryDate={item.expiryDate} />
        )}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={false}
      />

    </ScrollView>
    {/* Floating Action Button for Camera */}
    <TouchableOpacity style={styles.floatingButton} onPress={openCamera}>
        <Text style={styles.floatingButtonText}>⌞ ⌝</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FCE7C8",
  },
  searchBar: {
    height: 40,
    borderColor: "#F0A04B",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 5,
    color: "#444",
  },
  listContainer: {
    paddingBottom: 10,
  },
  card: {
    width: "30%", // Set to about 1/3 of the container width for 3 items per row
    margin: 5,
    height: 120,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  emoji: {
    fontSize: 30,
    marginBottom: 5,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expiryDate: {
    fontSize: 14,
    color: "red",
    marginTop: 5,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#B1C29E",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 30,
    color: "#fff",
  },
});
