// "use client"
// import { useState, useEffect } from 'react';
// import { AnalyticalStatisticsResponse } from '../types/api';
// import { statisticsApi } from '../services/api';

// interface UseAnalyticalStatisticsReturn {
//   data: AnalyticalStatisticsResponse | null;
//   loading: boolean;
//   error: string | null;
//   refetch: () => Promise<void>;
// }

// export const useAnalyticalStatistics = (): UseAnalyticalStatisticsReturn => {
//   const [data, setData] = useState<AnalyticalStatisticsResponse | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const result = await statisticsApi.getAnalyticalStatistics();
//       setData(result);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred while fetching statistics');
//       console.error('Failed to fetch analytical statistics:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const refetch = async () => {
//     await fetchData();
//   };

//   return {
//     data,
//     loading,
//     error,
//     refetch,
//   };
// };












"use client"
import { useState, useEffect, useCallback } from 'react';
import { statisticsApi } from '../services/api';
import { StatisticsState } from '../types/api';

export const useStatistics = (autoFetch: boolean = true) => {
  const [state, setState] = useState<StatisticsState>({
    data: null,
    loading: false,
    error: null
  });

  const fetchStatistics = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await statisticsApi.getAnalyticalStatistics();
      setState({
        data,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'حدث خطأ أثناء تحميل الإحصائيات'
      });
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchStatistics();
  }, [fetchStatistics]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchStatistics();
    }
  }, [autoFetch, fetchStatistics]);

  return {
    ...state,
    refetch,
    isLoading: state.loading
  };
};