import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchData } from '../api';

export default function DetailsScreen({ route, navigation }) {
  const { id, mediaType } = route.params; // we pass only id + mediaType
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const path = mediaType === 'tv' ? `/tv/${id}` : `/movie/${id}`;
      const data = await fetchData(path);
      if (data) {
        setItem(data);
        navigation.setOptions({ title: data.title || data.name || 'Details' });
      }
      setLoading(false);
    };
    load();
  }, [id, mediaType]);

  if (loading) return <ActivityIndicator style={{ marginTop: 30 }} size="large" />;

  if (!item) return <View style={{ padding: 20 }}><Text>Details not available</Text></View>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {item.poster_path ? (
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
      ) : null}
      <Text style={styles.title}>{item.title || item.name}</Text>
      <Text style={styles.overview}>{item.overview || 'No overview available.'}</Text>
      <Text style={styles.meta}>Popularity: {item.popularity}</Text>
      <Text style={styles.meta}>Release Date: {item.release_date || item.first_air_date || 'N/A'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', backgroundColor: '#fff' },
  image: { width: 260, height: 380, borderRadius: 8, marginBottom: 18 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  overview: { fontSize: 16, color: '#444', lineHeight: 22, marginBottom: 16, textAlign: 'left' , alignSelf: 'stretch'},
  meta: { fontSize: 14, color: '#333', marginTop: 6 },
});
