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

export type SectionListItemType = {
  title: string;
  data: AlbumDataType[];
};
