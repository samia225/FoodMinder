import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "./contexts/auth";
import LoginScreen from "./auth/LoginScreen";
import SignUpScreen from "./auth/SignUpScreen";
import TabLayout from "./(tabs)/_layout";

const Stack = createStackNavigator();

const Navigation = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        presentation: 'card'
      }}
    >
      {user ? (
        <Stack.Screen 
          name="(tabs)" 
          component={TabLayout}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            headerStyle: { display: 'none' },
          }}
        />
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