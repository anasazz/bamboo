import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Slide {
  key: number;
  title: string;
  text: string;
  image: any;
  backgroundColor: string;
}

const slides: Slide[] = [
  {
    key: 1,
    title: "Risparmia sui tuoi acquisti",
    text: "Usa Bamboo e scopri le offerte e gli sconti su Amazon prima di tutti \n\n Utilizza i nostri codici sconto e risparmia fino al 90%",
    image: require("../assets/1.png"),
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    title: "Facile, semplice, Bamboo",
    text: "Utilizzare Bamboo è semplicissimo \n\n Scorri tra le sezioni, clicca le offerte che ti interessano Verrai reindirizzato su Amazon e potrai procedere coi tuoi acquisti",
    image: require("../assets/2.png"),
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    title: "Ogni giorno è un affare",
    text: "Pubblichiamo nuovi articoli e offerte ogni giorno Attiva le notifiche e non fartele scappare! \n\n Che aspetti? \nSei pronto a cominciare??",
    image: require("../assets/3.png"),
    backgroundColor: "#22bcb5",
  },
];

const Welcome = () => {
  const [showRealApp, setShowRealApp] = useState(false);
  const router = useRouter();

  const renderItem = ({ item }: { item: Slide }) => {
    return (
      <SafeAreaView className="flex-1 justify-evenly items-center py-5 px-10">
        <Text className="text-[#45d49c] font-bold text-xl">{item.title}</Text>
        <Image className="w-[250px] h-[250px]" source={item.image} />
        <Text className="text-zinc-400 text-lg text-center">{item.text}</Text>
      </SafeAreaView>
    );
  };

  const onDone = () => {
    setShowRealApp(true);
    storeData();
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("hasSeenIntro", "true");
    } catch (error) {
      console.error("Error storing data", error);
    }
  };

  const DoneButton = () => (
    <View className="bg-[#45d49c] rounded-full p-3 mr-1">
      <AntDesign name="check" size={24} color="white" />
    </View>
  );

  const NextButton = () => (
    <View className="bg-[#45d49c] rounded-full p-3 mr-1">
      <AntDesign name="arrowright" size={24} color="white" />
    </View>
  );

  return (
    <AppIntroSlider
      activeDotStyle={{ backgroundColor: "#45d49c" }}
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      renderDoneButton={DoneButton}
      renderNextButton={NextButton}
    />
  );
};

export default Welcome;
