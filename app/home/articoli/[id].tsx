import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import axios from "axios";
import DetailsListCard from "../../../components/DetailsListCard";

interface DetailData {
  Immagine?: string;
  Titolo?: string;
  Descrizione?: string;
  Righe?: Array<RowItem>;
  ID?: number;
}

interface RowItem {
  Titolo: string;
  [key: string]: any; // Add specific fields if known
}

const DetailsPage: React.FC = () => {
  const params = useGlobalSearchParams();
  const id = params?.id as string; // Type the parameter as string

  const [data, setData] = useState<DetailData>({});
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const res = await axios.get<DetailData>(`https://www.nswr.it/API/data/${id}.tsxon`);
      setData(res.data);

      // Analytics request (not awaited)
      axios.get(
        `https://www.nswr.it/offerte/API/articolo?ID=${id}&token=${global.user_token}`
      );

      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const renderItems = ({ item }: { item: RowItem }) => {
    const app = { ...item, IDArticolo: id };
    return <DetailsListCard data={app} />;
  };

  if (refreshing) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#45d49c" />
      </View>
    );
  }

  const { Immagine, Titolo, Descrizione, Righe } = data;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
      }
      className="flex-1 bg-white"
    >
      <View className="relative">
        {Immagine && (
          <Image
            source={{ uri: Immagine }}
            className="w-full h-[250px]"
            onLoadStart={() => setImageLoaded(false)}
            onLoadEnd={() => setImageLoaded(true)}
          />
        )}

        {!imageLoaded && (
          <View className="absolute top-5 left-1/2">
            <ActivityIndicator size="large" color="#45d49c" />
          </View>
        )}

        <View className="p-2">
          <Text className="text-zinc-700 font-bold text-lg">{Titolo}</Text>
          <Text className="text-zinc-600 py-2 text-justify">{Descrizione}</Text>
        </View>
      </View>

      {/* =========== List ========= */}
      <View>
        <FlatList
          data={Righe}
          scrollEnabled={false}
          renderItem={renderItems}
          keyExtractor={(item) => item.Titolo}
        />
      </View>
    </ScrollView>
  );
};

export default DetailsPage;
