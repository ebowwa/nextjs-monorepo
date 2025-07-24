import googleTrends from 'google-trends-api';

export interface TrendResult {
  timestamp: string;
  value: number;
}

export class GoogleTrendsService {
  static async getInterestOverTime(keyword: string, startTime?: Date, endTime?: Date): Promise<TrendResult[]> {
    try {
      const result = await googleTrends.interestOverTime({
        keyword,
        startTime: startTime || new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)), // Default to last 7 days
        endTime: endTime || new Date(),
      });

      const data = JSON.parse(result);
      return data.default.timelineData.map((item: any) => ({
        timestamp: item.formattedTime,
        value: item.value[0],
      }));
    } catch (error) {
      console.error('Error fetching Google Trends data:', error);
      throw error;
    }
  }

  static async getRelatedQueries(keyword: string): Promise<string[]> {
    try {
      const result = await googleTrends.relatedQueries({
        keyword,
      });

      const data = JSON.parse(result);
      return data.default.rankedList[0].rankedKeyword.map((item: any) => item.query);
    } catch (error) {
      console.error('Error fetching related queries:', error);
      throw error;
    }
  }

  static async getRealTimeTrends(geo: string = 'US'): Promise<any[]> {
    try {
      const result = await googleTrends.realTimeTrends({
        geo,
        category: 'all',
      });

      return result.storySummaries.trendingStories;
    } catch (error) {
      console.error('Error fetching real-time trends:', error);
      throw error;
    }
  }
}
