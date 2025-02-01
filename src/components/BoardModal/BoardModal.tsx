import { IoClose } from "react-icons/io5";
import { useAppDispatch } from "../../hooks";
import { createBoard, updateBoard } from "../../redux/boards/operations";
import { Board } from "../../redux/boards/board.types";

type Props = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  boardData?: Board;
};

const BoardModal: React.FC<Props> = ({
  isModalOpen,
  handleCloseModal,
  boardData
}) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.namedItem("name") as HTMLInputElement;

    if (boardData) {
      const data = {
        _id: boardData?._id,
        name: name.value
      };
      dispatch(updateBoard(data));
    } else {
      const data = {
        name: name.value
      };
      dispatch(createBoard(data));
    }
    form.reset();
    handleCloseModal();
  };

  return (
    isModalOpen && (
      <div
        className="bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 w-full h-full z-0"
        onClick={handleCloseModal}
      >
        <div
          className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] rounded-xl p-5 min-h-[200px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl">Board</h3>
            <button
              className="inline-flex items-center"
              type="button"
              onClick={handleCloseModal}
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>
          <form
            className="mt-4 flex gap-3 flex-col"
            onSubmit={(e) => handleSubmit(e)}
          >
            <p id="hashedId">Board id: {boardData?._id}</p>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter board`s name..."
              className="border border-gray-400 rounded-sm p-3"
              defaultValue={boardData ? boardData.name : ""}
            />
            <button
              type="submit"
              className="bg-gray-300 h-9 w-20 px-4 py-4 rounded-md text-sm inline-flex items-center justify-center self-end"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default BoardModal;
