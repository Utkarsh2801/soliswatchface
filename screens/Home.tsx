import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    PixelRatio,
    ImageBackground,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';

import { NativeModules } from 'react-native';

const { WearableModule } = NativeModules;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const normalize = (size: any) => {
    const scale = Math.min(screenWidth / 375, screenHeight / 667); // standard iPhone 6/7/8 dimensions
    const normalizedSize = Math.round(PixelRatio.roundToNearestPixel(size * scale));
    return normalizedSize;
};

const images = "../images/"

const Home = () => {
    const [connected, setConnected] = useState(false)
    const [deviceName, setDeviceName] = useState("")


    const updateDeviceState = async (showConnectedToast: boolean) => {
        let name = ""
        try {
            name = await WearableModule.checkRemoteDevices()
        } catch (error) {
        } finally {
            if (name) {
                setDeviceName(name);
                setConnected(true);
                if (showConnectedToast) {
                    ToastAndroid.show(`${name} is connected!`, ToastAndroid.SHORT)
                }
            }
            if (!name) {
                setConnected(false)
                ToastAndroid.show("No wearable device connected!", ToastAndroid.SHORT)
            }
        }
        return name ? true : false;
    }

    useEffect(() => {
        updateDeviceState(true)
    }, [])

    const startRemoteActivity = async () => {
        try {
            const connected = await updateDeviceState(false);
            if (connected) {
                await WearableModule.startRemoteActivity()
                ToastAndroid.show(`Check your ${deviceName} to continue.`, ToastAndroid.SHORT)
            }
        } catch (e) {
            setConnected(false)
            console.log(e)
        }
    }

    return <ImageBackground style={{ flex: 1, backgroundColor: "#000000" }} source={require(`${images}App-Home.png`)}>
        <View style={{ position: "relative" }}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image style={{ height: normalize(45), width: normalize(85) }} source={require(`${images}analogous_logo.png`)} />
                    <Text style={{ fontSize: normalize(10), color: '#ffffff', fontFamily: "AdventPro-SemiBold" }}>By Time Canvas</Text>
                </View>

                <View style={{
                    justifyContent: "center", alignItems: 'center', marginTop: normalize(20),
                    marginRight: normalize(20),
                    marginBottom: normalize(10)
                }}>
                    <Text style={{ fontSize: normalize(11), color: '#BDC3C7', fontFamily: "AdventPro-Regular" }}>Wear OS</Text>
                    <Text style={{ fontSize: normalize(11), color: '#BDC3C7', fontFamily: "AdventPro-Regular" }}>Watch Faces</Text>
                </View>
            </View>
        </View>
        <View style={{
            position: 'absolute',
            bottom: 0,
            width: screenWidth,
            marginBottom: normalize(15)
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                // backgroundColor: '#000000',
                paddingHorizontal: normalize(30)
            }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: normalize(26), fontFamily: "AdventPro_Expanded-SemiBold" }}><Text style={{ color: "#ffffff" }}>SOLIS</Text></Text>
                    {/* <Text style={{ color: '#BDC3C7', fontSize: normalize(27), fontFamily: "AdventPro_Expanded-SemiBold" }}>MoonFace</Text> */}
                    <View style={{ width: normalize(50), height: 1, backgroundColor: "#cccccc", marginTop: 5 }}></View>
                    <Text style={{ fontSize: normalize(13), color: '#dddddd', fontFamily: "AdventPro-SemiBold", marginTop: 8 }}>Hyper Realistic Watchface</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <TouchableOpacity
                        onPress={startRemoteActivity}
                        style={[styles.wearIconButton, { backgroundColor: connected ? 'green' : 'red' }]}> */}
                        <TouchableOpacity 
                            onPress={startRemoteActivity}
                            style={[styles.wearIconView, {borderColor : connected ? "green" : "red" }]}>
                                <Image style={{ width: normalize(25), height: normalize(40) }} source={require(`${images}wear_icon.png`)}></Image>
                        </TouchableOpacity>
                    {/* </TouchableOpacity> */}
                </View>
            </View>
            <View style={{
                // backgroundColor: "#000000",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20
            }}>
                <Text style={{ fontSize: normalize(16), color: '#dddddd', fontFamily: "AdventPro_ExtraExpanded-Bold" }}>Thanks! for choosing us.</Text>
                {connected ?
                    <>
                        <Text style={{ fontSize: normalize(12), color: '#dddddd', marginTop: normalize(3) }}>Your {deviceName} is connected! Tap the wearable</Text>
                        <Text style={{ fontSize: normalize(12), color: '#dddddd', marginTop: normalize(2) }}>button to install watch face on your device.</Text>
                    </> :
                    <Text style={{ fontSize: normalize(12), color: '#dddddd', marginTop: normalize(3), textAlign: "center", lineHeight: normalize(20), paddingHorizontal: normalize(25) }}>No Wear OS device is connected! connect the device and tap wearable button to refresh.</Text>
                }
                <Text style={{ fontSize: normalize(11), color: '#dddddd', marginTop: normalize(4), paddingHorizontal: normalize(10), textAlign: "center", fontWeight: "700" }}>Note: For detailed instructions visit info section by taping i button.</Text>
            </View>
        </View>
    </ImageBackground>
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
      marginTop: normalize(15),
      marginLeft: normalize(20),
      justifyContent : 'center',
      alignItems : 'center'
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
        backgroundColor: "rgba(180, 180, 184, 0.3)",
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
        backgroundColor: "rgba(0,0,0,0.5)",
        height: 110,
        width: 110,
        borderRadius: 110 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth : 2,
    }
});

export default Home;
