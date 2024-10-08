import React, { useState } from 'react';
import { View, TextInput, ImageBackground, TouchableOpacity, Text } from 'react-native';
import credentials from '../Styles/stylingLogIn';
import backgroundImage from '../Media/background.jpg';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {

    if (username === 'admin' && password === 'admin') {
      onLogin(); 
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <View style={credentials.container}>
      <ImageBackground source={backgroundImage} style={credentials.backgroundImage}>
        <Text style={credentials.title}>Log-In</Text>
        <TextInput
          style={credentials.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={credentials.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={credentials.button} onPress={handleLogin}>
          <Text style={credentials.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={credentials.button}>
          <Text style={credentials.buttonText}>Forgot Credentials?</Text>
        </TouchableOpacity>    
      </ImageBackground>
    </View>
  );
};

export default LoginPage;
