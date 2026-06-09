import React, { useState, useEffect } from 'react';
import {
  View, FlatList, ActivityIndicator,
  Text, StyleSheet
} from 'react-native';
import MealCard from '../components/MealCard';

export default function MealsScreen({ route, navigation }) {
  const { categoryName } = route.params;

  const [meals, setMeals]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
      );
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (err) {
      setError('Erreur lors du chargement des repas.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retry} onPress={fetchMeals}>🔄 Réessayer</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{meals.length} repas trouvés</Text>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <MealCard
            item={item}
            onPress={() =>
              navigation.navigate('MealDetail', {
                mealName: item.strMeal,
              })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center:    { flex: 1, justifyContent: 'center', alignItems: 'center' },
  count:     { padding: 16, color: '#777', fontSize: 13 },
  errorText: { color: 'red', fontSize: 15, textAlign: 'center', margin: 20 },
  retry:     { color: '#FF6B35', fontSize: 16, fontWeight: 'bold', marginTop: 12 },
});