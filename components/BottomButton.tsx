import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";

// Define a type for the props
interface BottomButtonProps {
  onScroll: () => void; // The onScroll function prop
}

const BottomButton: React.FC<BottomButtonProps> = ({ onScroll }) => {
  return (
    <Animatable.View 
      delay={200} 
      animation="fadeInDown" 
      className="absolute top-2 w-full z-50"
    >
      <TouchableOpacity
        className="h-[30px] w-[120px] mx-auto bg-[#fbb01a] rounded-full flex flex-row items-center justify-between px-3"
        onPress={onScroll}
      >
        <FontAwesome name="arrow-up" size={14} color="white" />
        <Text className="text-white">AGGIORNA</Text>    
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default BottomButton;
