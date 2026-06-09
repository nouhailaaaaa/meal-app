import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, ScrollView,
  ActivityIndicator, StyleSheet
} from 'react-native';

export default function MealDetailScreen({ route }) {
  const { mealName } = route.params;

  const [meal, setMeal]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetchMealDetail();
  }, []);

  const fetchMealDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
      );
      const data = await response.json();
      setMeal(data.meals ? data.meals[0] : null);
    } catch (err) {
      setError('Erreur lors du chargement du détail.');
    } finally {
      setLoading(false);
    }
  };

  // Récupère les ingrédients non vides
  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure    = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push(`${measure?.trim()} ${ingredient.trim()}`);
      }
    }
    return ingredients;
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  if (error || !meal) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error || 'Repas introuvable.'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{meal.strMeal}</Text>

        <View style={styles.badges}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🍽️ {meal.strCategory}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🌍 {meal.strArea}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ingrédients</Text>
        {getIngredients(meal).map((ing, index) => (
          <Text key={index} style={styles.ingredient}>• {ing}</Text>
        ))}

        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructions}>{meal.strInstructions}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#f5f5f5' },
  center:       { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image:        { width: '100%', height: 250 },
  content:      { padding: 16 },
  title:        { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  badges:       { flexDirection: 'row', marginBottom: 16, gap: 8 },
  badge:        { backgroundColor: '#FF6B35', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  badgeText:    { color: '#fff', fontSize: 13, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#FF6B35', marginTop: 16, marginBottom: 8 },
  ingredient:   { fontSize: 14, color: '#555', paddingVertical: 2 },
  instructions: { fontSize: 14, color: '#555', lineHeight: 22 },
  errorText:    { color: 'red', fontSize: 15 },
});