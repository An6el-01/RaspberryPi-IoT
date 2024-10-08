import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Switch, StyleSheet, Dimensions, Image, Alert } from "react-native";
import backgroundImage from '../Media/background.jpg';
import home from "../Styles/stylingHome";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const DEVICE_WIDTH = Dimensions.get('window').width;

function HomePage() {
    
    const [deviceData, setDeviceData] = useState([
        { name: "Desk Lamp", icon: "desk-lamp", state: false },
        { name: "Heater", icon: "fireplace", state: false },
        { name: "Fan", icon: "fan", state: false },
        { name: "Camera", icon: "camera", state: false },
    ]);

    const carouselRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0); 

    const handleScroll = (event) => {
        const page = Math.round(event.nativeEvent.contentOffset.x / (DEVICE_WIDTH - 50));
        setCurrentPage(page); 
    };

    const scrollRight = () => {
        if (carouselRef.current && currentPage < deviceData.length - 1) {
            setCurrentPage(currentPage + 1);
            carouselRef.current.scrollTo({ x: (currentPage + 1) * (DEVICE_WIDTH - 50), animated: true });
        }
    };

    const scrollLeft = () => {
        if (carouselRef.current && currentPage > 0) {
            setCurrentPage(currentPage - 1); 
            carouselRef.current.scrollTo({ x: (currentPage - 1) * (DEVICE_WIDTH - 50), animated: true });
        }
    };
      const [loading, setLoading] = useState(false);
      const [imageData, setImageData] = useState(null); 



    const takePhoto = async () => {
      Alert.alert("Capturing Image. Please wait 15 seconds")
        try{
                  setLoading(true);
                  const response = await axios.get('http://172.18.176.32:4000/CaptureImage');
                  if (response.status === 200) {
                    console.log('Photo taken successfully');
                    setImageData(response.data);
                  }else {
                    Alert.alert("Failed to capture image, please try again")
                    console.error('Failed to take photo: ');
                  }
                }catch (error) {
                  Alert.alert("Error encountered while capturing an image: ", error)
                  console.error("ERROR : ", error);
                }finally{
                  setLoading(false);
                }
    };

    const turnOnDevice = async (index)  => {
    
        console.log("Turning on device")
        const updatedDeviceData = [...deviceData];
        updatedDeviceData[index].state = true;
        setDeviceData(updatedDeviceData);

        const deviceName = deviceData[index].name
        switch(deviceName){
            case "Desk Lamp":
                try{
                    setLoading(true);
                    const response = await axios.get('http://172.18.176.32:4000/toggleDevice-deskLamp-on');
                    if (response.status === 200) {
                      console.log('deskLamp on');
                      setImageData(response.data);
                    }else {
                      console.error('Failed to turn on ');
                    }
                  }catch (error) {
                    console.error("ERROR : ", error);
                  }finally{
                    setLoading(false);
                  }
                  break;
            case "Fan":
                try{
                    setLoading(true);
                    const response = await axios.get('http://172.18.176.32:4000/toggleDevice-fan-on');
                  }catch (error) {
                    console.error("ERROR : ", error);
                  }finally{
                    setLoading(false);
                  }
                  break;
            case "Heater":
                try{
                    setLoading(true);
                    const response = await axios.get('http://172.18.176.32:4000/toggleDevice-heater-on');
                  }catch (error) {
                    console.error("ERROR : ", error);
                  }finally{
                    setLoading(false);
                  }
                  break;
            default:
                break;
        }
    };

    const turnOffDevice =  async (index) => {
        const updatedDeviceData = [...deviceData];
        updatedDeviceData[index].state = false;
        setDeviceData(updatedDeviceData);
        const deviceName = deviceData[index].name
        switch(deviceName){
            case "Desk Lamp":
                try{
                    setLoading(true);
                    const response = await axios.get('http://172.18.176.32:4000/toggleDevice-deskLamp-off');
                  }catch (error) {
                    console.error("ERROR : ", error);
                  }finally{
                    setLoading(false);
                  }
                  break;
            case "Fan":
                try{
                    setLoading(true);
                    const response = await axios.get('http://172.18.176.32:4000/toggleDevice-fan-off');
                  }catch (error) {
                    console.error("ERROR : ", error);
                  }finally{
                    setLoading(false);
                  }
                  break;
            case "Heater":
                try{
                    setLoading(true);
                    const response = await axios.get('http://172.18.176.32:4000/toggleDevice-heater-off');
                  }catch (error) {
                    console.error("ERROR : ", error);
                  }finally{
                    setLoading(false);
                  }
                  break;
            default:
                break;
        }
    };

    return (
        <View style={home.container}>
            <ImageBackground source={backgroundImage} style={home.backgroundImage}>
                <View style={home.overlay}></View>
                <View style={home.content}>
                    <Text style={home.title}>Control Panel</Text>
                    <View style={home.securityFeedContainer}>
                        <Text style={home.securityFeedTitle}>Security Feed</Text>
                        {imageData ? (
                            <View style={home.imageContainer}>
                                <Image source={{ uri: `data:image/h264;base64,${imageData}` }} style={home.image} />
                            </View>
                        ) : (
                            <View style={home.securityFeed}></View>
                        )}
                    </View>
                    <View style={home.carouselContainer}>
                        <TouchableOpacity onPress={scrollLeft} style={[home.carouselArrow, home.buttonArrow]}>
                            <AntDesign name="arrowleft" size={24} color="white" />
                        </TouchableOpacity>
                        <ScrollView horizontal pagingEnabled snapToInterval={DEVICE_WIDTH - 50} ref={carouselRef} style={home.carousel} onScroll={handleScroll}>
                            {deviceData.map((device, index) => (
                                <View key={index} style={home.deviceCard}>
                                    <MaterialCommunityIcons name={device.icon} size={24} color="black" />
                                    <Text style={home.deviceName}>{device.name}</Text>
                                    {device.name === "Camera" ? (
                                        <TouchableOpacity onPress={takePhoto} style={home.buttonCamera}>
                                            <Text style={home.buttonCameraText}>Take Photo</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View style={home.deviceControls}>
                                            <TouchableOpacity onPress={() => turnOnDevice(index)} style={device.state ? home.buttonOn : home.buttonOff}>
                                                <Text style={home.buttonText}>On</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => turnOffDevice(index)} style={device.state ? home.buttonOff : home.buttonOn}>
                                                <Text style={home.buttonText}>Off</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            ))}
                        </ScrollView>
                        <TouchableOpacity onPress={scrollRight} style={[home.carouselArrow, home.buttonArrow]}>
                            <AntDesign name="arrowright" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={home.navigationDots}>
                        {/* Navigation dots */}
                    </View>
                    <TouchableOpacity onPress={() => console.log('+ Add Device')} style={[home.button]}>
                        <Text style={home.buttonText}>+ Add Device</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

export default HomePage;
