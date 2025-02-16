import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native';

const Dashboard: React.FC = () => {
  const userName: string = "Mike"; // Example, replace with state/context
  const remainingBudget: string = "$120.50"; // Example, replace with actual data
  const expiringItems: string[] = ["Milk", "Bread", "Cheese"]; // Example items

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
        <Text style={styles.sectionTitle}>Items expiring today:</Text>
        <FlatList
          data={expiringItems}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* View All Button */}
        <Button mode="contained" onPress={() => console.log("View All Clicked")} style={styles.button}>
          View All
        </Button>

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
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,  // Adjust as needed
    paddingBottom: 30,  // Adjust as needed
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
    fontWeight: "600",
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    padding: 5,
  },
  button: {
    marginTop: 10,
  },
  budgetText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
});

export default Dashboard;