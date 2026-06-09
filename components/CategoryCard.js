import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

export default function CategoryCard({ item, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.strCategoryThumb }} style={styles.image} />
      <Text style={styles.name}>{item.strCategory}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.strCategoryDescription}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  description: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
});