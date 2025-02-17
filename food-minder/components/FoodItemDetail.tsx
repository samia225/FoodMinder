import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type FoodItem = {
  id: string;
  emoji: string;
  name: string;
  expiryDate: string;
  price: number;
};

type FoodItemDetailProps = {
  foodItem: FoodItem;
  onClose: () => void;
  onConsumed: () => void;
  onDisposed: () => void;
  onSave: (updatedFoodItem: FoodItem) => void;
};

const donationCenters = [
  { id: '1', name: 'Edmonton Food Bank', address: '11508 120 St NW, Edmonton, AB' },
  { id: '2', name: 'The Mustard Seed', address: '10635 96 St NW, Edmonton, AB' },
  { id: '3', name: 'WIN House', address: '10909 103 St NW, Edmonton, AB' },
  { id: '4', name: 'Hope Mission', address: '9908 106 Ave NW, Edmonton, AB' },
];

const FoodItemDetail: React.FC<FoodItemDetailProps> = ({ foodItem, onClose, onConsumed, onDisposed, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableName, setEditableName] = useState(foodItem.name);
  const [editablePrice, setEditablePrice] = useState(foodItem.price.toString());
  const [editableExpiryDate, setEditableExpiryDate] = useState(foodItem.expiryDate);
  const [showDonationList, setShowDonationList] = useState(false);

  const toggleEdit = () => {
    if (isEditing) {
      onSave({
        ...foodItem,
        name: editableName,
        price: parseFloat(editablePrice) || 0,
        expiryDate: editableExpiryDate,
      });
    }
    setIsEditing(!isEditing);
  };

  const toggleDonationList = () => {
    setShowDonationList(!showDonationList);
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modal}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={toggleEdit}>
          <MaterialIcons name={isEditing ? "check" : "edit"} size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.emoji}>{foodItem.emoji}</Text>
        {isEditing ? (
          <TextInput style={styles.input} value={editableName} onChangeText={setEditableName} />
        ) : (
          <Text style={styles.foodName}>{foodItem.name}</Text>
        )}
        <Text style={styles.expiryDateLabel}>Expires:</Text>
        {isEditing ? (
          <TextInput style={styles.input} value={editableExpiryDate} onChangeText={setEditableExpiryDate} />
        ) : (
          <Text style={styles.expiryDate}>{foodItem.expiryDate}</Text>
        )}
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editablePrice}
            onChangeText={setEditablePrice}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.price}>Price: ${foodItem.price}</Text>
        )}
        
        {/* Donation Button */}
        <TouchableOpacity style={styles.buttonDonation} onPress={toggleDonationList}>
          <Text style={styles.buttonText}>Donation</Text>
        </TouchableOpacity>

        {/* Donation Centers List */}
        {showDonationList && (
          <View style={styles.donationList}>
            <FlatList
              data={donationCenters}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.donationItem}>
                  <Text style={styles.donationName}>{item.name}</Text>
                  <Text style={styles.donationAddress}>{item.address}</Text>
                </View>
              )}
            />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonConsumed} onPress={onConsumed}>
            <Text style={styles.buttonText}>Consumed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDisposed} onPress={onDisposed}>
            <Text style={styles.buttonText}>Disposed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    width: 300,
    maxWidth: "100%",
    alignItems: "center",
    position: "relative",
  },
  emoji: {
    fontSize: 50,
  },
  foodName: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    width: "100%",
    textAlign: "center",
  },
  expiryDateLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    width: "100%",
    textAlign: "center",
  },
  expiryDate: {
    fontSize: 16,
    color: "red",
  },
  price: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    borderBottomWidth: 1,
    width: "80%",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 4,
    left: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
  },
  editButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  buttonConsumed: {
    backgroundColor: "#B1C29E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonDisposed: {
    backgroundColor: "#FF7477",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonDonation: {
    backgroundColor: "#56C1A5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  donationList: {
    marginTop: 10,
    width: "80%",
  },
  donationItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  donationName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  donationAddress: {
    fontSize: 14,
    color: "#555",
  },
});

export default FoodItemDetail;
