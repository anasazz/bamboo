import React, { useState } from "react";
import {
  LogBox,
  StatusBar,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { TabView, SceneMap, TabBar, TabBarProps } from "react-native-tab-view";
import TabSliderView from "../../../components/TabSliderVIew";

type Route = {
  key: string;
  title: string;
};

const renderScene = SceneMap({
  first: () => <TabSliderView filtro={0} />,
  second: () => <TabSliderView filtro={1} />,
  third: () => <TabSliderView filtro={2} />,
  forth: () => <TabSliderView filtro={3} />,
});

const Feed: React.FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState<Route[]>([
    { key: "first", title: "Tutto" },
    { key: "second", title: "Casa" },
    { key: "third", title: "Tech" },
    { key: "forth", title: "Persona" },
  ]);

  LogBox.ignoreAllLogs();

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />
      <TabView
        renderTabBar={(props: TabBarProps) => (
          <TabBar
            {...props}
            renderLabel={({ route, focused }) => (
              <Text className={focused ? "text-[#000]" : "text-zinc-500"}>
                {route.title}
              </Text>
            )}
            style={{
              backgroundColor: "white",
              borderBottomColor: "#f2f2f2",
              borderBottomWidth: 1,
            }}
            indicatorStyle={{ backgroundColor: "#45d49c", height: 3 }}
          />
        )}
        style={{
          backgroundColor: "white",
        }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

export default Feed;
