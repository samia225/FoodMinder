import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native";
import ItemList from "@/components/ItemList";

const Dashboard: React.FC = () => {
  const userName: string = "Mike"; 
  const remainingBudget: string = "$120.50"; 
  const [items, setItems] = useState<string[]>(["Milk", "Bread", "Cheese"]);

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

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
        <ItemList items={items} addItem={addItem} />

        {/* Remaining Budget */}
        <Text style={styles.budgetText}>Remaining Budget: {remainingBudget}</Text>
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
  budgetText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
});

export default Dashboard;