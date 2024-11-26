import { useContext, useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  RefreshControl,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Linking,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import FissiCard from "../../../components/FissiCard";
import ArticoliCard from "../../../components/ArticoliCard";
import { useRouter } from "expo-router";
import ArticoliSkeleton from "../../../components/SkeletonView/ArticoliSkeleton";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as Animatable from "react-native-animatable";
import axios from "axios";

interface Articolo {
  ID: string;
  Titolo: string;
  [key: string]: any; // Add other fields as necessary
}

interface ArticoliData {
  Fissi: Articolo[];
  Articoli: Articolo[];
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return undefined;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
}

export default function Root() {
  const [articoliData, setArticoliData] = useState<ArticoliData>({
    Fissi: [],
    Articoli: [],
  });
  const [refresing, setRefreshing] = useState<boolean>(false);
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const router = useRouter();

  // Notification handler
  const handleNotification = (notification: Notifications.NotificationResponse) => {
    const data: any = notification.notification.request.content.data;

    if (typeof data.ID === "number" && data.ID % 1 === 0) {
      router.push(`/home/articoli/${data.ID}`);
    } else {
      try {
        Linking.openURL(data.Link).catch((err) =>
          console.error("Couldn't load page", err)
        );
      } catch (_) {
        console.error("Error processing notification link");
      }
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      
      setExpoPushToken(token);
      globalThis.user_token = token;
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      handleNotification
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const sendTokenToApi = async () => {
    try {
      const model = Platform.OS === "ios" ? Device.modelName : Device.modelName || "null";
      await axios.post("https://www.nswr.it/offerte/API/user/", {
        params: {
          token: expoPushToken,
          user: {
            deviceID: Device?.deviceID || "no-id",
            deviceName: Device.deviceName || "name",
            deviceModel: model,
          },
        },
      });
    } catch (error) {
      console.error("Failed to send token to API:", error);
    }
  };

  useEffect(() => {
    if (expoPushToken) {
      sendTokenToApi();
    }
  }, [expoPushToken]);

  const loadDataFromApi = async () => {
    try {
      setRefreshing(true);
      const result = await axios.get(
        `https://www.nswr.it/offerte/API/articoli2020?limit=50&offset=0&token=${expoPushToken}`
      );
      setArticoliData(result.data);
      setRefreshing(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDataFromApi();
  }, []);

  if (refresing) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={40} color="#45d49c" />
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refresing} onRefresh={loadDataFromApi} />
      }
      className="flex-1 bg-white"
    >
      <StatusBar barStyle="light-content" />
      <FlatList
        numColumns={5}
        data={articoliData.Fissi}
        renderItem={({ item, index }) => <FissiCard data={item} index={index} />}
        keyExtractor={(item) => item.ID}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      />

      <TouchableOpacity
        onPress={() => router.push("/home/feed")}
        className="bg-[#FF5151] px-5 py-5 flex-row items-center justify-center"
      >
        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          className="flex-row items-center"
        >
          <MaterialIcons name="alarm" size={20} color="#fff" />
          <Text className="font-bold text-white text-lg ml-1">
            Sfoglia tutte le offerte LIVE!
          </Text>
          <Text className="text-red-500 text-xl">NativeWind is working!</Text>

        </Animatable.View>
      </TouchableOpacity>

      <FlatList
        scrollEnabled={false}
        data={articoliData.Articoli}
        renderItem={({ item, index }) => <ArticoliCard data={item} index={index} />}
        keyExtractor={(item) => item.ID}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
}
