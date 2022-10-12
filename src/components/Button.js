import {View, Text, Animated, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../stylesheets';
import {
    PanGestureHandler,
} from 'react-native-gesture-handler';

export default function Button({name}) {
    // var translateY = new Animated.Value(0)
    // const handleGesture = Animated.event([{nativeEvent: {absoluteY: translateY}}], 
    // { useNativeDriver: true });
    const [borderd, setBorderd] = useState(true)
    const move = useRef(new Animated.Value(0)).current
    const comparion = borderd == false;

    const togglePosition = () => {
        Animated.spring(
            move,
          {
            toValue: borderd ? -100 : 0,
            duration: 500,
            bounciness:15,
            useNativeDriver:true
          },
        ).start();
    }

    return (
        // <PanGestureHandler
        //     onGestureEvent={handleGesture}
        //     // onHandlerStateChange={(evt)=>{ }}
        //     // failOffsetX={[-50,50]}
        //     onFailed={() => {console.log("handler failed")}}
        //     onActivated={()=>{console.log("handler activated")}}
        //     onCancelled={()=>{console.log("handler Cancelled")}}
        //     onBegan={()=>{console.log("handler began")}}
        //     onEnded={(evt)=>{
        //         Animated.timing(translateY,{
        //             toValue:0,
        //             duration:100,
        //             useNativeDriver:true
        //         }).start()
        //     }}
        // >
        // <Animated.View 
        //     style={{
        //     transform: [
        //         {
        //             translateY: translateY
        //         }]}}
        //     >
        <TouchableOpacity onPressIn={()=>{
            setBorderd(!borderd)
            togglePosition()
        }}>
            <Animated.View
            style={{
                ...styles.button,
                backgroundColor: comparion ? '#fff' : 'transparent',
                borderWidth: comparion ? 0 : 3,
                transform: [{
                    translateY: move
                }]
            }}>
            <MCI name={name} size={50} color={comparion ? '#036ffc' : 'white'} />
            </Animated.View>
         </TouchableOpacity>
        // </Animated.View>
        // </PanGestureHandler> 
    );
}
