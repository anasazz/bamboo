import React, { useEffect, useState } from "react";
import {
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import axios from "axios";
import LivePageCard from "../../../components/LivePageCard";
import { Image } from "react-native";
import * as Animatable from "react-native-animatable";

type Item = {
  Manufacturer: string;
  // Add other properties of 'item' if needed, based on your API response.
};

const Search: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<Item[]>([]); // Array of items from API
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [input, setInput] = useState<string>(""); // Input for search
  const [got, setGot] = useState<number>(0); // Number of searches performed

  const onSearch = async () => {
    Keyboard.dismiss();
    try {
      setLoading(true);
      const result = await axios.get(
        `https://www.nswr.it/offerte/API/search?q=${input}`
      );
      setData(result.data);
      setGot(got + 1);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false); // Handle error state gracefully
    }
  };

  const renderItems = ({ item }: { item: Item }) => {
    return <LivePageCard data={item} />;
  };

  return (
    <View className="flex-1 bg-white " keyboardShouldPersistTaps="always">
      <View className="r border-2 border-[#eee] bg-[#eee] mx-auto flex-row p-3 w-[90%] my-3">
        <TextInput
          placeholder="Ricerca offerte recenti.."
          className="flex-1 text-zinc-700 font-semibold"
          maxLength={20}
          value={input}
          onChangeText={(text: string) => setInput(text)} // Typing onChangeText
          onSubmitEditing={() => onSearch()}
          returnKeyType="search"
          autoCapitalize="none"
          autoFocus
        />
        <TouchableOpacity onPress={() => onSearch()}>
          <FontAwesome name="search" size={24} color="#45d49c" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 bg-white mb-10">
        <FlatList
          refreshing={loading}
          onRefresh={() => onSearch()}
          data={input === "" ? data.slice(0, 10) : data}
          renderItem={renderItems}
          keyExtractor={(item, i) => i.toString()} // Ensure keyExtractor returns a string
        />
      </View>

      {data.length === 0 && got >= 1 && (
        <View className="bg-white flex-1 px-20 justify-center items-center">
          <Animatable.View
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
          >
            <Text className="text-zinc-400 py-5">
              Non è stata trovata nessuna offerta recente con la ricerca
              selezionata.
            </Text>
          </Animatable.View>
          <Image
            source={require("../../../assets/guida_02.jpg")}
            className="w-full mt-10 h-40 px-10"
          />
        </View>
      )}
    </View>
  );
};

export default Search;
