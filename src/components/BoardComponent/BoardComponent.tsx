import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import { selectCurBoard } from "../../redux/boards/selectors";
import { selectCards } from "../../redux/cards/selectors";
import { Card } from "../../redux/cards/card.types";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import CardList from "../CardList";
import CardModal from "../CardModal";

const BoardComponent = () => {
  const cards = useAppSelector(selectCards);
  const curBoard = useAppSelector(selectCurBoard);

  const todo = cards.filter((card) => curBoard?.todo.includes(card._id));

  const progress = cards.filter((card) =>
    curBoard?.inProgress.includes(card._id)
  );
  const done = cards.filter((card) => curBoard?.done.includes(card._id));

  const { isOpen, openModal, closeModal } = useModal(false);
  const [formMode, setFormMode] = useState<string>("add");
  const [cardData, setCardData] = useState<Card>();

  const handleOpenAdd = () => {
    setFormMode("add");
    openModal();
  };

  const handleOpenEdit = (card: Card) => {
    setFormMode("edit");
    setCardData(card);
    openModal();
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    // const { source, destination } = result;
    // console.log("source", source);
    // console.log("destination", destination);
  };
  return (
    <>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
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
                columnId={status}
                handleOpenAdd={handleOpenAdd}
                handleOpenEdit={handleOpenEdit}
              />
            </li>
          ))}
        </ul>
      </DragDropContext>
      {formMode === "add" ? (
        <CardModal isModalOpen={isOpen} handleCloseModal={closeModal} />
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

export default BoardComponent;
