import { View, Text } from 'react-native'
import React from 'react'
import styles from '../stylesheets'
import FA from 'react-native-vector-icons/FontAwesome'

export default function Header() {
    return (
        <View style={styles.header}>
            <FA name="window-close" size={30} color="#fff"/>
            <Text style={styles.headerText}>Instructions</Text>
        </View>
    )
}