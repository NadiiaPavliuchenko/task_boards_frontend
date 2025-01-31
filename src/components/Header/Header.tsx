const Header = () => {
  return (
    <div className="p-3">
      <form className="w-full flex gap-3">
        <label htmlFor="query"></label>
        <input
          type="text"
          name="query"
          placeholder="Enter board id..."
          className="w-full px-2 py-4 h-7 border border-solid border-gray-400 rounded-sm"
        />
        <button
          className="bg-gray-300 h-7 px-4 py-4 rounded-md text-sm inline-flex items-center"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Header;
