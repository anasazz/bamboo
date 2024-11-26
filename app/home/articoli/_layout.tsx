import { Tabs, useRouter, Stack } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Ionicons,
  AntDesign,
  FontAwesome,
  Foundation,
} from "@expo/vector-icons";

// Define the type for the `tabBarIcon` prop
interface TabBarIconProps {
  focused: boolean;
  color?: string;
  size?: number;
}

const App: React.FC = () => {
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
          headerTitle: "Articoli",
          headerShown: true,
  
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => router.navigate("/home/articoli/about")}
            >
              <AntDesign name="exclamationcircleo" size={20} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => router.navigate("/home/articoli/search")}
            >
              <FontAwesome name="search" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="[id]"
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

export default App;
