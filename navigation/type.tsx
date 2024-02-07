import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  UserListScreen: undefined;
  PhotoListScreen: {albumId: number};
};

export type UserListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'UserListScreen'
>;

export type PhotoListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PhotoListScreen'
>;
