import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import FindAstroid from './FindAstroid';
import AstroidResult from './AstroidResult';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FindAstroid">
        <Stack.Screen
          name="FindAstroid"
          component={FindAstroid}
          options={{title: 'Find Astroid'}}
        />
        <Stack.Screen
          name="AstroidResult"
          component={AstroidResult}
          options={{title: 'Astroid Result'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
