import React from "react";
import { View, Text, Image, TouchableOpacity, Linking, Share, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard';
import CachedImage from "./CachedImage";
import axios from "axios";

interface DetailsListCardProps {
  data: {
    IDArticolo: string;
    DataCreazione: number;
    Immagine: string;
    Category: string;
    Titolo: string;
    Manufacturer: string;
    CurrentPrice: string;
    PreviousPrice: string;
    Sconto: number;
    Coupon: string;
    Amazon_Affiliate: string;
    ASIN: string;
  };
}

const DetailsListCard: React.FC<DetailsListCardProps> = ({ data }) => {
  const {
    IDArticolo,
    DataCreazione,
    Immagine,
    Category,
    Titolo,
    Manufacturer,
    CurrentPrice,
    PreviousPrice,
    Sconto,
    Coupon,
    Amazon_Affiliate,
    ASIN,
  } = data;

  const pValue = parseFloat(PreviousPrice).toFixed(2);
  const cValue = parseFloat(CurrentPrice).toFixed(2);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `Questa offerta su Amazon ti può interessare! L'ho trovata grazie a Bamboo https://nswr.it/share/bab8b8b8b8`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
        const analytics = axios.get(
          `https://www.nswr.it/offerte/API/share?IDArticolo=${IDArticolo}&Link=${Amazon_Affiliate}&token=${global.user_token}`
        );
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const onPressItem = async () => {
    // ANALYTICS
    if (Coupon !== undefined && Coupon !== "") {
      await Clipboard.setStringAsync(Coupon);
      Alert.alert(
        "Il coupon è stato copiato",
        "\nCODICE: " +
          Coupon +
          "\n\n1. Aggiungi l'articolo al carrello (anche se il prezzo che vedi è maggiore).\n\n2. Premi il pulsante per procedere all'ordine (non preoccuparti, non stai ancora comprando l'articolo!).\n\n3. Nella pagina di conferma, troverai lo spazio per aggiungere il codice promozionale, e vedrai il prezzo scontato!",
        [
          {
            text: "Annulla",
            onPress: () => console.log("Cancel Pressed"),
            style: "negative",
          },
          {
            text: "Apri AMAZON",
            onPress: () => {
              Linking.openURL(Amazon_Affiliate).catch((err) =>
                console.error("Couldn't load page", err)
              );
            },
            style: "positive",
          },
        ],
        { cancelable: false }
      );
    } else {
      if (Amazon_Affiliate !== "") {
        Linking.openURL(Amazon_Affiliate).catch((err) =>
          console.error("Couldn't load page", err)
        );
      }
    }
    const analytics = axios.get(
      `https://www.nswr.it/offerte/API/click?IDArticolo=${IDArticolo}&Link=${Amazon_Affiliate}&token=${global.user_token}`
    );
  };

  let classeSconto = " bg-[#4f9ef1] ";
  if (Sconto > 30) {
    if (Sconto > 60) {
      classeSconto = " bg-[#f14f4f] ";
    } else {
      classeSconto = " bg-[#45d49c] ";
    }
  }

  let _DataCreazione = new Date(DataCreazione * 1000);
  // se oggi, mostro l'ora
  if (_DataCreazione >= new Date(new Date().setHours(0, 0, 0, 0))) {
    _DataCreazione = _DataCreazione.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    _DataCreazione = _DataCreazione.toLocaleDateString();
  }

  return (
    <View className="flex-row p-3 border-b-2 border-zinc-100">
      <View className="image and share">
        <Image
          source={{ uri: Immagine }}
          className="w-[120px] h-[120px]"
        />
        <TouchableOpacity onPress={() => onShare()}>
          <View className="flex-row gap-1 items-center mt-1">
            <FontAwesome name="share" size={15} color="#e4e4e7" />
            <Text className="uppercase text-zinc-200">CONDIVIDI</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => onPressItem()} className="texts flex-1 pl-2">
        <View className="border-b-2 border-zinc-100 pb-1 w-full flex-row justify-between">
          <Text className="font-semibold text-[10px] uppercase tracking-tighter">
            {Category}
          </Text>
          <Text className="text-[10px] text-[#999]">{_DataCreazione}</Text>
        </View>
        <Text className="text-lg leading-1 font-bold text-indigo-700">
          {Manufacturer}
        </Text>
        <Text className="text-xs tracking-tight leading-3 text-zinc-500">{Titolo}</Text>
        <View className="flex-row justify-between mt-0">
          <View className="flex-col justify-center items-center mx-auto">
            {Sconto !== 0 && (
              <View className={"rounded-full px-3 py-2 mb-1 " + classeSconto}>
                <Text className=" text-white font-bold text-md">
                  -{parseFloat(Sconto)}%
                </Text>
              </View>
            )}
            {Coupon !== "" && (
              <View className="rounded-full border-2 border-dotted border-[#45d49c] py-1 px-2">
                <Text className=" text-[#45d49c] font-bold text-xs uppercase">
                  sconto con coupon
                </Text>
              </View>
            )}
          </View>
          <View className="pr-3">
            <Text className="text-lg text-right font-bold text-zinc-600">{cValue}€ </Text>
            <Text
              className={`${
                pValue === "0.00" && "hidden"
              } line-through text-right text-zinc-400 font-bold`}
            >
              {pValue} €
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DetailsListCard;
