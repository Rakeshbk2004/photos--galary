import { useState, useReducer, useMemo, useCallback, useEffect } from "react";
import useFetchPhotos from "./hooks/useFetchPhotos";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";
import { favouriteReducer } from "./reducer/favouriteReducer";

function App() {
  // Page state (used to fetch a different set of photos)
  const [page, setPage] = useState(1);

  // Fetch photos using custom hook
  const { photos, loading, error } = useFetchPhotos(page);

  // Search state
  const [search, setSearch] = useState("");

  // Favourite reducer with localStorage persistence
  const [favourites, dispatch] = useReducer(favouriteReducer, [], () => {
    try {
      const stored = localStorage.getItem("favourites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save favourites to localStorage
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // Toggle favourite using useCallback
  const toggleFavourite = useCallback((id) => {
    dispatch({
      type: "TOGGLE_FAV",
      payload: id,
    });
  }, []);

  // Search input handler (useCallback required for assignment)
  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  // Reload photos (fetch a different page of the API)
  const reloadPhotos = useCallback(() => {
    setPage((prev) => (prev >= 10 ? 1 : prev + 1));
  }, []);

  // Filter photos using useMemo
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase()),
    );
  }, [photos, search]);

  // Loading state
  if (loading) {
    return <h2 className="text-center mt-10 text-xl">Loading photos...</h2>;
  }

  // Error state
  if (error) {
    return <h2 className="text-center mt-10 text-red-500">Error: {error}</h2>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-indigo-900 sm:text-5xl">
            Photo Gallery
          </h1>
          <p className="mt-4 text-sm text-gray-600 sm:text-base">
            Browse and favourite photos fetched from a public API. Use the
            search box to filter by author and hit the button to load a new set
            of photos.
          </p>
        </header>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={search} onChange={handleSearch} />

          <button
            type="button"
            onClick={reloadPhotos}
            className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Load different photos
          </button>
        </div>

        <div className="mt-8">
          <Gallery
            photos={filteredPhotos}
            favourites={favourites}
            toggleFavourite={toggleFavourite}
          />
        </div>

        <footer className="mt-12 text-center text-xs text-gray-400">
          Photos provided by{" "}
          <a
            className="underline"
            href="https://picsum.photos"
            target="_blank"
            rel="noreferrer"
          >
            picsum.photos
          </a>
          .
        </footer>
      </div>
    </main>
  );
}

export default App;
