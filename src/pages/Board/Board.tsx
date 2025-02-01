import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBoardById } from "../../redux/boards/operations";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCardsByBoard } from "../../redux/cards/operations";
import { selectCards } from "../../redux/cards/selectors";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { HiPencilAlt } from "react-icons/hi";

const Board = () => {
  const params = useParams();
  const id = params.id as string;
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectCards);
  const todo = cards.filter((card) => card.status === "ToDo");
  const progress = cards.filter((card) => card.status === "In Progress");
  const done = cards.filter((card) => card.status === "Done");

  useEffect(() => {
    dispatch(getBoardById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getCardsByBoard(id));
  }, [dispatch, id]);

  return (
    <div className="p-4">
      <ul className="flex justify-between">
        <li className="text-center">
          <h3 className="text-xl mb-2.5">ToDo</h3>
          <ul className="bg-gray-200 p-4 h-dvh w-[400px] overflow-y-auto flex flex-col gap-[20px] items-center">
            {todo &&
              todo.map((card) => (
                <li
                  key={card._id}
                  className="bg-gray-300 w-full h-[200px] p-[20px] text-left relative"
                >
                  <p className="font-medium mb-[20px]">{card.title}</p>
                  <p>{card.description}</p>
                  <div className="absolute bottom-[20px] right-[20px] flex gap-2.5">
                    <button type="button">
                      <HiPencilAlt className="w-[20px] h-[20px] hover:fill-blue-400" />
                    </button>
                    <button type="button">
                      <FaTrashCan className="w-[20px] h-[20px] hover:fill-red-500" />
                    </button>
                  </div>
                </li>
              ))}
            <li className="bg-gray-300 w-full h-[200px] relative">
              <FaPlus className="w-[20px] h-[20px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" />
            </li>
          </ul>
        </li>
        <li className="text-center">
          <h3 className="text-xl mb-2.5">In progress</h3>
          <ul className="bg-gray-200 p-4 h-dvh w-[400px] overflow-y-auto flex flex-col gap-[20px] items-center">
            {progress &&
              progress.map((card) => (
                <li
                  key={card._id}
                  className="bg-gray-300 w-full h-[200px] p-[20px] text-left relative"
                >
                  <p className="font-medium mb-[20px]">{card.title}</p>
                  <p>{card.description}</p>
                  <div className="absolute bottom-[20px] right-[20px] flex gap-2.5">
                    <button type="button">
                      <HiPencilAlt className="w-[20px] h-[20px] hover:fill-blue-400" />
                    </button>
                    <button type="button">
                      <FaTrashCan className="w-[20px] h-[20px] hover:fill-red-500" />
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </li>
        <li className="text-center">
          <h3 className="text-xl mb-2.5">Done</h3>
          <ul className="bg-gray-200 p-4 h-dvh w-[400px] overflow-y-auto flex flex-col gap-[20px] items-center">
            {done &&
              done.map((card) => (
                <li
                  key={card._id}
                  className="bg-gray-300 w-full h-[200px] p-[20px] text-left relative"
                >
                  <p className="font-medium mb-[20px]">{card.title}</p>
                  <p>{card.description}</p>
                  <div className="absolute bottom-[20px] right-[20px] flex gap-2.5">
                    <button type="button">
                      <HiPencilAlt className="w-[20px] h-[20px] hover:fill-blue-400" />
                    </button>
                    <button type="button">
                      <FaTrashCan className="w-[20px] h-[20px] hover:fill-red-500" />
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Board;
