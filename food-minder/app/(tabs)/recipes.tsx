import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

type Recipe = {
  id: string;
  name: string;
  time: string;
  rating: number;
  image: any;
  mainIngredients: string[];
  fullRecipe: {
    ingredients: string[];
    instructions: string[];
  };
};

const RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'Cheese Pizza',
    time: '30 min',
    rating: 4.8,
    image: require('../../assets/images/pizza.png'),
    mainIngredients: ['Flour', 'Cheese', 'Tomato Sauce'],
    fullRecipe: {
      ingredients: [
        '2 cups all-purpose flour',
        '1 cup mozzarella cheese',
        '1/2 cup tomato sauce',
        '1 tsp olive oil',
        '1 tsp yeast',
        'Salt to taste'
      ],
      instructions: [
        'Mix flour and yeast with warm water',
        'Let dough rise for 30 minutes',
        'Roll out dough into circle',
        'Spread sauce and add cheese',
        'Bake at 450°F for 15 minutes'
      ]
    }
  },
  {
    id: '2',
    name: 'Overnight Oats',
    time: '5 min',
    rating: 4.5,
    image: require('../../assets/images/oats.png'),
    mainIngredients: ['Oats', 'Milk', 'Honey'],
    fullRecipe: {
      ingredients: [
        '1 cup rolled oats',
        '1 cup milk',
        '1 tbsp honey',
        '1/2 tsp vanilla extract',
        'Fruits for topping'
      ],
      instructions: [
        'Mix oats and milk in a jar',
        'Add honey and vanilla',
        'Refrigerate overnight',
        'Top with fresh fruits before serving'
      ]
    }
  },
  {
    id: '3',
    name: 'Avocado Toast',
    time: '10 min',
    rating: 4.6,
    image: require('../../assets/images/avo.png'),
    mainIngredients: ['Bread', 'Avocado', 'Eggs'],
    fullRecipe: {
      ingredients: [
        '2 slices whole grain bread',
        '1 ripe avocado',
        '2 eggs',
        'Salt and pepper to taste',
        'Red pepper flakes (optional)'
      ],
      instructions: [
        'Toast the bread slices',
        'Mash the avocado and spread on toast',
        'Fry or poach eggs',
        'Place eggs on avocado toast',
        'Season with salt, pepper, and red pepper flakes'
      ]
    }
  },
  {
    id: '4',
    name: 'Smoothie Bowl',
    time: '15 min',
    rating: 4.7,
    image: require('../../assets/images/smoothie.png'),
    mainIngredients: ['Frozen Berries', 'Banana', 'Yogurt'],
    fullRecipe: {
      ingredients: [
        '2 cups mixed frozen berries',
        '1 banana',
        '1/2 cup Greek yogurt',
        'Honey to taste',
        'Granola and fresh fruits for topping'
      ],
      instructions: [
        'Blend frozen berries, banana, and yogurt',
        'Add honey if needed',
        'Pour into bowl',
        'Top with granola and fresh fruits'
      ]
    }
  },
  {
    id: '5',
    name: 'Grilled Cheese',
    time: '10 min',
    rating: 4.4,
    image: require('../../assets/images/gcheese.png'),
    mainIngredients: ['Bread', 'Cheese', 'Butter'],
    fullRecipe: {
      ingredients: [
        '2 slices bread',
        '2 slices cheddar cheese',
        '1 tbsp butter',
        'Optional: sliced tomato'
      ],
      instructions: [
        'Butter one side of each bread slice',
        'Place cheese between unbuttered sides',
        'Cook in pan until golden brown',
        'Flip and cook other side until cheese melts'
      ]
    }
  },
  {
    id: '6',
    name: 'Fruit Parfait',
    time: '8 min',
    rating: 4.3,
    image: require('../../assets/images/parfait.png'),
    mainIngredients: ['Yogurt', 'Granola', 'Berries'],
    fullRecipe: {
      ingredients: [
        '1 cup Greek yogurt',
        '1/2 cup granola',
        '1 cup mixed berries',
        '1 tbsp honey',
        'Mint leaves for garnish'
      ],
      instructions: [
        'Layer yogurt in glass',
        'Add layer of granola',
        'Add layer of berries',
        'Repeat layers',
        'Drizzle with honey and garnish with mint'
      ]
    }
  },
  {
    id: '7',
    name: 'Pasta Aglio e Olio',
    time: '20 min',
    rating: 4.6,
    image: require('../../assets/images/pasta.png'),
    mainIngredients: ['Spaghetti', 'Garlic', 'Olive Oil'],
    fullRecipe: {
      ingredients: [
        '1/2 lb spaghetti',
        '4 cloves garlic, sliced',
        '1/4 cup olive oil',
        'Red pepper flakes',
        'Parsley',
        'Salt to taste'
      ],
      instructions: [
        'Cook pasta according to package',
        'Sauté garlic in olive oil',
        'Add red pepper flakes',
        'Toss with pasta',
        'Garnish with parsley'
      ]
    }
  },
  {
    id: '8',
    name: 'Egg Fried Rice',
    time: '15 min',
    rating: 4.5,
    image: require('../../assets/images/eggrice.png'),
    mainIngredients: ['Rice', 'Eggs', 'Vegetables'],
    fullRecipe: {
      ingredients: [
        '2 cups cooked rice',
        '2 eggs',
        '1 cup mixed vegetables',
        '2 tbsp soy sauce',
        'Oil for cooking'
      ],
      instructions: [
        'Scramble eggs in pan',
        'Add vegetables and stir-fry',
        'Add rice and soy sauce',
        'Mix well until heated through'
      ]
    }
  },
  {
    id: '9',
    name: 'Greek Salad',
    time: '12 min',
    rating: 4.7,
    image: require('../../assets/images/greek.png'),
    mainIngredients: ['Cucumber', 'Tomatoes', 'Feta'],
    fullRecipe: {
      ingredients: [
        '1 cucumber, diced',
        '2 tomatoes, diced',
        '1/2 cup feta cheese',
        '1/4 cup olives',
        'Olive oil and oregano'
      ],
      instructions: [
        'Combine cucumber and tomatoes',
        'Add olives and feta cheese',
        'Drizzle with olive oil',
        'Sprinkle oregano and serve'
      ]
    }
  },
  {
    id: '10',
    name: 'Banana Pancakes',
    time: '20 min',
    rating: 4.8,
    image: require('../../assets/images/pancakes.png'),
    mainIngredients: ['Banana', 'Flour', 'Milk'],
    fullRecipe: {
      ingredients: [
        '1 ripe banana',
        '1 cup flour',
        '1 cup milk',
        '1 egg',
        'Maple syrup for serving'
      ],
      instructions: [
        'Mash banana in bowl',
        'Mix with flour, milk, and egg',
        'Cook on griddle until bubbles form',
        'Flip and cook other side',
        'Serve with maple syrup'
      ]
    }
  }
];

export default function RecipeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = RECIPES.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Animated.View 
        entering={FadeInDown.delay(200).duration(1000)}
        style={styles.header}
      >
        <Text style={styles.title}>Recipe Generator</Text>
        <Text style={styles.subtitle}>Discover delicious meals</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </Animated.View>

      {/* Recipe Cards */}
      <View style={styles.recipesContainer}>
        {filteredRecipes.map((recipe, index) => (
          <Animated.View 
            key={recipe.id}
            entering={FadeInDown.delay(300 + index * 100).duration(1000)}
            style={styles.recipeCard}
          >
            <TouchableOpacity onPress={() => setSelectedRecipe(recipe)}>
              <View style={styles.imageContainer}>
                <Image 
                  source={recipe.image}
                  style={styles.recipeImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeName}>{recipe.name}</Text>
                <View style={styles.ingredientsContainer}>
                  <Text style={styles.ingredientsText}>
                    Main ingredients: {recipe.mainIngredients.join(', ')}
                  </Text>
                </View>
                <View style={styles.recipeMetaContainer}>
                  <View style={styles.recipeMeta}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.metaText}>{recipe.time}</Text>
                  </View>
                  <View style={styles.recipeMeta}>
                    <Ionicons name="star-outline" size={16} color="#666" />
                    <Text style={styles.metaText}>{recipe.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Recipe Detail Modal */}
      <Modal
        visible={selectedRecipe !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedRecipe(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setSelectedRecipe(null)}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
            
            {selectedRecipe && (
              <ScrollView>
                <Image 
                  source={selectedRecipe.image}
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                <Text style={styles.modalTitle}>{selectedRecipe.name}</Text>
                
                <View style={styles.modalMetaContainer}>
                  <View style={styles.modalMeta}>
                    <Ionicons name="time-outline" size={18} color="#666" />
                    <Text style={styles.modalMetaText}>{selectedRecipe.time}</Text>
                  </View>
                  <View style={styles.modalMeta}>
                    <Ionicons name="star-outline" size={18} color="#666" />
                    <Text style={styles.modalMetaText}>{selectedRecipe.rating}</Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Ingredients:</Text>
                  {selectedRecipe.fullRecipe.ingredients.map((ingredient, index) => (
                    <Text key={index} style={styles.modalText}>• {ingredient}</Text>
                  ))}
                </View>
                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Instructions:</Text>
                  {selectedRecipe.fullRecipe.instructions.map((instruction, index) => (
                    <Text key={index} style={styles.modalText}>
                      {index + 1}. {instruction}
                    </Text>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

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
    backgroundColor: '#FADA7A',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FADA7A',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F0A04B',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#F0A04B',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 20,
    paddingHorizontal: 15,
    height: 45,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
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
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
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
  ingredientsContainer: {
    marginVertical: 8,
  },
  ingredientsText: {
    color: '#666',
    fontSize: 14,
  },
  recipeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    marginTop: -10,
    marginRight: -10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  modalMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  modalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalMetaText: {
    marginLeft: 6,
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  modalSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    lineHeight: 24,
  },
  generateButton: {
    backgroundColor: '#FCE7C8',
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
    color: '#F0A04B',
    fontSize: 18,
    fontWeight: '600',
  },
});