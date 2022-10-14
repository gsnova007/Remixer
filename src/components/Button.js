import {View, Text, Animated, TouchableOpacity, Platform} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../stylesheets';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import * as color from '../utils/colors';
import {downloadFile, fileExist, requestToPermissions} from '../helperFunctions/downloader';
import {playSound} from '../helperFunctions/SoundController';
import VolumeControl, { VolumeControlEvents } from 'react-native-volume-control'

export default function Button({name}) {
    var translateX = new Animated.Value(0);
    var translateY = new Animated.Value(0);
    var soundObj = useRef(null)
    onPanGestureEvent = Animated.event(
        [
        {
            nativeEvent: {
            translationX: translateX,
            translationY: translateY,
            },
        },
        ],
        {useNativeDriver: true},
    );
    const [borderd, setBorderd] = useState(true);
    const [exist, setExist] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloading, setDownloading] = useState(false);
    const [volume, setVolume] = useState(null)
    const move = useRef(new Animated.Value(0)).current;
    const comparion = borderd == false;
    
    useEffect(() => {
        fileExist(name, setExist);
        VolumeControl.getVolume().then((res)=>setVolume(res))
    }, []);

    const togglePosition = () => {
        Animated.spring(move, {
        toValue: borderd ? -100 : 0,
        duration: 500,
        bounciness: 15,
        useNativeDriver: true,
        }).start();
    };

    const onSingleTapEvent = (event) => {
        !exist
            ? onDownloadStart()
            : [setBorderd(!borderd), togglePosition(), soundObj.current = playSound(name)];
    };

    const onDownloadStart = () =>{
        if(Platform.OS === 'ios'){
            downloadFile(name, setProgress, setExist, setDownloading)
        }else{
            requestToPermissions( name, setProgress, setExist, setDownloading)
        }
    }

    const onEndPan = (evt) => {
        if(soundObj.current != null){
            if(evt.nativeEvent.translationY <= 0 ){
                if(volume < 1){
                    setVolume(volume + 0.1)
                    VolumeControl.change(volume)
                    console.log("Volume increased")
                }
            }else{
                if(volume > 0){
                    setVolume(volume - 0.1)
                    VolumeControl.change(volume)
                    console.log("Volume decreased")
                }
            }
            
        }
        Animated.parallel([
        Animated.timing(translateY, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }),
        Animated.timing(translateX, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }),
        ]).start();
        console.log("handler ended",evt.nativeEvent.translationY)
    }

    // const onActivatePan = (event) => {
    //     if(soundObj.current != null){
    //         console.log("handler activated",soundObj.current)
    //     }
    // }


  return (
    <PanGestureHandler
        onGestureEvent={onPanGestureEvent}
        activateAfterLongPress={50}
        // onActivated={onActivatePan}
        onEnded={onEndPan}>
        <Animated.View
            style={{
            transform: [
                {
                translateX: translateX,
                },
                {
                translateY: translateY,
                },
            ],
            }}>
                <TapGestureHandler
                    onEnded={onSingleTapEvent}
                    maxDurationMs={50}
                >
                <Animated.View
                    style={{
                    ...styles.button,
                    backgroundColor: comparion ? color.white : 'transparent',
                    borderWidth: comparion || downloading ? 0 : 3,
                    transform: [
                        {
                        translateY: move,
                        },
                    ],
                    }}>
                        {downloading ? (
                            <View style={{position: 'absolute', zIndex: 100}}>
                                <AnimatedCircularProgress
                                size={70}
                                width={3}
                                fill={progress}
                                tintColor={color.white}
                                backgroundColor={progress != 0 ? color.blue : 'transparent'}
                                />
                            </View>
                        ) : null}
                        <MCI
                            name={name}
                            size={50}
                            color={comparion ? color.blue : color.white}
                        />
                    </Animated.View>
                </TapGestureHandler>
            </Animated.View>
        </PanGestureHandler>
    );
}
