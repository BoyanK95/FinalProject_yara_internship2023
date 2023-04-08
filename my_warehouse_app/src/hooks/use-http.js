import { useState, useEffect } from 'react';
import axios from 'axios';

function useHttp(url, method = 'GET', body = null) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios({
                    method: method,
                    url: url,
                    data: body
                });
                if (mounted) {
                    setData(response.data);
                    setIsLoading(false);
                }
            } catch (error) {
                if (mounted) {
                    setError(error);
                    setIsLoading(false);
                }
            }
        };
        fetchData();

        return () => {
            mounted = false;
        };
    }, [url, method, body]);

    return { data, error, isLoading };
}

export default useHttp