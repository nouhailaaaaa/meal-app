import React, { useState, useEffect } from 'react';
import {
  View, FlatList, ActivityIndicator,
  Text, StyleSheet
} from 'react-native';
import CategoryCard from '../components/CategoryCard';

export default function CategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/categories.php'
      );
      const data = await response.json();
      setCategories(data.categories);
    } catch (err) {
      setError('Erreur réseau. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retry} onPress={fetchCategories}>
          🔄 Réessayer
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        renderItem={({ item }) => (
          <CategoryCard
            item={item}
            onPress={() =>
              navigation.navigate('Meals', {
                categoryName: item.strCategory,
              })
            }
          />
        )}
        contentContainerStyle={{ padding: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: { marginTop: 12, color: '#777', fontSize: 15 },
  errorText:   { color: 'red', fontSize: 15, textAlign: 'center', margin: 20 },
  retry:       { color: '#FF6B35', fontSize: 16, fontWeight: 'bold', marginTop: 12 },
});