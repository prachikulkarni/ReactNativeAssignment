import {Image, StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';

type propsType = {
  imageSrc: string;
};
const SquareImage = React.memo((props: propsType) => {
  const {styles} = useStyle();
  return <Image source={{uri: props.imageSrc}} style={[styles.image]} />;
});

export default SquareImage;

const useStyle = () => {
  const dimensions = useWindowDimensions();
  const styles = StyleSheet.create({
    image: {
      width: (dimensions.width - 30) / 3, // Subtracting 40 for margins (5 on each side)
      height: (dimensions.width - 20) / 3, // Adjust height to maintain aspect ratio
      margin: 5,
    },
  });

  return {styles};
};
