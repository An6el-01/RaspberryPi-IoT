import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import { devices } from '../Styles/stylingDevices';
import backgroundImage from '../Media/background.jpg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

function Devices({ deviceState, setDeviceState }) {
    
    const [deviceData, setDeviceData] = useState([
        { name: "Desk Lamp", icon: "desk-lamp", state: false },
        { name: "Heater", icon: "fireplace", state: false },
        { name: "Fan", icon: "fan", state: false },
        { name: "Camera", icon: "camera", state: false },
        // Add more device data as needed
    ]);

    const [loading, setLoading] = useState(false);
    const [imageData, setImageData] = useState(null); 


    const takePhoto = async () => {
        try{
                  setLoading(true);
                  const response = await axios.get('http://172.18.176.32:4000/CaptureImage');
                  if (response.status === 200) {
                    console.log('Photo taken successfully');
                    setImageData(response.data);
                  }else {
                    console.error('Failed to take photo: ');
                  }
                }catch (error) {
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
            case "Heater":
                try{
                    setLoading(true);
                    const response = await axios.get('http://172.18.176.32:4000/toggleDevice-heater-on');
                    if (response.status === 200) {
                      console.log('Heater on');
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
            default:
                break;
        }
    };

    const turnOffDevice =  async (index) => {
        console.log('Turning off device')
        const updatedDeviceData = [...deviceData];
        updatedDeviceData[index].state = false;
        setDeviceData(updatedDeviceData);
        const deviceName = deviceData[index].name
        switch(deviceName){
            case "Desk Lamp":
                try{
                    setLoading(true);
                    const response = await axios.get('http://172.18.176.32:4000/toggleDevice-deskLamp-off');
                    if (response.status === 200) {
                      console.log('Desk Lamp OFF');
                      setImageData(response.data);
                    }else {
                      console.error('Failed to turn off ');
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
                    const response = await axios.get('http://172.18.176.32:4000/toggleDevice-fan-off');
                    if (response.status === 200) {
                      console.log('Fan OFF');
                      setImageData(response.data);
                    }else {
                      console.error('Failed to turn off ');
                    }
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
                    if (response.status === 200) {
                      console.log('Heater OFF');
                      setImageData(response.data);
                    }else {
                      console.error('Failed to turn off ');
                    }
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
        <View style={devices.container}>
            <ImageBackground source={backgroundImage} style={devices.backgroundImage}>
                <View style={devices.overlay}></View>
                <View style={devices.content}>
                    <Text style={devices.title}>Your Devices</Text>
                    <ScrollView contentContainerStyle={devices.deviceGrid}>
                        {deviceData.map((device, index) => (
                            <TouchableOpacity key={index}>
                                <View style={devices.deviceCard}>
                                    <MaterialCommunityIcons name={device.icon} size={24} color="black" />
                                    <Text style={devices.deviceName}>{device.name}</Text>
                                    {device.name === "Camera" ? (
                                        <TouchableOpacity onPress={() => takePhoto(index)} style={devices.button}>
                                            <Text style={devices.buttonText}>Take Photo</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View style={devices.deviceControls}>
                                            <TouchableOpacity onPress={() => turnOnDevice(index)} style={device.state ? devices.buttonOn : devices.buttonOff}>
                                                <Text style={devices.buttonText}>On</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => turnOffDevice(index)} style={device.state ? devices.buttonOff : devices.buttonOn}>
                                                <Text style={devices.buttonText}>Off</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View>
                        <TouchableOpacity onPress={() => console.log('+ Add Device')} style={[devices.button]}>
                            <Text style={devices.buttonText}>+ Add Device</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

export default Devices;
