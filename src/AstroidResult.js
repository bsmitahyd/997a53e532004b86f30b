import React from 'react';
import {Container, Content,ListItem,Body,Text} from 'native-base';
import {StyleSheet} from 'react-native';

const AstroidResult = ({route}) => {
  return (
    <Container>
      <Content>
        <ListItem itemDivider />
        <ListItem>
          <Body>
            <Text style={{fontSize:14, fontWeight:'400'}}>
              Name:
              <Text style={{fontSize:14, fontWeight:'bold'}}
              >{`${route.params.name}`}</Text>
            </Text>
          </Body>
        </ListItem>
        <ListItem>
          <Body>
            <Text style={{fontSize:14, fontWeight:'400'}}>
              NASA_JPL_URL:
              <Text style={{fontSize:14, fontWeight:'bold'}}>{`${route.params.nasa_jpl_url}`}</Text>
            </Text>
          </Body>
        </ListItem>
        <ListItem>
          <Body>
            <Text style={{fontSize:14, fontWeight:'400'}}> 
              IS_POTENTIALLY_HAZARDOUS_ASTROID:
              <Text style={{fontSize:14, fontWeight:'bold'}}>{`${route.params.is_potentially_hazardous_asteroid}`}</Text>
            </Text>
          </Body>
        </ListItem>
      </Content>
    </Container>
  );
};
export default AstroidResult;
