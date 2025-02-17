import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList, StyleSheet, TextInput, TouchableOpacity, Modal, Button, Animated, SafeAreaView} from "react-native";
//import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"; // Import for FileSystem to read file as Base64
import FoodItemDetail from "../../components/FoodItemDetail"; // Import the new component
import * as ImageManipulator from 'expo-image-manipulator';
import {Alert} from 'react-native';
import { ActivityIndicator } from "react-native"; // Import the ActivityIndicator


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
{ id: "13", emoji: "🍅", name: "Tomatoes", expiryDate: "2025-02-18", price: 2.2, visible: true },
  { id: "2", emoji: "🥦", name: "Broccoli", expiryDate: "2025-02-19", price: 2.5, visible: true },
  { id: "3", emoji: "🥛", name: "Milk", expiryDate: "2025-02-19", price: 1.8, visible: true },
  { id: "6", emoji: "🍌", name: "Banana", expiryDate: "2025-02-18", price: 1.1, visible: true },
  { id: "10", emoji: "🍊", name: "Orange", expiryDate: "2025-02-19", price: 1.4, visible: true },
  { id: "11", emoji: "🌾", name: "Flour", expiryDate: "2025-08-01", price: 3.0, visible: true },
  { id: "12", emoji: "🧀", name: "Cheese", expiryDate: "2025-03-10", price: 4.5, visible: true },
];

// Card Component
const Card: React.FC<{ 
    emoji: string; 
    name: string; 
    expiryDate: string; 
    onPress: () => void; 
    onLongPress: () => void;
    isSelected: boolean;
    multiSelectMode: boolean;
  }> = ({
    emoji,
    name,
    expiryDate,
    onPress,
    onLongPress,
    isSelected,
    multiSelectMode
  }) => (
    <TouchableOpacity 
      style={[styles.card, isSelected && styles.selectedCard]} 
      onPress={onPress} 
      onLongPress={onLongPress}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.foodName} numberOfLines={1}>{name}</Text>
      <Text style={styles.expiryDate}>Expires: {expiryDate}</Text>
      {isSelected && multiSelectMode && (
        <View style={styles.checkmarkOverlay}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

// Main Card Screen
const CardScreen: React.FC = () => {

    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
    const [data, setData] = useState<FoodItem[]>(initialData);

    const genimiAPIKey = "AIzaSyDENZrKT6lMsJid51Xh19GpSF3iQOrZjHU";

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [multiSelectMode, setMultiSelectMode] = useState(false);
    const [multiSelectOkay, setMultiSelectOkay] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);


    const [extractedText, setExtractedText] = useState('');
    const [loading, setLoading] = useState(false);
    
    const [checkmarkVisible, setCheckmarkVisible] = useState(false); // State to control checkmark visibility
    const [checkmarkAnim] = useState(new Animated.Value(0)); // Animated value for the checkmark
  
    const handleCardPress = (food: FoodItem) => {
        if (multiSelectMode) {
          // In multi-select mode, toggle item selection
          setSelectedItems(prev => 
            prev.includes(food.id) 
              ? prev.filter(id => id !== food.id)
              : [...prev, food.id]
          );
        } else {
          // Normal mode - show food detail modal
          setSelectedFood(food);
        }
      };
    
      const handleLongPress = (food: FoodItem) => {
        if (!multiSelectMode) {
          setMultiSelectMode(true);
          setSelectedItems([food.id]);
        }
      };
    
      const handleGenerateReceipt = () => {
        // Calculate total price of selected items
      };
    
      const renderFoodList = (items: FoodItem[]) => (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <Card 
              emoji={item.emoji} 
              name={item.name} 
              expiryDate={item.expiryDate} 
              onPress={() => handleCardPress(item)}
              onLongPress={() => handleLongPress(item)}
              isSelected={selectedItems.includes(item.id)}
              multiSelectMode={multiSelectMode}
            />
          )}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
        />
      );
    

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
          const compressed_uri = await compressImageToSize(result.assets[0].uri);
          if (compressed_uri){
            processImage(compressed_uri);
          }
          console.log("problem compressing the image");
        }
      };

      const processImage = async (uri: string) => {
        setLoading(true);
        const base64Image = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const base64 = "data:image/jpg;base64,"+base64Image;
          console.log(base64.slice(0, 100));
          let formData = new FormData();
          formData.append('base64Image', base64); // Use base64 encoded image string
          formData.append('apikey', 'K84984960388957');
    
        try {
          let response = await fetch('https://api.ocr.space/parse/image', {
            method: 'POST',
            body: formData,
          });
          let result = await response.json();
            console.log(result);
          console.log(result.ParsedResults[0].ParsedText);
          setExtractedText(result.ParsedResults[0].ParsedText);
          console.log(result.ParsedResults[0].ParsedText);
          await callGeminiAPI(result.ParsedResults[0].ParsedText);

        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      };

      const callGeminiAPI = async (text: string) => {
        try{
        // Construct the API request body based on the format you shared
        const { GoogleGenerativeAI } = require("@google/generative-ai");

        const genAI = new GoogleGenerativeAI(genimiAPIKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log(text);
        
        const prompt = 'here is receipt text: "' + text + '", please only return a list of dicionary in this format ["id": an number starting from 15(cannot be the same across all the items, "emoji": find a item emoji that is similar to the item(emoji needs to be enclosed in double quote) (it cannot be a word, if cannot find a emoji, put 🥣 as default emoji),"name": item_name, "expiryDate": estimated_expiry_date based on the item using general knowledge in the format of yyyy-mm-dd from 2025-02-16, "price": price_from the extracted text, "visible": true}';
        
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        text = result.response.text();
        if (text){
            const match = text.match(/```json([\s\S]*?)```/);
            if (match && match[1]) {
                const jsonData = match[1];
                const data = JSON.parse(jsonData);
                console.log(data);
                setData((prevData) => [...prevData, ...data]);
                console.log(data);
            }
        }
        }
      
        catch (error) {
          console.error("Error calling Gemini API:", error);
        }
      };

      const compressImageToSize = async (uri: string) => {
        try {
          console.log("Resizing image with URI:", uri);
          const result = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 800, height: 600 } }],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
          );
          console.log(result);
          let fileSize = await getFileSize(result.uri);
      
          // Check if the image is under 1024 KB
          while (fileSize > 1024 * 1024) {  // 1024 KB is 1 MB
            const quality = Math.max(10, Math.floor(80 * (1024 * 1024 / fileSize))); // Reduce quality dynamically
            const newResult = await ImageManipulator.manipulateAsync(
              result.uri,
              [{ resize: { width: 800, height: 600 } }],
              { compress: quality / 100, format: ImageManipulator.SaveFormat.JPEG }
            );
            result.uri = newResult.uri;
            fileSize = await getFileSize(result.uri);
          }
      
          console.log('Compressed Image URI:', result.uri);
          return result.uri;
        } catch (err) {
          console.error('Error while resizing image:', err);
          Alert.alert('Error', 'Failed to compress image');
        }
      };
      
      // Function to get the file size of an image
      const getFileSize = async (uri: string) => {
        try {
          const stats = await FileSystem.getInfoAsync(uri, { size: true });
          if (stats.exists && !stats.isDirectory) {
            return stats.size || 0; // Return size if it exists
          } else {
            console.error('File does not exist or is a directory');
            return 0;
          }
        } catch (err) {
          console.error('Error getting file size:', err);
          return 0;
        }
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
          {renderFoodList(items1Day)}

          {items2Days.length > 0 && <Text style={styles.sectionHeader}>2 Days Left</Text>}
          {renderFoodList(items2Days)}

          {items3OrMore.length > 0 && <Text style={styles.sectionHeader}>3+ Days Left</Text>}
          {renderFoodList(items3OrMore)}
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
        {/* Loading Modal */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      )}

{multiSelectMode && (
          <View style={styles.multiSelectHeader}>
            <Text style={styles.selectedCount}>{selectedItems.length} items selected</Text>
            <TouchableOpacity 
              style={styles.okayButton} 
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.okayButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

              {/* Receipt Generation Modal */}
    <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalGenerateContainer}>
            <View style={styles.modalGenerateContent}>
              <Text style={styles.modalTitle}>Generate recipe</Text>
              <Text style={styles.modalText}>Generate recipe for {selectedItems.length} selected food?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.confirmButton]} 
                  onPress={handleGenerateReceipt}
                >
                  <Text style={styles.modalButtonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]} 
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  };
  

export default CardScreen;

// Styles
const styles = StyleSheet.create({
safeContainer: {
    flex: 1,
    backgroundColor: "#FADA7A",
    },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FADA7A",
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
  },
  loadingContainer: {
    position: 'absolute', // Ensures the loading screen overlays the entire screen
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Add a semi-transparent background
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  checkmarkOverlay: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  multiSelectHeader: {
    position: 'absolute', // Fixed positioning
    top: 0, // Sticks it to the top
    left: 0, // Ensures it sticks from the left edge
    right: 0, // Ensures it spans the full width of the screen
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    zIndex: 10, // Make sure it's on top of other elements
  },
  selectedCount: {
    fontSize: 16,
    color: '#495057',
  },
  okayButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  okayButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalGenerateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalGenerateContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    marginLeft: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
