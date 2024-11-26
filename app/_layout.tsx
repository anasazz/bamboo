import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Welcome from "../components/Welcome";

const App: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);

  const retrieveData = async (): Promise<void> => {
    try {
      const value = await AsyncStorage.getItem("key");
      if (value !== null) {
        const val = Boolean(value); // Convert to boolean
        setLogin(val);
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  useEffect(() => {
    retrieveData();
    if (!login) {
      const interval = setInterval(() => {
        retrieveData();
      }, 50);
      return () => clearInterval(interval);
    }
  }, [login]); // Added `login` as a dependency

  if (!login) {
    return <Welcome />;
  }

  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
};

export default App;


// export default function AppLayout() {
//   const router = useRouter();
//   const [login, setLogin] = useState(false);

//   const retrieveData = async () => {
//     try {
//       const value = await AsyncStorage.getItem("key");
//       if (value !== null) {
//         const val = Boolean(value);
//         setLogin(val);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     // AsyncStorage.clear()
//     retrieveData();
//     if (!login) {
//       const interval = setInterval(() => {
//         retrieveData();
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, []);

//   if (!login) {
//     return <Welcome />;
//   }
//   return (

//       <Tabs>
//         <Tabs.Screen
//           // Name of the route to hide.
//           name="index"
//           options={{
//             // This tab will no longer show up in the tab bar.

//             // href: null,

//             headerStyle: {
//               backgroundColor: "#45d49c",
//             },
//             headerTintColor: "#fff",
//             headerTitleStyle: {
//               fontWeight: "bold",
//             },
//             headerTitle: "Articoli",
//             tabBarLabel: "Articoli",
//             headerShown: true,
//             // tabBarStyle: { display: logged ? "block" : "none" },
//             tabBarActiveTintColor: "#45d49c",
//             tabBarIcon: ({ focused }) => (
//               <View>
//                 <Foundation name="book-bookmark" size={30}
//                   color={focused ? "#45d49c" : "#999"} />
//               </View>
//             ),
//           }}
//         />

//         {/* ============== Offerte Live =========== */}

//         <Tabs.Screen
//           // Name of the route to hide.
//           name="feed"
//           options={{
//             // This tab will no longer show up in the tab bar.
//             //   href: null,

//             headerStyle: {
//               backgroundColor: "#45d49c",
//             },
//             headerTintColor: "#fff",
//             headerTitleStyle: {
//               fontWeight: "bold",
//             },
//             headerShown: true,
//             headerTitle: "Bamboo",
//             tabBarLabel: "Offerte LIVE",
//             tabBarActiveTintColor: "#45d49c",
//             tabBarIcon: ({ focused }) => (
//               <Animatable.View animation="bounce" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>
//                 <MaterialIcons
//                   name="access-alarm"
//                   size={30}
//                   style={{ marginBottom: -3 }}
//                   color={focused ? "#45d49c" : "#999"}
//                 />
//               </Animatable.View>
//             ),
//             headerLeft: () => (
//               <TouchableOpacity
//                 className="ml-5"
//                 onPress={() => router.push("/about")}
//               >
//                 <AntDesign name="exclamationcircleo" size={20} color="white" />
//               </TouchableOpacity>
//             ),
//             headerRight: () => (
//               <TouchableOpacity
//                 className="mr-5"
//                 onPress={() => router.push("/search")}
//               >
//                 <FontAwesome name="search" size={24} color="white" />
//               </TouchableOpacity>
//             ),
//           }}
//         />
//         {/* =================== Details =============== */}
//         <Tabs.Screen
//           // Name of the route to hide.
//           name="[id]"
//           options={{
//             // This tab will no longer show up in the tab bar.
//             href: null,
//             headerStyle: {
//               backgroundColor: "#45d49c",
//             },
//             headerTintColor: "#fff",
//             headerTitleStyle: {
//               fontWeight: "bold",
//             },
//             headerTitle: "Torna all lista",
//             headerLeft: () => (
//               <TouchableOpacity
//                 onPress={() => router.push("/")}
//                 className="ml-5"
//               >
//                 <Ionicons name="arrow-back" size={28} color="white" />
//               </TouchableOpacity>
//             ),
//           }}
//         />
//         {/* =================== About =============== */}
//         <Tabs.Screen
//           // Name of the route to hide.
//           name="about"
//           options={{
//             // This tab will no longer show up in the tab bar.
//             href: null,
//             headerStyle: {
//               backgroundColor: "#45d49c",
//             },
//             headerTintColor: "#fff",
//             headerTitleStyle: {
//               fontWeight: "bold",
//             },
//             headerTitle: "Torna alle offerte",
//             headerLeft: () => (
//               <TouchableOpacity
//                 onPress={() => router.push("/feed")}
//                 className="ml-5"
//               >
//                 <Ionicons name="arrow-back" size={28} color="white" />
//               </TouchableOpacity>
//             ),
//           }}
//         />

//         {/* ================ Search =================  */}

//         <Tabs.Screen
//           // Name of the route to hide.
//           name="search"
//           options={{
//             // This tab will no longer show up in the tab bar.
//             href: null,
//             headerStyle: {
//               backgroundColor: "#45d49c",
//             },
//             headerTintColor: "#fff",
//             headerTitleStyle: {
//               fontWeight: "bold",
//             },
//             headerTitle: "",
//             headerShown: false,
//             headerLeft: () => (
//               <TouchableOpacity
//                 onPress={() => router.push("/feed")}
//                 className="ml-5"
//               >
//                 <Ionicons name="arrow-back" size={28} color="white" />
//               </TouchableOpacity>
//             ),
//           }}
//         />

//         {/* <Tabs.Screen
//             // Name of the route to hide.
//             name="appintro"
//             options={{
//               // This tab will no longer show up in the tab bar.
//               href: null,
//               headerStyle: {
//                 backgroundColor: "#45d49c",
//               },
//               headerTintColor: "#fff",
//               headerTitleStyle: {
//                 fontWeight: "bold",
//               },
//               headerTitle: "",
//               headerShown: false,
//               headerLeft: () => (
//                 <TouchableOpacity
//                   onPress={() => router.push("/feed")}
//                   className="ml-5"
//                 >
//                   <Ionicons name="arrow-back" size={28} color="white" />
//                 </TouchableOpacity>
//               ),
//             }}
//           /> */}
//       </Tabs>

//   );
// }
