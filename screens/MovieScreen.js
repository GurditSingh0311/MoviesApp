import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import MediaList from '../components/MediaList';
import { fetchData } from '../api';

export default function MovieScreen({ navigation }) {
  const [type, setType] = useState('popular'); // default as screenshot shows popular search results
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const options = [
    { label: 'Popular', value: 'popular' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Now Playing', value: 'now_playing' },
  ];

  const load = async (cat) => {
    setLoading(true);
    const data = await fetchData(`/movie/${cat}`);
    if (data && data.results) setMovies(data.results);
    else setMovies([]);
    setLoading(false);
  };

  useEffect(() => {
    load(type);
  }, [type]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.dropdownButton} onPress={() => setDropdownOpen(!dropdownOpen)}>
          <Text style={styles.dropdownText}>{options.find(o => o.value === type)?.label || 'Select'}</Text>
        </TouchableOpacity>

        {dropdownOpen && (
          <View style={styles.dropdownList}>
            {options.map(opt => (
              <TouchableOpacity key={opt.value} style={styles.dropdownItem} onPress={() => { setType(opt.value); setDropdownOpen(false); }}>
                <Text>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {loading ? <ActivityIndicator size="large" style={{ marginTop: 20 }} /> : <MediaList data={movies} navigation={navigation} mediaType="movie" />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  controls: { padding: 12 },
  dropdownButton: { padding: 10, backgroundColor: '#fff', borderRadius: 6, borderWidth: 1, borderColor: '#ddd' },
  dropdownText: { fontSize: 16 },
  dropdownList: { marginTop: 8, backgroundColor: '#fff', borderRadius: 6, borderWidth: 1, borderColor: '#ddd' },
  dropdownItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
});
