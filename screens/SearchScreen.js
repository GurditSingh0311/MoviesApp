import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { fetchData } from '../api';
import MediaList from '../components/MediaList';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('multi'); // default as screenshot
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('Please initiate a search');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false); // indicates user tried to search

  const options = [
    { label: 'Multi', value: 'multi' },
    { label: 'Movie', value: 'movie' },
    { label: 'TV', value: 'tv' },
  ];

  const handleSearch = async () => {
    setTouched(true);
    if (!query.trim()) {
      setMessage('Movie/TV show name is required');
      setResults([]);
      return;
    }
    setMessage('');
    setLoading(true);
    const data = await fetchData(`/search/${type}?query=${encodeURIComponent(query)}`);
    if (data && data.results && data.results.length > 0) {
      setResults(data.results);
    } else {
      setResults([]);
      setMessage('No results found');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 12 }}>
        <Text style={styles.label}>Search Movie/TV Show Name*</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="i.e. James Bond, CSI"
          style={[styles.input, touched && !query.trim() ? styles.inputError : null]}
        />

        <Text style={[styles.label, { marginTop: 12 }]}>Choose Search Type*</Text>

        <TouchableOpacity style={styles.dropdownButton} onPress={() => setOpen(!open)}>
          <Text>{options.find(o => o.value === type)?.label}</Text>
        </TouchableOpacity>

        {open && (
          <View style={styles.dropdownList}>
            {options.map(opt => (
              <TouchableOpacity key={opt.value} style={styles.dropdownItem} onPress={() => { setType(opt.value); setOpen(false); }}>
                <Text>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ marginTop: 12, alignItems: 'flex-start' }}>
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Text style={{ color: '#fff', fontWeight: '600' }}>Search</Text>
          </TouchableOpacity>
        </View>

        {touched && message ? <Text style={styles.errorText}>{message}</Text> : null}
      </View>

      <View style={{ flex: 1, paddingTop: 10 }}>
        {loading ? <ActivityIndicator size="large" /> : (
          results.length > 0 ? <MediaList data={results} navigation={navigation} mediaType={type} />
            : !touched ? <View style={styles.center}><Text style={styles.initText}>Please initiate a search</Text></View>
            : null
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  label: { fontWeight: '600', marginTop: 8, marginBottom: 6, color: '#333' },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#ddd' },
  inputError: { borderColor: '#d9534f' },
  dropdownButton: { backgroundColor: '#fff', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 6 },
  dropdownList: { marginTop: 8, backgroundColor: '#fff', borderRadius: 6, borderWidth: 1, borderColor: '#ddd' },
  dropdownItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  searchBtn: { backgroundColor: '#14a0d4', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 6 },
  errorText: { color: '#d9534f', marginTop: 8 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  initText: { fontSize: 20, fontWeight: '700', color: '#777' },
});
