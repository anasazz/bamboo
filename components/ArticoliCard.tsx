import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import React from "react";
import * as Animatable from "react-native-animatable";

// Define a type for the data prop
interface ArticoliCardProps {
  data: {
    Immagine: string;
    Titolo: string;
    Anteprima: string;
    Data: string;
    ID: number;
  };
  index: number;
}

const ArticoliCard: React.FC<ArticoliCardProps> = ({ data, index }) => {
  const { Immagine, Titolo, Anteprima, Data, ID } = data;
  const router = useRouter();

  return (
    <Animatable.View delay={index * 100} animation="fadeInUp" className="bg-zinc-50 mt-1">
      <TouchableOpacity onPress={() => router.push(`/home/articoli/${ID}`)} className="mx-2 relative my-1 p-1 flex-row  bg-white shadow-sm">
        <View>
          {/* Uncomment if you want to use the CachedImage component */}
          {/* <CachedImage source={{ uri: Immagine }} cacheKey={`art${ID}`} className="h-[100px] w-[100px] p-3" /> */}
          <Image source={{ uri: Immagine }} className="h-[100px] w-[100px] p-3" />
        </View>
        <View style={{ width: "100%", flexGrow: 1, flex: 1 }} className="texts pl-1 flex-col justify-between">
          <Text className="text-green-700 font-bold">{Titolo}</Text>
          <Text className="text-zinc-500 text-xs">{Anteprima}</Text>
          <Text className="text-zinc-700 text-right text-xs font-bold">{Data}</Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default ArticoliCard;
