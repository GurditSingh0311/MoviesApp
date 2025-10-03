import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function DetailsScreen({ route }) {
  const { item } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.title || item.name}</Text>
      <Text style={styles.detail}>Release Date: {item.release_date || item.first_air_date}</Text>
      <Text style={styles.detail}>Popularity: {item.popularity}</Text>
      <Text style={styles.detail}>Overview: {item.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  image: { width: 300, height: 450, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  detail: { fontSize: 16, marginBottom: 10, textAlign: 'center' },
});
