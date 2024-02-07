const BASE_URL = 'https://jsonplaceholder.typicode.com/';

export type UserDataType = {
  id: number;
  name: string;
  username: string;
  email: string;
};

//UserDataType.id == AlbumDataType.userId
export type AlbumDataType = {
  userId: number;
  id: number;
  title: string;
};

export type PhotoDataType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

// Function to fetch Users API
export const fetchUserData = async (): Promise<UserDataType[]> => {
  try {
    const response = await fetch(BASE_URL + `users`);
    if (!response.ok) {
      throw new Error('Network request failed');
    }
    const data: UserDataType[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Function to fetch photo API
export const fetchPhotoData = async (
  parameter: number,
  showUserPhotos: boolean,
): Promise<PhotoDataType[]> => {
  try {
    const url = showUserPhotos
      ? BASE_URL + `photos?albumId=${parameter}`
      : BASE_URL + `photos`;
    const response = await fetch(url);
    if (!response.ok) {
      throw Error('Network request Failed');
    }
    const data: PhotoDataType[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching photo API:', error);
    throw error;
  }
};

// Function to fetch Album data API
export const fetchAlbumData = async (
  parameter: number,
): Promise<AlbumDataType[]> => {
  try {
    const url = BASE_URL + `albums?userId=${parameter}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw Error('Network request Failed');
    }
    const data: AlbumDataType[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching album API:', error);
    throw error;
  }
};
