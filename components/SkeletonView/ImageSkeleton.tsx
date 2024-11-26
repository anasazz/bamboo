import React from "react";
import { StyleSheet, View, Dimensions, ViewStyle } from "react-native";
import SkeletonLoader from "expo-skeleton-loader";

const { width, height } = Dimensions.get("window");


const ImageSkeleton = () => {
  return (
    <>
      <SkeletonLoader
        boneColor="#dedede"
        highlightColor="#e6e6e6"
        style={{
          marginVertical: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <AvatarLayout style={{ marginBottom: 10 }} /> */}

        <SkeletonLoader.Item
          style={{
            width,
            height: height / 4,
            marginVertical: 0,
            marginHorizontal: "auto",
          }}
        />
      </SkeletonLoader>
    </>
  );
};

export default ImageSkeleton;
