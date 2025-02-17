import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList, StyleSheet, TextInput, TouchableOpacity, Modal, Button, Animated, SafeAreaView} from "react-native";
//import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import FoodItemDetail from "../../components/FoodItemDetail"; // Import the new component

// Define food item type
type FoodItem = {
  id: string;
  emoji: string;
  name: string;
  price: number;
  expiryDate: string;
  visible?: boolean; // Optional field for visibility
};

// Sample data with visible field
const initialData: FoodItem[] = [
  { id: "1", emoji: "🍎", name: "Apple", expiryDate: "2025-02-18", price: 1.2, visible: true },
  { id: "2", emoji: "🥦", name: "Broccoli", expiryDate: "2025-02-18", price: 2.5, visible: true },
  { id: "3", emoji: "🥛", name: "Milk", expiryDate: "2025-02-19", price: 1.8, visible: true },
  { id: "4", emoji: "🍞", name: "Bread", expiryDate: "2025-02-18", price: 2.0, visible: true },
  { id: "5", emoji: "🍗", name: "Chicken", expiryDate: "2025-02-20", price: 5.0, visible: true },
  { id: "6", emoji: "🍌", name: "Banana", expiryDate: "2025-02-18", price: 1.1, visible: true },
  { id: "7", emoji: "🥕", name: "Carrot", expiryDate: "2025-02-21", price: 1.3, visible: true },
  { id: "8", emoji: "🍇", name: "Grapes", expiryDate: "2025-02-22", price: 3.0, visible: true },
  { id: "9", emoji: "🥚", name: "Eggs", expiryDate: "2025-02-25", price: 2.5, visible: true },
  { id: "10", emoji: "🍊", name: "Orange", expiryDate: "2025-02-19", price: 1.4, visible: true },
  { id: "11", emoji: "🥩", name: "Beef", expiryDate: "2025-02-20", price: 6.0, visible: true },
  { id: "12", emoji: "🧀", name: "Cheese", expiryDate: "2025-02-28", price: 4.5, visible: true },
  { id: "13", emoji: "🍉", name: "Watermelon", expiryDate: "2025-02-26", price: 5.5, visible: true },
];

// Card Component
const Card: React.FC<{ emoji: string; name: string; expiryDate: string; onPress: () => void }> = ({
  emoji,
  name,
  expiryDate,
  onPress,
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.emoji}>{emoji}</Text>
    <Text style={styles.foodName} numberOfLines={1}>{name}</Text>
    <Text style={styles.expiryDate}>Expires: {expiryDate}</Text>
  </TouchableOpacity>
);

// Main Card Screen
const CardScreen: React.FC = () => {

    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
    const [data, setData] = useState<FoodItem[]>(initialData);
    
    const [checkmarkVisible, setCheckmarkVisible] = useState(false); // State to control checkmark visibility
    const [checkmarkAnim] = useState(new Animated.Value(0)); // Animated value for the checkmark
  
    const getDaysLeft = (expiryDate: string) => {
      const today = new Date();
      const expiry = new Date(expiryDate);
      const difference = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return difference;
    };
  
    const sortedData = [...data]
      .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => getDaysLeft(a.expiryDate) - getDaysLeft(b.expiryDate));
  
    const items1Day = sortedData.filter((item) => getDaysLeft(item.expiryDate) === 1 && item.visible);
    const items2Days = sortedData.filter((item) => getDaysLeft(item.expiryDate) === 2 && item.visible);
    const items3OrMore = sortedData.filter((item) => getDaysLeft(item.expiryDate) >= 3 && item.visible);
  
    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === "granted");
        })();
      }, []);
    
      const openCamera = async () => {
        if (hasPermission === null) {
          return;
        }
        if (hasPermission === false) {
          alert("No access to camera");
          return;
        }
        
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: 'images',
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
          console.log(result.assets[0].uri);
        }
      };
    
      const openGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
          console.log(result.assets[0].uri);
        }
      };
    
  
    const handleCardPress = (food: FoodItem) => {
      setSelectedFood(food);
    };
  
    const handleCloseModal = () => {
      setSelectedFood(null);
    };

    const handleFinishModal = () => {
        setSelectedFood(null);
        animateCheckmark(); // Trigger the checkmark animation when closing the modal
      };

    const handleSaveFoodItem = (updatedFood: FoodItem) => {
        setData((prevData) =>
          prevData.map((item) => (item.id === updatedFood.id ? updatedFood : item))
        );
        setSelectedFood(null);
      };
      
  
    const animateCheckmark = () => {
      setCheckmarkVisible(true);
      Animated.timing(checkmarkAnim, {
        toValue: 1, // Fade in
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // After animation completes, reset checkmark visibility
        setTimeout(() => {
          setCheckmarkVisible(false);
          checkmarkAnim.setValue(0); // Reset the animation value
        }, 1000); // Keep the checkmark visible for 1 second
      });
    };
  
    const handleConsumed = () => {
      if (selectedFood) {
        const updatedData = data.map((item) =>
          item.id === selectedFood.id ? { ...item, visible: false } : item
        );
        setData(updatedData);
        console.log("Food item consumed");
      }
      handleFinishModal();
    };
  
    const handleDisposed = () => {
      if (selectedFood) {
        const updatedData = data.map((item) =>
          item.id === selectedFood.id ? { ...item, visible: false } : item
        );
        setData(updatedData);
        console.log("Food item disposed");
      }
      handleFinishModal();
    };
  
    return (
<SafeAreaView style={styles.safeContainer}>
    <View style={styles.container}>

        <View style={styles.searchContainer}>
            {/* Search Icon */}
            <Text style={styles.searchText}>🔎</Text>

            <TextInput
                style={styles.searchBar}
                placeholder="Search in your storage..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
            />
        </View>
        <ScrollView contentContainerStyle={{ padding: 5 }}>
          {items1Day.length > 0 && <Text style={styles.sectionHeader}>1 Day Left</Text>}
          <FlatList
            data={items1Day}
            keyExtractor={(item) => item.id}
            numColumns={3}
            renderItem={({ item }) => (
              <Card emoji={item.emoji} name={item.name} expiryDate={item.expiryDate} onPress={() => handleCardPress(item)} />
            )}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={false}
          />
  
          {items2Days.length > 0 && <Text style={styles.sectionHeader}>2 Days Left</Text>}
          <FlatList
            data={items2Days}
            keyExtractor={(item) => item.id}
            numColumns={3}
            renderItem={({ item }) => (
              <Card emoji={item.emoji} name={item.name} expiryDate={item.expiryDate} onPress={() => handleCardPress(item)} />
            )}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={false}
          />
  
          {items3OrMore.length > 0 && <Text style={styles.sectionHeader}>3+ Days Left</Text>}
          <FlatList
            data={items3OrMore}
            keyExtractor={(item) => item.id}
            numColumns={3}
            renderItem={({ item }) => (
              <Card emoji={item.emoji} name={item.name} expiryDate={item.expiryDate} onPress={() => handleCardPress(item)} />
            )}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={false}
          />
        </ScrollView>
  
        <TouchableOpacity style={styles.floatingButton} onPress={openCamera}>
          <Text style={styles.floatingButtonText}>⌞ ⌝</Text>
        </TouchableOpacity>
  
        {selectedFood && (
          <Modal visible={true} transparent={true} animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                {selectedFood && (
                  <FoodItemDetail
                    foodItem={selectedFood}
                    onClose={handleCloseModal}
                    onConsumed={handleConsumed}
                    onDisposed={handleDisposed}
                    onSave={handleSaveFoodItem} 
                  />
                )}
              </View>
            </View>
          </Modal>
        )}
  
        {/* Checkmark Animation */}
        {checkmarkVisible && (
          <Animated.View
            style={[
              styles.checkmarkContainer,
              {
                opacity: checkmarkAnim,
                transform: [{ scale: checkmarkAnim }],
              },
            ]}
          >
            <Text style={styles.checkmark}> ✔️</Text>
            <Text >Finished</Text> 
          </Animated.View>
        )}
      </View>
      </SafeAreaView>
    );
  };
  

export default CardScreen;

// Styles
const styles = StyleSheet.create({
safeContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FCE7C8",
  },
  searchContainer: {
    flexDirection: 'row',        // Aligns items horizontally
    alignItems: 'center',        // Centers the items vertically within the row
    justifyContent: 'center',     // Optional: Centers the whole container
  },
  searchText:{
    position:"relative",
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 30,
  },
  searchBar: {
    height: 40,
    borderColor: "#F0A04B",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    width:"80%"
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
    paddingBottom: 40,
  },
  card: {
    width: "30%", 
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
    fontSize: 13,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
  expiryDate: {
    fontSize: 12,
    color: "red",
    marginTop: 5,
    width: "100%",
    textAlign: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 60,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#B1C29E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 28,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    maxWidth: "90%",
    alignItems: "center",
    position: "relative",
    // Remove fixed height to allow modal to expand
    height: 'auto',
  },
  checkmarkContainer: {
    position: "absolute",
    top: "5%",
    left: "45%",
    zIndex: 999,
  },
  checkmark: {
    fontSize: 40,
    color: "green",
  }
});
