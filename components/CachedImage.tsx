import React, { useEffect, useState, useRef } from 'react';
import { Image, ImageProps } from 'react-native';
import * as FileSystem from 'expo-file-system';

interface CachedImageProps extends ImageProps {
  source: { uri: string };  // Expecting the source to contain a URI
  cacheKey: string;         // The key used to cache the image
}

const CachedImage: React.FC<CachedImageProps> = ({ source, cacheKey, ...props }) => {
  const { uri } = source;
  const filesystemURI = `${FileSystem.cacheDirectory}${cacheKey}`;

  const [imgURI, setImgURI] = useState<string | null>(filesystemURI);

  const componentIsMounted = useRef(true);

  useEffect(() => {
    const loadImage = async (fileURI: string) => {
      try {
        // Use the cached image if it exists
        const metadata = await FileSystem.getInfoAsync(fileURI);
        if (!metadata.exists) {
          // download to cache
          if (componentIsMounted.current) {
            setImgURI(null);
            await FileSystem.downloadAsync(uri, fileURI);
          }
          if (componentIsMounted.current) {
            setImgURI(fileURI);
          }
        }
      } catch (err) {
        console.log(err); // Log error if any
        setImgURI(uri);  // Fallback to the provided URI
      }
    };

    loadImage(filesystemURI);

    return () => {
      componentIsMounted.current = false;
    };
  }, [uri, filesystemURI]);

  return (
    <Image
      {...props}
      source={{
        uri: imgURI,
      }}
    />
  );
};

export default CachedImage;
