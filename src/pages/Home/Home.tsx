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
import { useNavigate } from "react-router-dom";

const Home = () => {
  const boards = useAppSelector(selectBoards);
  const dispatch = useAppDispatch();
  const [formMode, setFormMode] = useState<string>("add");
  const [boardData, setBoardData] = useState<Board>();
  const navigate = useNavigate();

  const { isOpen, openModal, closeModal } = useModal(false);

  const handleOpenAdd = () => {
    openModal();
    setFormMode("add");
  };

  const handleDeleteBoard = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();
    if (id) {
      dispatch(deleteBoard(id));
    }
  };

  const handleOpenEdit = (
    e: React.MouseEvent<HTMLButtonElement>,
    board: Board
  ) => {
    e.stopPropagation();
    openModal();
    setFormMode("edit");
    setBoardData(board);
  };

  return (
    <div className="p-4">
      <button
        className="mt-7 inlibe-flex rounded-full p-2 bg-gray-400 hover:bg-gray-500 hover:shadow-md transition duration-300"
        type="button"
        onClick={handleOpenAdd}
      >
        <FaPlus className="fill-white w-[20px] h-[20px]" />
      </button>
      <ul className="mt-4 flex gap-[20px] flex-wrap items-center justify-between">
        {boards &&
          boards.map((board) => {
            return (
              <li
                className="w-full h-[200px] md:flex-1 md:min-w-[200px] p-2.5 bg-gray-200 relative flex flex-col items-center justify-center hover:scale-105 hover:shadow-lg transition duration-300"
                key={board._id}
                data-id={board._id}
                onClick={() => navigate(`board/${board._id}`)}
              >
                <p className="text-sm text-gray-500 absolute top-1 left-1 italic">
                  {board._id}
                </p>
                <div className="text-md font-bold">{board.name}</div>
                <div className="absolute bottom-[10px] flex gap-2.5">
                  <button
                    type="button"
                    onClick={(e) => handleOpenEdit(e, board)}
                  >
                    <HiPencilAlt className="w-[20px] h-[20px] hover:fill-blue-400 transition duration-300" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteBoard(e, board._id)}
                  >
                    <FaTrashCan className="w-[20px] h-[20px] hover:fill-red-500 transition duration-300" />
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
