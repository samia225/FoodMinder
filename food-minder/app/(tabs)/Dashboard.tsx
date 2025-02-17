import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Avatar } from "react-native-paper";
import ItemList from "@/components/ItemList";
import RecipeCard from "@/components/RecipeCard";
import pizzaImage from "@/assets/images/pizza.jpg";
import saladImage from "@/assets/images/salad.jpg";
import ramenImage from "@/assets/images/ramen.jpg";
import burgerImage from "@/assets/images/burger.jpg";
import soupImage from "@/assets/images/soup.jpg";
import tacosImage from "@/assets/images/tacos.jpg";



const Dashboard: React.FC = () => {
  const userName: string = "Mike";
  const remainingBudget: string = "$120.50";

  // Expiring Food Items
  const [expiringItems, setExpiringItems] = useState([
    { id: "1", emoji: "🥛", name: "Milk", expiry: "Feb 18" },
    { id: "2", emoji: "🍞", name: "Bread", expiry: "Feb 20" },
    { id: "3", emoji: "🧀", name: "Cheese", expiry: "Feb 22" },
    { id: "4", emoji: "🍎", name: "Apple", expiry: "Feb 23" },
    { id: "5", emoji: "🥚", name: "Eggs", expiry: "Feb 25" },
    { id: "6", emoji: "🥕", name: "Carrot", expiry: "Feb 28" },
    { id: "7", emoji: "🍌", name: "Banana", expiry: "Feb 27" },
  ]);

  // Past Recipes
  const [pastRecipes, setPastRecipes] = useState([
    { id: "1", name: "Pizza", time: "25 min", rating: "4.8", image: pizzaImage },
    { id: "2", name: "Salad", time: "15 min", rating: "4.6", image: saladImage },
    { id: "3", name: "Ramen", time: "40 min", rating: "4.7", image: ramenImage },
    { id: "4", name: "Burger", time: "20 min", rating: "4.5", image: burgerImage },
    { id: "5", name: "Soup", time: "35 min", rating: "4.9", image: soupImage },
    { id: "6", name: "Tacos", time: "30 min", rating: "4.4", image: tacosImage },
  ]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
          <TouchableOpacity onPress={() => console.log("Profile Clicked")}>
            <Avatar.Icon size={40} icon="account-circle" color="#FFFFFF" style={{ backgroundColor: "#B1C29E" }} />
          </TouchableOpacity>
        </View>

        {/* Expiring Items Section */}
        <Text style={styles.sectionTitle}>Expiring Items</Text>
        <ItemList items={expiringItems} />

        {/* Past Recipes Section */}
        <Text style={styles.sectionTitle}>Past Recipes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recipesContainer}>
          {pastRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} name={recipe.name} time={recipe.time} rating={recipe.rating} image={recipe.image} />
          ))}
        </ScrollView>

        {/* Remaining Budget Section */}
        <View style={styles.budgetContainer}>
          <Text style={styles.budgetText}>Remaining Budget</Text>
          <Text style={styles.budgetAmount}>{remainingBudget}</Text>
        </View>
      </ScrollView>
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
  recipesContainer: {
    flexDirection: "row",
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