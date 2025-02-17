import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Avatar } from "react-native-paper";
import ItemList from "@/components/ItemList";

const Dashboard: React.FC = () => {
  const userName: string = "Mike";
  const remainingBudget: string = "$120.50";

  // Expiring Food Items
  const [expiringItems, setExpiringItems] = useState([
    { id: "1", emoji: "🥛", name: "Milk" },
    { id: "2", emoji: "🍞", name: "Bread" },
    { id: "3", emoji: "🧀", name: "Cheese" },
    { id: "4", emoji: "🍎", name: "Apple" },
    { id: "5", emoji: "🥚", name: "Eggs" },
    { id: "6", emoji: "🥕", name: "Carrot" },
    { id: "7", emoji: "🍌", name: "Banana" },
  ]);

  // Past Recipes
  const [pastRecipes, setPastRecipes] = useState([
    { id: "1", emoji: "🍕", name: "Pizza" },
    { id: "2", emoji: "🥗", name: "Salad" },
    { id: "3", emoji: "🍜", name: "Ramen" },
    { id: "4", emoji: "🍔", name: "Burger" },
    { id: "5", emoji: "🍲", name: "Soup" },
    { id: "6", emoji: "🌮", name: "Tacos" },
  ]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
          <TouchableOpacity onPress={() => console.log("Profile Clicked")}>
            <Avatar.Icon size={40} icon="account-circle" />
          </TouchableOpacity>
        </View>

        {/* Expiring Items Section */}
        <Text style={styles.sectionTitle}>Expiring Items</Text>
        <ItemList items={expiringItems} />

        {/* Past Recipes Section */}
        <Text style={styles.sectionTitle}>Past Recipes</Text>
        <ItemList items={pastRecipes} />

        {/* Remaining Budget Section */}
        <View style={styles.budgetContainer}>
          <Text style={styles.budgetText}>Remaining Budget</Text>
          <Text style={styles.budgetAmount}>{remainingBudget}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#FADA7A",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  budgetContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  budgetText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  budgetAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 5,
  },
});

export default Dashboard;