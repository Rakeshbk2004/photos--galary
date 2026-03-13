import { useEffect, useState } from "react";

const BASE_URL = "https://picsum.photos/v2/list";

export default function useFetchPhotos(page = 1) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `${BASE_URL}?limit=30&page=${page}`;
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message ?? "Failed to fetch photos");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();

    return () => controller.abort();
  }, [page]);

  return { photos, loading, error };
}
