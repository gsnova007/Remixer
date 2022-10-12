import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import styles from '../../stylesheets'
import Header from '../../components/Header'
import MainComponent from '../../components/MainComponent'

export default function index() {
  return (
    <View style={styles.mainContainer}>
        <StatusBar backgroundColor="#036ffc"/>
        <Header/>
        <Text style={styles.mainText}>Passing Storm</Text>
        <MainComponent/>
    </View>
  )
}