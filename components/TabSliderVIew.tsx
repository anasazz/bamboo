import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import LivePageCard from "./LivePageCard";
import BottomButton from "./BottomButton";
import axios from "axios";

interface TabSliderViewProps {
  filtro: string;
}

const TabSliderView: React.FC<TabSliderViewProps> = ({ filtro }) => {
  const ref = useRef<FlatList | null>(null);

  const [tuttoData, setTuttoData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [offset, setOffset] = useState(0);

  const loadDataFromApi = async () => {
    try {
      setRefreshing(true);
      setOffset(0); // Reset offset when loading new data
      const result = await axios.get(
        `https://www.nswr.it/offerte/API/data?filtro=${filtro}&limit=30&offset=0`
      );
      setTuttoData(result.data);
      setRefreshing(false);
      setLoading(false);
      // After data is loaded, schedule the update to show the bottom button
      setTimeout(() => setUpdate(true), 1000 * 60 * 2); // 2 minutes
    } catch (error) {
      console.error(error);
      setRefreshing(false);
      setLoading(false);
      setTimeout(() => setUpdate(true), 1000 * 60 * 2); // 2 minutes
    }
  };

  const handleLoadMore = async () => {
    if (loading) return; // Prevent multiple load attempts
    setLoading(true);
    try {
      const lastItem = tuttoData[tuttoData.length - 1];
      const lastItemId = lastItem ? lastItem.ID : 0;
      const result = await axios.get(
        `https://www.nswr.it/offerte/API/data?filtro=${filtro}&limit=30&offset=${offset}&last_id=${lastItemId}`
      );
      setTuttoData((prevData) => [...prevData, ...result.data]);
      setOffset((prevOffset) => prevOffset + 30); // Update offset for next page
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDataFromApi(); // Load data when the component mounts
  }, [filtro]);

  const renderItems = ({ item, index }: { item: any; index: number }) => (
    <LivePageCard data={item} index={index} />
  );

  if (tuttoData.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={40} color="#45d49c" />
      </View>
    );
  }

  return (
    <View className="absolute w-full h-full">
      {isUpdate && (
        <BottomButton
          onScroll={() => {
            setUpdate(false);
            loadDataFromApi();
            ref?.current?.scrollToOffset({ animated: true, offset: 0 });
          }}
        />
      )}
      <FlatList
        refreshing={refreshing}
        onRefresh={loadDataFromApi}
        data={tuttoData}
        ref={ref}
        renderItem={renderItems}
        keyExtractor={(item, i) => i.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => loading && <ActivityIndicator size={20} />}
      />
    </View>
  );
};

export default TabSliderView;
