import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomePage from './Pages/homePage';
import Devices from './Pages/devices';
import Settings from './Pages/settings';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import LoginPage from './Pages/LogInPage'; 

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
              return <AntDesign name={iconName} size={24} color={color} />;
            } else if (route.name === 'Devices') {
              iconName = 'device';
              return <MaterialIcons name="devices" size={24} color={color} />;
            } else if (route.name === 'Settings') {
              iconName = 'settings';
              return <SimpleLineIcons name="settings" size={24} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Devices" component={Devices} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;