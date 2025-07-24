import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TrendsApi, TrendResult, TrendsApiResponse, RelatedQuery } from '../services/trendsApi';
import { TrendsChart } from '../components/TrendsChart';
import { useTheme } from '../theme/ThemeContext';

interface RelatedQueriesData {
  top: Array<{query: string, value: number}>;
  rising: Array<{query: string, value: string}>;
}

export const TrendsScreen: React.FC = () => {
  const [trendsData, setTrendsData] = useState<TrendsApiResponse<TrendResult[]> | null>(null);
  const [relatedQueries, setRelatedQueries] = useState<RelatedQueriesData>({ top: [], rising: [] });
  const [searchQuery, setSearchQuery] = useState('print on demand');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const fetchTrendsData = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch trends data first
      const trends = await TrendsApi.getInterestOverTime(query);
      setTrendsData(trends);
      
      try {
        // Try to fetch related queries, but don't fail if this fails
        const queries = await TrendsApi.getRelatedQueries(query);
        if (queries && queries.data) {
          setRelatedQueries(queries.data);
        } else {
          console.warn('Related queries data is not in expected format:', queries);
          setRelatedQueries({ top: [], rising: [] });
        }
      } catch (queryError) {
        console.warn('Failed to fetch related queries:', queryError);
        setRelatedQueries({ top: [], rising: [] });
      }
    } catch (error) {
      console.error('Error fetching trends data:', error);
      setError('Failed to fetch trends data. Please try again.');
      setTrendsData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchTrendsData(searchQuery.trim());
    }
  };

  useEffect(() => {
    fetchTrendsData(searchQuery);
  }, []);

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Enter search term..."
        placeholderTextColor="#666"
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <TouchableOpacity 
        style={styles.searchButton} 
        onPress={handleSearch}
        activeOpacity={0.7}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRelatedQueries = () => (
    <View style={styles.relatedQueriesContainer}>
      <Text style={styles.subtitle}>Related Searches</Text>
      {(relatedQueries.top.length > 0 || relatedQueries.rising.length > 0) ? (
        <View style={styles.queriesContainer}>
          {relatedQueries.top.map((item, index) => (
            <TouchableOpacity 
              key={`top-${index}`}
              style={styles.queryItem}
              onPress={() => {
                setSearchQuery(item.query);
                fetchTrendsData(item.query);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.queryText}>{item.query}</Text>
              <Text style={styles.queryValue}>{item.value}</Text>
            </TouchableOpacity>
          ))}
          {relatedQueries.rising.map((item, index) => (
            <TouchableOpacity 
              key={`rising-${index}`}
              style={[styles.queryItem, styles.risingQueryItem]}
              onPress={() => {
                setSearchQuery(item.query);
                fetchTrendsData(item.query);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.queryText}>{item.query}</Text>
              <Text style={[styles.queryValue, styles.risingValue]}>{item.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.noDataText}>No related searches found</Text>
      )}
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} bounces={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Market Research</Text>
        {renderSearchBar()}
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <View style={styles.chartSection}>
            <Text style={styles.subtitle}>Trends Over Time</Text>
            <TrendsChart data={trendsData} loading={loading} />
          </View>
          {!loading && !error && renderRelatedQueries()}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
    color: '#000',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  chartSection: {
    padding: 16,
  },
  relatedQueriesContainer: {
    padding: 16,
    paddingTop: 0,
  },
  queriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  queryItem: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  risingQueryItem: {
    backgroundColor: '#f0f8ff',
  },
  queryText: {
    color: '#000',
    fontSize: 14,
  },
  queryValue: {
    color: '#666',
    fontSize: 12,
  },
  risingValue: {
    color: '#2ecc71',
  },
  noDataText: {
    color: '#666',
    fontStyle: 'italic',
  },
  errorText: {
    color: '#ff3b30',
    textAlign: 'center',
    padding: 16,
    fontSize: 16,
  },
});

export default TrendsScreen;
