import { View, TouchableOpacity } from "react-native";
import {
  MaterialIcons,
  AntDesign,
  FontAwesome,
  Foundation,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Welcome from "../../components/Welcome";
import * as Animatable from "react-native-animatable";
import { Tabs, useRouter } from "expo-router";

const App: React.FC = () => {
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
      const interval = setInterval(() => {
        setShowAnimation(false);
        setTimeout(() => {
          setShowAnimation(true);
        }, 20000); // Animation duration
      }, 7000); // Animation frequency
      return () => clearInterval(interval);
    }, 20000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Tabs
      screenListeners={{
        tabPress: (e) => {
          console.log(e);
        },
      }}
    >
      <Tabs.Screen
        name="articoli"
        options={{
          headerStyle: {
            backgroundColor: "#45d49c",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "Articoli",
          tabBarLabel: "Articoli",
          headerShown: false,
          tabBarActiveTintColor: "#45d49c",
          tabBarIcon: ({ focused }) => (
            <View>
              <Foundation
                name="book-bookmark"
                size={30}
                color={focused ? "#45d49c" : "#999"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: "#45d49c",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: false,
          headerTitle: "Bamboo",
          tabBarLabel: "Offerte LIVE",
          tabBarActiveTintColor: "#45d49c",
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <Animatable.View
                  duration={1000}
                  iterationCount="infinite"
                  disabled
                  animation="bounce"
                  easing="ease-out"
                  style={{ textAlign: "center" }}
                >
                  <MaterialIcons
                    name="access-alarm"
                    size={30}
                    style={{ marginBottom: -3 }}
                    color={"#45d49c"}
                  />
                </Animatable.View>
              );
            }
            if (showAnimation && false) {
              return (
                <Animatable.View
                  iterationCount="infinite"
                  animation="bounce"
                  easing="ease-out"
                  style={{ textAlign: "center" }}
                >
                  <MaterialIcons
                    name="access-alarm"
                    size={30}
                    style={{ marginBottom: -3 }}
                    color={"#999"}
                  />
                </Animatable.View>
              );
            } else {
              return (
                <Animatable.View
                  duration={1000}
                  iterationCount="infinite"
                  disabled
                  animation="bounce"
                  easing="ease-out"
                  style={{ textAlign: "center" }}
                >
                  <MaterialIcons
                    name="access-alarm"
                    size={30}
                    style={{ marginBottom: -3 }}
                    color={"#999"}
                  />
                </Animatable.View>
              );
            }
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 20 }}
              onPress={() => router.push("/home/feed/about")}
            >
              <AntDesign name="exclamationcircleo" size={20} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 20 }}
              onPress={() => router.push("/home/search")}
            >
              <FontAwesome name="search" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
};

export default App;
