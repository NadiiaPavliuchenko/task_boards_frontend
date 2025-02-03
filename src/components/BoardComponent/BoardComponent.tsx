import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import { selectCurBoard } from "../../redux/boards/selectors";
import { selectCards } from "../../redux/cards/selectors";
import { Card } from "../../redux/cards/card.types";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import CardList from "../CardList";
import CardModal from "../CardModal";
import {
  chandeCardsOrder,
  chandeCardStatus
} from "../../redux/boards/operations";
import { BoardColumns } from "../../redux/boards/board.types";

const BoardComponent = () => {
  const cards = useAppSelector(selectCards);
  const curBoard = useAppSelector(selectCurBoard);
  const dispatch = useAppDispatch();

  const todo = cards.filter((card) => curBoard?.todo.includes(card._id));

  const progress = cards.filter((card) =>
    curBoard?.inProgress.includes(card._id)
  );
  const done = cards.filter((card) => curBoard?.done.includes(card._id));

  const statuses = {
    todo: todo,
    inProgress: progress,
    done: done
  };

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
    const { source, destination, draggableId } = result;

    if (curBoard) {
      if (source.droppableId === destination.droppableId) {
        const column = destination.droppableId as string;
        const searchedArray = statuses[column as keyof BoardColumns];
        const [removedElement] = searchedArray.splice(source.index, 1);
        searchedArray.splice(destination.index, 0, removedElement);

        const body = {
          cards: searchedArray.map((card) => card._id)
        };
        dispatch(
          chandeCardsOrder({
            id: curBoard._id,
            columnId: destination.droppableId,
            body
          })
        );
      } else {
        const toColumn = destination.droppableId as string;
        const toArray = statuses[toColumn as keyof BoardColumns];
        const fromColumn = source.droppableId as string;
        const fromArray = statuses[fromColumn as keyof BoardColumns];

        const card = fromArray.find((card) => card._id === draggableId);

        if (card) {
          toArray.splice(destination.index, 0, card);
          fromArray.splice(source.index, 1);

          const body = {
            cardId: draggableId,
            fromColumnId: source.droppableId,
            toColumnId: destination.droppableId
          };
          dispatch(chandeCardStatus({ id: curBoard._id, body }));
        }
      }
    }
  };
  return (
    <div className="overflow-x-auto w-full py-4">
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <ul className="flex min-w-[800px] gap-[14px]">
          {["todo", "inProgress", "done"].map((status, index) => (
            <li key={index} className="text-center">
              <h3 className="text-xl mb-2.5">{status}</h3>
              <CardList
                cards={
                  status === "todo"
                    ? todo
                    : status === "inProgress"
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
    </div>
  );
};

export default BoardComponent;
