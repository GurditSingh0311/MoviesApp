import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MediaList from '../components/MediaList';
import { fetchData } from '../api';

export default function MovieScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('now_playing');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const options = [
    { label: 'Now Playing', value: 'now_playing' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ];

  const loadMovies = async () => {
    setLoading(true);
    const data = await fetchData(`/movie/${type}`);
    if (data && data.results) setMovies(data.results);
    setLoading(false);
  };

  useEffect(() => { loadMovies(); }, [type]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Movies App</Text>

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setDropdownOpen(!dropdownOpen)}
      >
        <Text style={styles.dropdownText}>
          {options.find((o) => o.value === type)?.label || 'Select Category'}
        </Text>
      </TouchableOpacity>

      {dropdownOpen && (
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={type}
            onValueChange={(val) => { setType(val); setDropdownOpen(false); }}
          >
            {options.map((opt) => (
              <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
            ))}
          </Picker>
        </View>
      )}

      {loading ? <ActivityIndicator size="large" style={{ marginTop: 20 }} /> :
        <MediaList data={movies} navigation={navigation} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', backgroundColor: '#001f3f', color: '#fff', padding: 10, textAlign: 'center' },
  dropdownButton: { padding: 10, backgroundColor: '#eee', margin: 10, borderRadius: 5 },
  dropdownText: { fontSize: 16 },
  pickerWrapper: { backgroundColor: '#fff', marginHorizontal: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
});
