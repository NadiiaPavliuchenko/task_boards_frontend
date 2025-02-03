import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleOpenBoard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const boardId = form.elements.namedItem("query") as HTMLInputElement;
    navigate(`board/${boardId.value}`);
    form.reset();
  };

  return (
    <div className="p-3">
      <form className="w-full flex gap-3" onSubmit={(e) => handleOpenBoard(e)}>
        <label htmlFor="query"></label>
        <input
          type="text"
          name="query"
          placeholder="Enter board ID..."
          className="w-full px-2 py-5 h-7 border border-solid border-gray-400 rounded-sm"
        />
        <button
          className="bg-gray-300 h-7 px-4 py-5 rounded-md text-sm inline-flex items-center"
          type="submit"
        >
          Load
        </button>
      </form>
    </div>
  );
};

export default Header;
