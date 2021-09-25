import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import MascotDetails from './screens/MascotDetails';
import { createStackNavigator } from '@react-navigation/stack';
import { fetchMascots } from './ApiClientService';
const Stack = createStackNavigator();

export default function App() {
  const [mascots, setMascots] = useState([]);
  const [filteredMascots, setFilteredMascots] = useState(mascots);

  async function getMascots() {
    const result = await fetchMascots();

    const sorted = result.sort((a, b) => {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setMascots(sorted);
  }

  useEffect(() => {
    getMascots();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home">
          {(props) => (
            <Home
              mascots={mascots}
              filteredMascots={filteredMascots}
              setFilteredMascots={setFilteredMascots}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="MascotDetails" component={MascotDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
