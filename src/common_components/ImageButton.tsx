import {Image, StyleSheet, TouchableOpacity} from 'react-native';

type imageButtonProps = {
  imgSource: any;
  onPress(): void;
};
export default function ImageButton({imgSource, onPress}: imageButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={imgSource} style={styles.deleteButton} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    width: 30,
    height: 30,
  },
});
