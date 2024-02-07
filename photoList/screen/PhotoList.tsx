import {Button, FlatList, View, Alert} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {PhotoListScreenProps} from '../../navigation/type';
import {PhotoDataType, fetchPhotoData} from '../../network/NetworkRequest';
import SquareImage from '../components/SquareImage';
import AppActivityIndicator from '../../common_components/AppActivityIndicator';
import {GlobalStyle} from '../../constants/GlobalStyle';
import {GlobalStrings} from '../../constants/GlobalStrings';

const PhotoList = ({navigation, route}: PhotoListScreenProps) => {
  const [photoData, setPhotoData] = useState<PhotoDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showUserPhotos, setShowUserPhotos] = useState<boolean>(true);

  const fetchData = async (parameter: number) => {
    try {
      setIsLoading(true);
      const data = await fetchPhotoData(parameter, showUserPhotos);
      setPhotoData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        GlobalStrings.networkErrorTitle,
        GlobalStrings.networkErrorMessage,
      );
    }
  };

  function handleTapMe() {
    setShowUserPhotos(prevShowUserPhotos => !prevShowUserPhotos);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="Tap me" onPress={handleTapMe}></Button>;
      },
      title: showUserPhotos ? route.params.albumName : GlobalStrings.allPhotos,
    });
  }, [showUserPhotos]);

  useEffect(() => {
    // Call the photo API
    fetchData(route.params.albumId);
  }, [showUserPhotos]);

  const renderGridItem = ({item}: {item: PhotoDataType}) => {
    return <SquareImage imageSrc={item.thumbnailUrl} />;
  };

  return (
    <View style={GlobalStyle.container}>
      {isLoading ? (
        <AppActivityIndicator
          size="large"
          color={GlobalStyle.Appcolors.primary500}
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
