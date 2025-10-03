import React from 'react';
import { View, Text, Image, Button, FlatList, StyleSheet } from 'react-native';

export default function MediaList({ data, navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title || item.name}</Text>
        <Text>Popularity: {item.popularity}</Text>
        <Text>Release: {item.release_date || item.first_air_date}</Text>
        <Button
          title="More Details"
          color="#1E90FF"
          onPress={() => navigation.navigate('Details', { item })}
        />
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', marginVertical: 10, paddingHorizontal: 10 },
  image: { width: 100, height: 150, borderRadius: 5 },
  info: { flex: 1, paddingLeft: 10, justifyContent: 'space-between' },
  title: { fontWeight: 'bold', fontSize: 16 },
});
