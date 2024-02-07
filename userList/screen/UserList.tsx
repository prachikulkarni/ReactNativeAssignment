import {
  StyleSheet,
  Text,
  View,
  SectionList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {UserListScreenProps} from '../../navigation/type';

type UserDataType = {
  id: number;
  name: string;
  username: string;
  email: string;
};

//UserDataType.id == AlbumDataType.userId
type AlbumDataType = {
  userId: number;
  id: number;
  title: string;
};

type SectionListItem = {
  title: string;
  data: AlbumDataType[]; // Assuming SecondAPIResponse is the type of your second API response
  // Add other properties as needed
};

const UserList = ({navigation}: UserListScreenProps) => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const albumUrl = 'https://jsonplaceholder.typicode.com/albums?';

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

  const fetchUserData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data API:', error);
      setIsLoading(false);
    }
  };

  // Function to fetch second API
  const fetchAlbumData = async (parameter: number) => {
    try {
      const url = albumUrl + `userId=${parameter}`;
      const response = await fetch(url);
      const data = await response.json();
      setAlbumData(prevData => [...prevData, ...data]);
    } catch (error) {
      console.error('Error fetching album API:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Call the first API
    fetchUserData();
  }, []); // Empty dependency array to ensure this effect runs only once on component mount

  useEffect(() => {
    // Iterate over the first API response and call the second API for each element
    userData.forEach(item => {
      // Assuming 'parameterKey' is the key you want to pass to the second API
      const parameter = item.id;
      // Call the second API for each element of the first API response
      fetchAlbumData(parameter);
    });
  }, [userData]);

  function getListViewItem(albumId: number) {
    console.log('albumId=' + albumId);

    navigation.navigate('PhotoListScreen', {
      albumId: albumId,
    });
  }

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 40,
          }}
        />
      ) : (
        <SectionList
          sections={sectionListData}
          keyExtractor={(item, index) => item.id.toString() + index.toString()}
          renderItem={({item}) => (
            <View>
              <Text onPress={() => getListViewItem(item.id)}>
                {item.title}
                <Text> userid={item.userId}</Text>
                <Text> id={item.id}</Text>
              </Text>
            </View>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{title}</Text>
          )}
        />
      )}
    </View>
  );
};

export default UserList;

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
});
