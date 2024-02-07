import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type activityIndicatorProps = {
  color: string;
  size?: 'small' | 'large';
}

const AppActivityIndicator = ({
  color,
  size = 'large',
}: activityIndicatorProps) => {
  return (
    <ActivityIndicator
      color={color}
      size={size}
      style={styles.activityIndicatorStye}
    />
  );
};

export default AppActivityIndicator;

const styles = StyleSheet.create({
  activityIndicatorStye: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
