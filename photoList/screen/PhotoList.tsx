import {
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {PhotoListScreenProps} from '../../navigation/type';

type PhotoDataType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const PhotoList = ({navigation, route}: PhotoListScreenProps) => {
  const [photoData, setPhotoData] = useState<PhotoDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showUserPhotos, setShowUserPhotos] = useState<boolean>(true);

  const photoUrl = 'https://jsonplaceholder.typicode.com/photos?';
  const allPhotoDataURL = 'https://jsonplaceholder.typicode.com/photos';

  // Function to fetch photo API
  const fetchPhotoData = async (parameter: number) => {
    try {
      setIsLoading(true);
      const url = showUserPhotos
        ? photoUrl + `albumId=${parameter}`
        : allPhotoDataURL;
      console.log('url hit=' + url);

      const response = await fetch(url);
      const data = await response.json();
      setPhotoData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching photo API:', error);
      setIsLoading(false);
    }
  };

  function handleTapMe() {
    setShowUserPhotos(prevShowUserPhotos => !prevShowUserPhotos);
    console.log('tap me clicked' + showUserPhotos);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="Tap me" onPress={handleTapMe}></Button>;
      },
    });
  }, []);

  useEffect(() => {
    // Call the photo API
    fetchPhotoData(route.params.albumId);
  }, [showUserPhotos]);

  const renderGridItem = ({item}: {item: PhotoDataType}) => {
    const imageWidth = Dimensions.get('window').width / 3 - 10; // Adjusted width for three columns with margins
    return <Image source={{uri: item.thumbnailUrl}} style={[styles.image]} />;
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <FlatList
          data={photoData}
          renderItem={renderGridItem}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
        />
      )}
    </View>
  );
};

export default PhotoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
  },
  image: {
    width: (Dimensions.get('window').width - 30) / 3, // Subtracting 40 for margins (5 on each side)
    height: (Dimensions.get('window').width - 20) / 3, // Adjust height to maintain aspect ratio
    margin: 5,
  },
});
