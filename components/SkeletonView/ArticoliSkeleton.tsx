import React from "react";
import { StyleSheet, View, Dimensions, ViewStyle } from "react-native";
import SkeletonLoader from "expo-skeleton-loader";

const { width, height } = Dimensions.get("window");

const numberOfPosts = new Array(5).fill(null);

const PostLayout = () => (
  <SkeletonLoader
    boneColor="#dedede"
    highlightColor="#e6e6e6"
    style={{
      marginVertical: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* <AvatarLayout style={{ marginBottom: 10 }} /> */}

    <SkeletonLoader.Item
      style={{
        width: "95%",
        height: height / 8,
        marginVertical: 10,
        marginHorizontal: "auto",
        borderRadius: 1,
      }}
    />
  </SkeletonLoader>
);

const ArticoliSkeleton = () => {
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
            height: height / 4.5,
            marginVertical: 0,
            marginHorizontal: "auto",
          }}
        />
      </SkeletonLoader>

      {numberOfPosts.map((_, i) => (
        <PostLayout key={i} />
      ))}
    </>
  );
};

export default ArticoliSkeleton;
