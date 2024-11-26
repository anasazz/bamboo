import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";

// Define component type for TypeScript
const LiveScreen: React.FC = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: "#45d49c",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: true,
          headerTitle: "LIVE",

          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 5 }}
              onPress={() => router.push("/home/feed/about")}
            >
              <AntDesign name="exclamationcircleo" size={20} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 5 }}
              onPress={() => router.push("/home/feed/search")}
            >
              <FontAwesome name="search" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="about"
        options={{
          headerStyle: {
            backgroundColor: "#45d49c",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: true,
          headerTitle: "Torna alla lista",
        }}
      />

      <Stack.Screen
        name="search"
        options={{
          headerStyle: {
            backgroundColor: "#45d49c",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: true,
          headerTitle: "Cerca offerte",
        }}
      />
    </Stack>
  );
};

export default LiveScreen;
