import {View, SectionList, Alert, Button, Platform} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {UserListScreenProps} from '../../navigation/type';
import {fetchUserData, fetchAlbumData} from '../../network/NetworkRequest';
import AppActivityIndicator from '../../common_components/AppActivityIndicator';
import {GlobalStyle} from '../../constants/GlobalStyle';
import {GlobalStrings} from '../../constants/GlobalStrings';
import SectionHeader from '../components/SectionHeader';
import SectionItem from '../components/SectionItem';
import {fetchDeviceId} from '../../custome_modules/DeviceId';
import {useDispatch, useSelector} from 'react-redux';
import {addAlbum} from '../../store/Album';
import {
  AlbumDataType,
  SectionListItemType,
  UserDataType,
} from '../../model/model';
import ImageButton from '../../common_components/ImageButton';

const UserList = ({navigation}: UserListScreenProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (Platform.OS == 'android')
          return (
            <ImageButton
              imgSource={require('../../assets/images/message_icon.webp')}
              onPress={fetchDeviceId}
            />
          );
      },
    });
  }, []);

  const [userData, setUserData] = useState<UserDataType[]>([]);
  const [albumData, setAlbumData] = useState<AlbumDataType[]>([]);
  const [sectionListData, setSectionListData] = useState<SectionListItemType[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const sectionList: SectionListItemType[] = useSelector(
    (state: any) => state.sectionList.value,
  );

  useEffect(() => {
    // Combine responses into section list data
    if (userData.length > 0 && albumData.length > 0) {
      const combinedData: SectionListItemType[] = userData.map(userDataItem => {
        const matchingAlbumItems = albumData.filter(
          albumItem => albumItem.userId === userDataItem.id,
        );
        const sectionItem: SectionListItemType = {
          title: userDataItem.name,
          data: matchingAlbumItems,
        };
        return sectionItem;
      });
      dispatch(addAlbum(combinedData));
      setIsLoading(false);
    }
  }, [userData, albumData]);

  const getUserData = async () => {
    try {
      setIsLoading(true);
      const userData = await fetchUserData();
      setUserData(userData);
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        GlobalStrings.networkErrorTitle,
        GlobalStrings.networkErrorMessage,
      );
    }
  };

  const getAlbumData = async (parameter: number) => {
    try {
      setIsLoading(true);
      const userData = await fetchAlbumData(parameter);
      setAlbumData(prevData => [...prevData, ...userData]);
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        GlobalStrings.networkErrorTitle,
        GlobalStrings.networkErrorMessage,
      );
    }
  };

  useEffect(() => {
    // Call the first user API
    getUserData();
  }, []); // Empty dependency array to ensure this effect runs only once on component mount

  useEffect(() => {
    // Iterate over the first API response and call the second API for each element
    userData.forEach(item => {
      const parameter = item.id;
      // Call the album API for each element of the first API response
      getAlbumData(parameter);
    });
  }, [userData]);

  function getListViewItem(albumId: number, albumTitle: string) {
    navigation.navigate('PhotoListScreen', {
      albumId: albumId,
      albumName: albumTitle,
    });
  }

  const renderSectionItem = ({item}: {item: AlbumDataType}) => (
    <SectionItem
      title={item.title}
      id={item.id}
      userId={item.userId}
      onPress={() => getListViewItem(item.id, item.title)}
    />
  );

  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: string};
  }) => <SectionHeader title={title} />;

  return (
    <View style={GlobalStyle.container}>
      {isLoading ? (
        <AppActivityIndicator
          size="large"
          color={GlobalStyle.Appcolors.primary500}
        />
      ) : (
        <SectionList
          stickySectionHeadersEnabled
          sections={sectionList}
          keyExtractor={(item, index) => item.id.toString() + index.toString()}
          renderItem={renderSectionItem}
          renderSectionHeader={renderSectionHeader}
        />
      )}
    </View>
  );
};

export default UserList;
