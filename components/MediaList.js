import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function MediaList({ data = [], navigation, mediaType }) {
  

  const openDetails = (id, item) => {
    const type = mediaType || item.media_type || 'movie';
    navigation.navigate('Details', { id, mediaType: type });
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Image
        source={
          item.poster_path
            ? { uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }
            : require('../assets/placeholder.png') 
        }
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title || item.name}</Text>
        <Text style={styles.meta}>Popularity: {item.popularity}</Text>
        <Text style={styles.meta}>Release Date: {item.release_date || item.first_air_date || 'N/A'}</Text>

        <TouchableOpacity style={styles.detailsBtn} onPress={() => openDetails(item.id, item)}>
          <Text style={styles.detailsBtnText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!data || data.length === 0) return null;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 30, paddingTop: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  poster: { width: 80, height: 110, borderRadius: 4, backgroundColor: '#ddd' },
  info: { flex: 1, paddingLeft: 12, justifyContent: 'center' },
  title: { fontWeight: '700', fontSize: 16, marginBottom: 6 },
  meta: { color: '#444', marginBottom: 4 },
  detailsBtn: { marginTop: 6, backgroundColor: '#14a0d4', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 6, alignSelf: 'flex-start' },
  detailsBtnText: { color: '#fff', fontWeight: '600' },
});
