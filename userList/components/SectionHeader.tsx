import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../constants/GlobalStyle';

type headerProps = {
  title: string;
};

const SectionHeader = ({title}: headerProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyle.Appcolors.sectionHeader,
    padding: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: GlobalStyle.Appcolors.sectionHeaderText,
  },
});
