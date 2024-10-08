import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput } from "react-native"; 
import { settings } from '../Styles/stylingSettings';
import backgroundImage from '../Media/background.jpg';
import axios from 'axios';

const Settings = ({ navigation }) => {

  const logOut = () => {
    navigation.navigate('LoginPage'); 
  }

  const turnOffAll = async () => {
    try {
      const response = await axios.get('http://172.18.176.32:4000/toggleDevice-allOff');
      if (response.status === 200) {
        console.log('All devices turned off successfully');
      } else {
        console.error('Failed to turn off devices');
      }
    } catch (error) {
      console.error("ERROR : ", error);
    }
  }

  return (
    <View style={settings.container}>
      <ImageBackground source={backgroundImage} style={settings.backgroundImage}>
        <View style={settings.overlay} />
        <View style={settings.content}>
          <Text style={settings.title}>Settings</Text>
          <View style={settings.formContainer}>
            <View style={settings.inputGroup}>
              <Text style={settings.label}>Username:</Text>
              <TextInput style={settings.input} placeholder="Enter New Username" />
            </View>
            <View style={settings.inputGroup}>
              <Text style={settings.label}>Password:</Text>
              <TextInput style={settings.input} placeholder="Enter New Password" secureTextEntry={true} />
            </View>
            <View style={settings.inputGroup}>
              <Text style={settings.label}>Confirm Password:</Text>
              <TextInput style={settings.input} placeholder="Confirm New Password" secureTextEntry={true} />
            </View>
            <TouchableOpacity style={settings.button}>
              <Text style={settings.buttonText}>Update Credentials</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={settings.logoutButton} onPress={logOut}>
            <Text style={settings.buttonText}>Log-out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={settings.turnOffButton} onPress={turnOffAll}>
            <Text style={settings.buttonText}>Turn Off All Devices</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Settings;
