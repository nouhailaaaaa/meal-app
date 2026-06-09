import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from './screens/CategoriesScreen';
import MealsScreen from './screens/MealsScreen';
import MealDetailScreen from './screens/MealDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#FF6B35' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ title: '🍽️ Catégories' }}
        />
        <Stack.Screen
          name="Meals"
          component={MealsScreen}
          options={({ route }) => ({ title: route.params.categoryName })}
        />
        <Stack.Screen
          name="MealDetail"
          component={MealDetailScreen}
          options={({ route }) => ({ title: route.params.mealName })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}