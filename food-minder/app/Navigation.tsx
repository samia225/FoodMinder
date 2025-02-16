import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "./contexts/auth";
import LoginScreen from "./auth/LoginScreen";
import SignUpScreen from "./auth/SignUpScreen";
import TabNavigator from "./(tabs)";

const Stack = createStackNavigator();

const Navigation = () => {
  const { user } = useAuth();
  console.log('Current user state:', user); // For debugging

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="(tabs)" component={TabNavigator} />
      ) : (
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen}
            options={{ headerShown: true }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Navigation;