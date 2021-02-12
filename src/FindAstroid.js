import React, {useState} from 'react';
import {
  Container,
  Content,
  Input,
  Label,
  Form,
  Button,
  Text,
  Spinner,
} from 'native-base';
import {Alert, StyleSheet} from 'react-native';
import {checkNetworkConnection} from './NetworkCheck';
import {CONSTANTS} from './Constants';

const FindAstroid = (props) => {
  const [astroidValue, setAstroidValue] = useState('');
  const [loading, setLoading] = useState(false);

  const _submitButtonClicked = async () => {
    const networkStatus = await checkNetworkConnection();
    if (networkStatus) {
      fetchAstroidDetails(astroidValue);
    } else {
      Alert.alert('Please check internet connection and try again');
    }
  };

  const _randonAstroidButtonClicked = async () => {
    const networkStatus = await checkNetworkConnection();
    if (networkStatus) {
      fetchRandomAstroidId();
    } else {
      Alert.alert('Please check internet connection and try again');
    }
  };

  fetchRandomAstroidId = () => {
    setLoading(true);
    fetch(`${CONSTANTS.BASE_URL}browse?api_key=${CONSTANTS.APP_API_KEY}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        console.log('RESULT==>', result);

        this.fetchAstroidDetails(
            result.near_earth_objects[Math.floor(Math.random()*result.near_earth_objects.length)].id,
        );
      })
      .catch((error) => {
        setLoading(false);
        console.log('error-->', error);
      });
  };
  fetchAstroidDetails = (astroidId) => {
    setLoading(true);
    fetch(
      `${CONSTANTS.BASE_URL}${astroidId}?api_key=${CONSTANTS.APP_API_KEY}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        setAstroidValue('');

        const responseObj = result;

        const objToSend = {
          name: responseObj.name,
          nasa_jpl_url: responseObj.nasa_jpl_url,
          is_potentially_hazardous_asteroid: responseObj.is_potentially_hazardous_asteroid
            ? 'Yes'
            : 'No',
        };
        props.navigation.navigate('AstroidResult', objToSend);

        console.log('RESULT==>', result);
      })
      .catch((error) => {
        setLoading(false);
        setAstroidValue('');
        Alert.alert('Please enter valid Astroid ID');
        console.log('error-->', error);
      });
  };
  return (
    <Container>
      <Content>
        <Form style={{margin: 5}}>
          <Label style={{margin: 5}}>Enter Astroid ID *</Label>
          <Input
            style={{padding: 10, borderRadius: 5, borderWidth: 1,margin:2,marginTop:10}}
            placeholder="Enter Astroid ID"
            placeholderTextColor="#cecece"
            keyboardType="number-pad"
            maxLength={7}
            value={astroidValue}
            onChangeText={(text) => setAstroidValue(text)}
          />
          <Container
            style={{flexDirection: 'row',justifyContent:'space-between', marginTop:35}}>
            <Button
              rounded
              style={{flex:0.45,flexDirection:'row'}}
              disabled={!astroidValue || loading}
              onPress={_submitButtonClicked}>
              <Text style={{alignContent: 'stretch',flex:1,width:'100%'}}>Submit</Text>
            </Button>
            <Button
              rounded
              success
              style={{flex:0.45,flexDirection:'row'}}
              disabled={loading}
              onPress={_randonAstroidButtonClicked}>
              <Text style={{alignSelf: 'center',flex:1,width:'100%'}}>Random Astroid</Text>
            </Button>
          </Container>
        </Form>
      </Content>
      {loading ? (
        <Content>
          <Spinner color="green" />
        </Content>
      ) : null}
    </Container>
  );
};

export default FindAstroid;
