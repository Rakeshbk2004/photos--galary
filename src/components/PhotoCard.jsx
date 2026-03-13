export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/70 shadow-sm transition hover:shadow-lg focus-within:ring-2 focus-within:ring-indigo-500">
      <div className="relative overflow-hidden">
        <img
          src={photo.download_url}
          alt={photo.author}
          loading="lazy"
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

        <button
          type="button"
          onClick={onToggleFavourite}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/80 text-gray-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label={
            isFavourite ? "Remove from favourites" : "Add to favourites"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={isFavourite ? "h-5 w-5 text-pink-600" : "h-5 w-5"}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3 9.24 3 10.91 3.81 12 5.09 13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <p className="text-sm font-semibold text-gray-900">{photo.author}</p>
        <p className="mt-1 text-xs text-gray-500">Photo ID: {photo.id}</p>
      </div>
    </article>
  );
}
