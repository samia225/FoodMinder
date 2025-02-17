import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface RecipeCardProps {
    name: string;
    time: string;
    rating: string;
    image: any; // Accept local images
}

const RecipeCard: React.FC<RecipeCardProps> = ({ name, time, rating, image }) => {
    return (
    <View style={styles.card}>
        <Image source={image} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.details}>{time} • ⭐ {rating}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
card: {
    width: 160,
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 10,
    marginRight: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  details: {
    fontSize: 14,
    color: "#555",
  },
});

export default RecipeCard;