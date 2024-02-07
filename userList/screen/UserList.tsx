import {View, SectionList, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {UserListScreenProps} from '../../navigation/type';
import {
  AlbumDataType,
  UserDataType,
  fetchUserData,
  fetchAlbumData,
} from '../../network/NetworkRequest';
import AppActivityIndicator from '../../common_components/AppActivityIndicator';
import {GlobalStyle} from '../../constants/GlobalStyle';
import {GlobalStrings} from '../../constants/GlobalStrings';
import SectionHeader from '../components/SectionHeader';
import SectionItem from '../components/SectionItem';

type SectionListItem = {
  title: string;
  data: AlbumDataType[]; // Assuming SecondAPIResponse is the type of your second API response
  // Add other properties as needed
};

const UserList = ({navigation}: UserListScreenProps) => {
  const [userData, setUserData] = useState<UserDataType[]>([]);
  const [albumData, setAlbumData] = useState<AlbumDataType[]>([]);
  const [sectionListData, setSectionListData] = useState<SectionListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Combine responses into section list data
    if (userData.length > 0 && albumData.length > 0) {
      const combinedData: SectionListItem[] = userData.map(userDataItem => {
        const matchingAlbumItems = albumData.filter(
          albumItem => albumItem.userId === userDataItem.id,
        );
        return {
          title: userDataItem.name,
          data: matchingAlbumItems,
        };
      });
      setSectionListData(combinedData);
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
      // Assuming 'parameterKey' is the key you want to pass to the second API
      const parameter = item.id;
      // Call the second API for each element of the first API response
      getAlbumData(parameter);
    });
  }, [userData]);

  function getListViewItem(albumId: number, albumTitle: string) {
    navigation.navigate('PhotoListScreen', {
      albumId: albumId,
      albumName: albumTitle,
    });
  }

  const renderItem = ({item}: {item: AlbumDataType}) => (
    <SectionItem
      title={item.title}
      onPress={() => getListViewItem(item.id, item.title)}
    />
  );

  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: string};
  }) => <SectionHeader title={title} />;

  return (
    <View>
      {isLoading ? (
        <AppActivityIndicator
          size="large"
          color={GlobalStyle.Appcolors.primary500}
        />
      ) : (
        <SectionList
          stickySectionHeadersEnabled
          sections={sectionListData}
          keyExtractor={(item, index) => item.id.toString() + index.toString()}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      )}
    </View>
  );
};

export default UserList;
