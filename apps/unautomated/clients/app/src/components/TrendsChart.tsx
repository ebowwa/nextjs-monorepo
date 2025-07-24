import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { TrendResult, TrendsApiResponse } from '../services/trendsApi';

interface TrendsChartProps {
  data?: TrendsApiResponse<TrendResult[]>;
  loading?: boolean;
}

export const TrendsChart: React.FC<TrendsChartProps> = ({ data, loading }) => {
  const { width: windowWidth } = useWindowDimensions();
  // Increase left and right padding
  const chartWidth = windowWidth - 48;

  if (loading) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Loading chart data...</Text>
      </View>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>No trend data available</Text>
      </View>
    );
  }

  // Process data for the chart
  const processedData = {
    labels: data.data
      .map(d => d.timestamp)
      // Show fewer labels on smaller screens
      .filter((_, i) => i % Math.ceil(data.data.length / (chartWidth < 350 ? 3 : 5)) === 0)
      // Format the date to be more compact
      .map(date => {
        const [year, month] = date.split('-');
        return `${month}/${year.slice(2)}`;
      }),
    datasets: [{
      data: data.data.map(d => d.value),
      color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
      strokeWidth: 2,
    }],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#0066cc',
    },
  };

  return (
    <View style={styles.container}>
      {data.source === 'cache' && (
        <Text style={styles.cacheIndicator}>Using cached data</Text>
      )}
      <LineChart
        data={processedData}
        width={chartWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        withDots={chartWidth >= 350}
        withShadow={false}
        withInnerLines={false}
        withOuterLines={true}
        withVerticalLines={false}
        withHorizontalLines={true}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        fromZero={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  placeholder: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  placeholderText: {
    color: '#666666',
    fontSize: 16,
  },
  cacheIndicator: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 4,
  },
});
