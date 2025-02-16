import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function RecipeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Animated.View 
        entering={FadeInDown.delay(200).duration(1000)}
        style={styles.header}
      >
        <Text style={styles.title}>Recipe Generator</Text>
        <Text style={styles.subtitle}>Discover delicious meals</Text>
      </Animated.View>

      {/* Recipe Cards */}
      <View style={styles.recipesContainer}>
        {/* Recipe Card 1 */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(1000)}
          style={styles.recipeCard}
        >
          <View style={styles.imageContainer}>
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={40} color="#B1C29E" />
            </View>
          </View>
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeName}>Chicken Alfredo</Text>
            <View style={styles.recipeMetaContainer}>
              <View style={styles.recipeMeta}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.metaText}>30 min</Text>
              </View>
              <View style={styles.recipeMeta}>
                <Ionicons name="star-outline" size={16} color="#666" />
                <Text style={styles.metaText}>4.5</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Recipe Card 2 */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(1000)}
          style={styles.recipeCard}
        >
          <View style={styles.imageContainer}>
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={40} color="#B1C29E" />
            </View>
          </View>
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeName}>Chicken Noodles</Text>
            <View style={styles.recipeMetaContainer}>
              <View style={styles.recipeMeta}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.metaText}>25 min</Text>
              </View>
              <View style={styles.recipeMeta}>
                <Ionicons name="star-outline" size={16} color="#666" />
                <Text style={styles.metaText}>4.2</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Generate Button */}
      <TouchableOpacity style={styles.generateButton}>
        <Text style={styles.generateButtonText}>Generate Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FADA7A', // Updated background color
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FADA7A', // Updated header background
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F0A04B', // Updated title color
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#F0A04B', // Updated subtitle color
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.8,
  },
  recipesContainer: {
    padding: 20,
  },
  recipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeInfo: {
    padding: 16,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  recipeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  generateButton: {
    backgroundColor: '#FCE7C8', // Updated generate button color
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#FCE7C8',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  generateButtonText: {
    color: '#F0A04B', // Updated button text color for better contrast
    fontSize: 18,
    fontWeight: '600',
  },
});