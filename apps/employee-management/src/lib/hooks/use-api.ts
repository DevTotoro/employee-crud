import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { apiFetch } from '~/lib/api';

interface Props {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown>;

  errorMessages?: Record<number, string>;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const useApi = <T>({ endpoint, method, body, errorMessages }: Props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const res = await apiFetch<T>(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      setLoading(false);

      if (!res.success) {
        toast.error(errorMessages?.[res.statusCode] ?? 'An error occured while fetching data');
      } else {
        setData(res.data);
      }
    };

    void fetchData();
  }, []);

  return { loading, data };
};
