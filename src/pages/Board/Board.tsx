import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBoardById } from "../../redux/boards/operations";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCardsByBoard } from "../../redux/cards/operations";
import { selectCards } from "../../redux/cards/selectors";
import CardList from "../../components/CardList";
import CardModal from "../../components/CardModal";
import { useModal } from "../../hooks/useModal";

const Board = () => {
  const params = useParams();
  const id = params.id as string;

  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectCards);

  const todo = cards.filter((card) => card.status === "ToDo");

  const max = todo.reduce((acc, curValue) => {
    return curValue.order > acc ? curValue.order : acc;
  }, 0);

  const progress = cards.filter((card) => card.status === "In Progress");
  const done = cards.filter((card) => card.status === "Done");

  const { isOpen, openModal, closeModal } = useModal(false);

  useEffect(() => {
    dispatch(getBoardById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getCardsByBoard(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="p-4">
        <ul className="flex justify-between">
          {["ToDo", "In progress", "Done"].map((status, index) => (
            <li key={index} className="text-center">
              <h3 className="text-xl mb-2.5">{status}</h3>
              <CardList
                cards={
                  status === "ToDo"
                    ? todo
                    : status === "In progress"
                      ? progress
                      : done
                }
                isToDo={status === "ToDo"}
                handleOpenAdd={openModal}
              />
            </li>
          ))}
        </ul>
      </div>
      <CardModal
        isModalOpen={isOpen}
        handleCloseModal={closeModal}
        maxOrder={max}
      />
    </>
  );
};

export default Board;
