import { View, Text } from 'react-native'
import React from 'react'
import styles from '../stylesheets'
import Button from './Button'
// import VolumeController from './VolumeController'


export default function MainComponent() {
  return (
        <View style={styles.mainComponent}>
            <Button name="emoticon"/>
            <Button name="emoticon-confused"/>
            <Button name="emoticon-cool"/>
            <Button name="emoticon-excited"/>
        </View>
  )
}