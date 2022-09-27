import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/Screens/HomeScreen';
import SettingsScreen from './src/Screens/SettingsScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RootStore } from './src/Store/RootStore';
import { Provider } from 'mobx-react';
import { View } from 'react-native';


export const rootStore = new RootStore();
const Tab = createBottomTabNavigator();

export default function App() {
  return (

    <Provider {...rootStore}>
       <HomeScreen
        notesStore={rootStore.notesStore}
       ></HomeScreen>
       <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }:{route:any}) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'cog' : 'cog';
            }
            return <FontAwesome name={iconName ?? "home"} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
      </Provider>

  );
}