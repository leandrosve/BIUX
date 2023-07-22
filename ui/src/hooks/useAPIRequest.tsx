import React, { useEffect, useState } from 'react';
import { APIResponse } from '../services/api/APIService';

const useAPIRequest = <T,>(fetchFunc: () => Promise<APIResponse<T>>, deps: any[]) => {
  const [data, setData] = useState<T>(); // Original
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const retrieveData = async () => {
    setLoading(true);
    const res = await fetchFunc();
    setLoading(false);
    if (res.hasError) {
      setError(res.errorMessage || 'Algo salió mal');
      return;
    }
    setData(res.data);
  };

  useEffect(() => {
    retrieveData();
  }, [...deps]);

  return { data, loading, error };
};

export default useAPIRequest;
