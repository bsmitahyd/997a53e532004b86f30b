import NetInfo from '@react-native-community/netinfo';

export const checkNetworkConnection = async () => {
  const netinfo = await NetInfo.fetch();
  return netinfo.isConnected;
};
