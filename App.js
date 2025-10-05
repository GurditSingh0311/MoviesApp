import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MovieScreen from './screens/MovieScreen';
import SearchScreen from './screens/SearchScreen';
import TvScreen from './screens/TvScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();

function Home({ navigation }) {
  const [activeTab, setActiveTab] = useState('Movies'); // 'Movies' | 'Search' | 'TV'

  const renderTab = () => {
    if (activeTab === 'Movies') return <MovieScreen navigation={navigation} />;
    if (activeTab === 'Search') return <SearchScreen navigation={navigation} />;
    if (activeTab === 'TV') return <TvScreen navigation={navigation} />;
    return null;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Movies App</Text>
      </View>

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Movies' && styles.tabActive]}
          onPress={() => setActiveTab('Movies')}
        >
          <Text style={[styles.tabText, activeTab === 'Movies' && styles.tabTextActive]}>Movies</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Search' && styles.tabActive]}
          onPress={() => setActiveTab('Search')}
        >
          <Text style={[styles.tabText, activeTab === 'Search' && styles.tabTextActive]}>Search Results</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'TV' && styles.tabActive]}
          onPress={() => setActiveTab('TV')}
        >
          <Text style={[styles.tabText, activeTab === 'TV' && styles.tabTextActive]}>TV Shows</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        {renderTab()}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerBackTitle: 'Back to List',
            // title will be set dynamically in DetailsScreen after fetch
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#001f3f',
    paddingVertical: 12,
    alignItems: 'center',
  },
  headerText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  tabButton: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabText: { color: '#666' },
  tabActive: { borderBottomColor: '#001f3f', borderBottomWidth: 3, backgroundColor: '#fff' },
  tabTextActive: { color: '#001f3f', fontWeight: 'bold' },
});
