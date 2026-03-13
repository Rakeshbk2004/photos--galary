export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-6">
      <label className="sr-only" htmlFor="search">
        Search photos by author
      </label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by author..."
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  );
}
