import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../constants/GlobalStyle';

type sectionItemProps = {
  title: string;
  onPress: () => void;
};

const SectionItem = ({title, onPress}: sectionItemProps) => {
  return (
    <View style={styles.outerContaner}>
      <Pressable
        onPress={onPress}
        android_ripple={{color: GlobalStyle.Appcolors.sectionItemText}}
        style={({pressed}) => [
          styles.buttonStyle,
          pressed ? styles.buttonPressed : null,
        ]}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SectionItem;

const styles = StyleSheet.create({
  outerContaner: {
    flex: 1,
    margin: 2,
    height: 40,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    overflow: Platform.OS == 'android' ? 'hidden' : 'visible',
  },
  buttonStyle: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.25,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    marginStart:5
  },
  containerPressed: {
    backgroundColor: GlobalStyle.Appcolors.sectionBg,
  },
  title: {
    fontSize: 14,
    color: GlobalStyle.Appcolors.sectionHeaderText,
  },
});
