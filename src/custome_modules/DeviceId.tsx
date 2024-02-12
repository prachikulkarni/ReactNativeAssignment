import {NativeModules} from 'react-native';
import {GlobalStrings} from '../constants/GlobalStrings';

const {ReactOneCustomMethod} = NativeModules;

export const fetchDeviceId = () => {
  return ReactOneCustomMethod.getPhoneID()
    .then((res: string) => {
      ReactOneCustomMethod.showMessage(
        GlobalStrings.androidToastMessage + `${res}`,
      );
    })
    .catch((err: any) => {
      console.error(err);
      throw err;
    });
};
