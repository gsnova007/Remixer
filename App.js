import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import HomeScreen from './src/screens/Dashboard'
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
var Sound = require('react-native-sound');



export default function App() {
  useEffect(() => {
    Sound.setCategory('Playback');
  }, [])
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HomeScreen/>
    </GestureHandlerRootView>
  )
}