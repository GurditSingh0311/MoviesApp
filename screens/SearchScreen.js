import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { fetchData } from '../api';
import MediaList from '../components/MediaList';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('movie');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('Enter a search term');

  const handleSearch = async () => {
    if (!query.trim()) { setMessage('Search input cannot be empty'); setResults([]); return; }
    const data = await fetchData(`/search/${type}?query=${query}`);
    if (data && data.results) { setResults(data.results); setMessage(''); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Movie/TV Name</Text>
      <TextInput
        placeholder="Enter search term"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
        {['movie', 'multi'].map((t) => (
          <Button key={t} title={t.toUpperCase()} onPress={() => setType(t)} />
        ))}
      </View>
      <Button title="Search" onPress={handleSearch} />
      {message ? <Text style={{ marginTop: 10 }}>{message}</Text> : null}
      <MediaList data={results} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: '#fff' },
  heading: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  input: { borderWidth: 1, padding: 5, marginHorizontal: 10, borderRadius: 5, marginBottom: 10 },
});
