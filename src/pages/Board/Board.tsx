import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBoardById } from "../../redux/boards/operations";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCardsByBoard } from "../../redux/cards/operations";
import { selectCards } from "../../redux/cards/selectors";
import CardList from "../../components/CardList";
import CardModal from "../../components/CardModal";
import { useModal } from "../../hooks/useModal";
import { Card } from "../../redux/cards/card.types";

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
  const [formMode, setFormMode] = useState<string>("add");
  const [cardData, setCardData] = useState<Card>();

  useEffect(() => {
    dispatch(getBoardById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getCardsByBoard(id));
  }, [dispatch, id]);

  const handleOpenAdd = () => {
    setFormMode("add");
    openModal();
  };

  const handleOpenEdit = (card: Card) => {
    setFormMode("edit");
    setCardData(card);
    openModal();
  };

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
                handleOpenAdd={handleOpenAdd}
                handleOpenEdit={handleOpenEdit}
              />
            </li>
          ))}
        </ul>
      </div>
      {formMode === "Add" ? (
        <CardModal
          isModalOpen={isOpen}
          handleCloseModal={closeModal}
          maxOrder={max}
        />
      ) : (
        <CardModal
          isModalOpen={isOpen}
          handleCloseModal={closeModal}
          cardData={cardData}
        />
      )}
    </>
  );
};

export default Board;
