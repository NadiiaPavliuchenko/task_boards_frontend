import { useAppDispatch, useAppSelector } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import { selectBoards } from "../../redux/boards/selectors";
import { FaPlus } from "react-icons/fa6";
import { HiPencilAlt } from "react-icons/hi";
import { FaTrashCan } from "react-icons/fa6";
import BoardModal from "../../components/BoardModal";
import { deleteBoard } from "../../redux/boards/operations";
import { useState } from "react";
import { Board } from "../../redux/boards/board.types";

const Home = () => {
  const boards = useAppSelector(selectBoards);
  const dispatch = useAppDispatch();
  const [formMode, setFormMode] = useState<string>("add");
  const [boardData, setBoardData] = useState<Board>();

  const { isOpen, openModal, closeModal } = useModal(false);

  const handleOpenAdd = () => {
    openModal();
    setFormMode("add");
  };

  const handleDeleteBoard = (id: string) => {
    if (id) {
      dispatch(deleteBoard(id));
    }
  };

  const handleOpenEdit = (board: Board) => {
    openModal();
    setFormMode("edit");
    setBoardData(board);
  };

  return (
    <div className="p-4">
      <button
        className="mt-7 inlibe-flex rounded-full p-2 bg-gray-400"
        type="button"
        onClick={handleOpenAdd}
      >
        <FaPlus className="fill-white w-[20px] h-[20px]" />
      </button>
      <ul className="mt-4 flex gap-[20px] flex-wrap items-center">
        {boards.map((board) => {
          return (
            <li
              className="w-[190px] h-[190px] p-2.5 bg-gray-200 relative flex flex-col items-center justify-center"
              key={board._id}
              data-id={board._id}
            >
              <p className="text-sm text-gray-500 absolute top-1 left-1">
                {board.hashedId}
              </p>
              <div className="text-md">{board.name}</div>
              <div className="absolute bottom-[10px] flex gap-2.5">
                <button type="button" onClick={() => handleOpenEdit(board)}>
                  <HiPencilAlt className="w-[20px] h-[20px]" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteBoard(board._id)}
                >
                  <FaTrashCan className="w-[20px] h-[20px] hover:fill-red-500" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {formMode === "add" ? (
        <BoardModal isModalOpen={isOpen} handleCloseModal={closeModal} />
      ) : (
        <BoardModal
          isModalOpen={isOpen}
          handleCloseModal={closeModal}
          boardData={boardData}
        />
      )}
    </div>
  );
};

export default Home;
