import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import * as Animatable from "react-native-animatable";

// Optionally, if you want to use CachedImage instead of the standard Image
import CachedImage from "./CachedImage";

interface FissiCardProps {
  data: {
    Immagine: string;
    ID: string;
  };
  index: number;
}

const FissiCard: React.FC<FissiCardProps> = ({ data, index }) => {
  const { Immagine, ID } = data;
  const router = useRouter();
  
  return (
    <Animatable.View
      delay={index * 100}
      animation="flipInX"
      className="m-0 w-full flex-1"
    >
      <TouchableOpacity
        onPress={() => router.push(`/home/articoli/${ID}`)}
        className="p-0 bg-white shadow-sm"
      >
        {/* Cached Image (uncomment if needed) */}
        {/* 
        <CachedImage
          source={{ uri: Immagine }}
          cacheKey={ID}
          className="h-20"
          width={Dimensions.get("window").width / 5}
        />
        */}

        {/* Standard Image (used in the current version) */}
        <Image
          source={{ uri: Immagine }}
          className="h-20"
          style={{
            width: Dimensions.get("window").width / 5,
          }}
        />
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default FissiCard;
