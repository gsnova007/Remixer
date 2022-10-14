import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import HomeScreen from './src/screens/Dashboard'
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

export default function App() {
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HomeScreen/>
    </GestureHandlerRootView>
  )
}