/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  View,
  Dimensions,
  PixelRatio,
  Text,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/Home';
import InfoScreen from './screens/Info';

import { NativeModules } from 'react-native';

const { WearableModule } = NativeModules;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const normalize = (size: any) => {
  const scale = Math.min(screenWidth / 375, screenHeight / 667); // standard iPhone 6/7/8 dimensions
  const normalizedSize = Math.round(PixelRatio.roundToNearestPixel(size * scale));
  return normalizedSize;
};

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            const activeColor = "green";
            const inactiveColor = "rgba(180, 180, 184, 0.3)";

            if (route.name === 'Home') {
              return (
                <View style={[styles.bottomButton, { backgroundColor: focused ? activeColor : inactiveColor }]}>
                  <View style={styles.bottomButtonView}>
                    <Image style={{ height: normalize(15), width: normalize(15) }} source={require("./images/home_button_icon.png")}></Image>
                  </View>
                </View>
              )
            } else if (route.name === 'Info') {
              return (
                <View style={[styles.bottomButton, { backgroundColor: focused ? activeColor : inactiveColor }]}>
                  <View style={styles.bottomButtonView}>
                    <Image style={{ height: normalize(15), width: normalize(5) }} source={require("./images/i_button_icon.png")}></Image>
                  </View>
                </View>
              )
            } else if (route.name === 'Play') {
              return (
                <View style={[styles.bottomButton, { backgroundColor: focused ? activeColor : inactiveColor }]}>
                  <View style={styles.bottomButtonView}>
                    <Image style={{ height: normalize(15), width: normalize(15) }} source={require("./images/play_button_icon.png")}></Image>
                  </View>
                </View>
              )
            }
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            paddingTop: 10,
            height: 60,
            backgroundColor: '#000000',
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Info" component={InfoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    position: 'relative'
  },
  header: {
    width: screenWidth,
    height: normalize(80),
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute"
  },
  headerLeft: {
    marginTop: normalize(20),
    marginLeft: normalize(20),
    height: normalize(50),
    width: normalize(70)
  },
  headerRight: {
    marginTop: normalize(20),
    marginRight: normalize(20),
    height: normalize(60),
    width: normalize(80)
  },
  mainView: {
    width: screenWidth,
    flexDirection: "row",
    justifyContent: 'center',
    paddingTop: normalize(20)
  },
  bottomButton: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomButtonView: {
    height: 36,
    width: 36,
    borderRadius: 36 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  wearIconButton: {
    height: 114,
    width: 114,
    borderRadius: 114 / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wearIconView: {
    backgroundColor: "#000000",
    height: 110,
    width: 110,
    borderRadius: 110 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default App;