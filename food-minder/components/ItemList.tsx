import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import FoodItem from "@/components/FoodItem";

type FoodItemType = {
  id: string;
  emoji: string;
  name: string;
};

type ItemListProps = {
  items: FoodItemType[];
};

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {items.map((item) => (
          <FoodItem key={item.id} foodItem={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default ItemList;