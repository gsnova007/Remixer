import {View, Text, Animated, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../stylesheets';
import {
    PanGestureHandler,
} from 'react-native-gesture-handler';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as color from '../utils/colors'
import { downloadFile, fileExist } from '../helperFunctions/downloader';
import { panHandlerName } from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';
import { playSound } from './SoundController';

export default function Button({name}) {
    // var translateY = new Animated.Value(0)
    // const handleGesture = Animated.event([{nativeEvent: {absoluteY: translateY}}], 
    // { useNativeDriver: true });
    const [borderd, setBorderd] = useState(true)
    const [exist, setExist] = useState(false)
    const [progress, setProgress] = useState(0)
    const [downloading, setDownloading] = useState(false)
    const move = useRef(new Animated.Value(0)).current
    const comparion = borderd == false;
    useEffect(()=>{
        fileExist(name,setExist)
    },[])

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
            !exist ? downloadFile('any',name,setProgress,setExist,setDownloading) 
                : [setBorderd(!borderd),togglePosition(),playSound(name)];
            console.log("Hello")
        }}>
            <Animated.View
            style={{
                ...styles.button,
                backgroundColor: comparion ? color.white : 'transparent',
                borderWidth: comparion || downloading ? 0 : 3,
                transform: [{
                    translateY: move
                }]
            }}>
                { downloading ? <View style={{position:'absolute',zIndex:100}}>
                    <AnimatedCircularProgress
                        size={70}
                        width={3}
                        fill={progress}
                        tintColor={color.white}
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor={progress != 0 ? color.blue : "transparent"} />
                </View> : null}
            <MCI name={name} size={50} color={comparion ? color.blue : color.white} />
            </Animated.View>
         </TouchableOpacity>
        // </Animated.View>
        // </PanGestureHandler> 
    );
}
