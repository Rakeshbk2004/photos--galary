import PhotoCard from "./PhotoCard";

export default function Gallery({ photos, favourites, toggleFavourite }) {
  if (!photos.length) {
    return (
      <p className="text-center text-sm text-gray-500">
        No photos match your search.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavourite={favourites.includes(photo.id)}
          onToggleFavourite={() => toggleFavourite(photo.id)}
        />
      ))}
    </div>
  );
}
