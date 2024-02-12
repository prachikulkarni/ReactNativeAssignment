import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../constants/GlobalStyle';
import {useDispatch} from 'react-redux';
import {deleteAlbumItem} from '../../store/Album';
import ImageButton from '../../common_components/ImageButton';

type sectionItemProps = {
  title: string;
  userId: number;
  id: number;
  onPress: () => void;
};

const SectionItem = ({title, id, onPress}: sectionItemProps) => {
  const dispatch = useDispatch();

  function deleteItem(id: number) {
    dispatch(deleteAlbumItem(id));
  }

  return (
    <View style={styles.outerContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={{color: GlobalStyle.Appcolors.sectionItemText}}
        style={({pressed}) => [
          styles.buttonContainer,
          pressed ? styles.buttonPressed : null,
        ]}>
        <View style={styles.innerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <ImageButton
            imgSource={require('../../assets/images/delete_icon.webp')}
            onPress={() => deleteItem(id)}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default SectionItem;

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingStart: 5,
    paddingEnd: 5,
  },
  title: {
    textAlignVertical: 'center',
    fontSize: 14,
    color: GlobalStyle.Appcolors.sectionHeaderText,
  },
});
