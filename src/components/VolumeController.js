import { View, Text, Animated } from 'react-native'
import React from 'react'
import {
    PanGestureHandler,
  } from 'react-native-gesture-handler';

export default function VolumeController({children}) {
    var translateY = new Animated.Value(wp2dp(5))
    const handleGesture = Animated.event([{nativeEvent: {absoluteY: translateY}}], 
    { useNativeDriver: true });

  return (
    <PanGestureHandler 
        onGestureEvent={handleGesture}
        // onHandlerStateChange={(evt)=>{ }}
        // failOffsetX={[-50,50]}
        onFailed={() => {console.log("handler failed")}}
        onActivated={()=>{console.log("handler activated")}}
        onCancelled={()=>{console.log("handler Cancelled")}}
        onBegan={()=>{console.log("handler began")}}
        onEnded={(evt)=>{
            Animated.timing(translateY,{
                toValue:0,
                duration:100,
                useNativeDriver:true
            }).start()
        }}
    >
        <Animated.View 
            style={{
            transform: [
                {
                    translateY: translateY
                }]}}
            >
        {children}
        </Animated.View>
    </PanGestureHandler>
  )
}