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
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

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

  // function findContainer(id: string) {
  //   if (todo.some((card) => card._id === id)) {
  //     return "ToDo";
  //   }
  //   if (progress.some((card) => card._id === id)) {
  //     return "In Progress";
  //   }
  //   if (done.some((card) => card._id === id)) {
  //     return "Done";
  //   }
  //   return null;
  // }

  // function handleDragOver(event: DragOverEvent) {
  //   const { active, over } = event;
  //   const { id } = active;
  //   if (!over) return;
  //   const { id: overId } = over;

  //   // Find the containers
  //   const activeContainer = findContainer(id.toString());
  //   const overContainer = findContainer(overId.toString());

  //   if (
  //     !activeContainer ||
  //     !overContainer ||
  //     activeContainer === overContainer
  //   ) {
  //     return;
  //   }

  //   // setItems((prev) => {
  //   //   const activeItems = prev[activeContainer];
  //   //   const overItems = prev[overContainer];

  //   //   // Find the indexes for the items
  //   //   const activeIndex = activeItems.indexOf(id);
  //   //   const overIndex = overItems.indexOf(overId);

  //   //   let newIndex;
  //   //   if (overId in prev) {
  //   //     // We're at the root droppable of a container
  //   //     newIndex = overItems.length + 1;
  //   //   } else {
  //   //     const isBelowLastItem =
  //   //       over &&
  //   //       overIndex === overItems.length - 1 &&
  //   //       draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

  //   //     const modifier = isBelowLastItem ? 1 : 0;

  //   //     newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
  //   //   }

  //   //   return {
  //   //     ...prev,
  //   //     [activeContainer]: [
  //   //       ...prev[activeContainer].filter((item) => item !== active.id)
  //   //     ],
  //   //     [overContainer]: [
  //   //       ...prev[overContainer].slice(0, newIndex),
  //   //       items[activeContainer][activeIndex],
  //   //       ...prev[overContainer].slice(newIndex, prev[overContainer].length)
  //   //     ]
  //   //   };
  //   // });
  // }

  // function handleDragEnd(event: DragEndEvent) {
  //   // const { active, over } = event;
  //   // const { id } = active;
  //   // const { id: overId } = over;
  //   // const activeContainer = findContainer(id);
  //   // const overContainer = findContainer(overId);
  //   // if (
  //   //   !activeContainer ||
  //   //   !overContainer ||
  //   //   activeContainer !== overContainer
  //   // ) {
  //   //   return;
  //   // }
  //   // const activeIndex = items[activeContainer].indexOf(active.id);
  //   // const overIndex = items[overContainer].indexOf(overId);
  //   // if (activeIndex !== overIndex) {
  //   //   setItems((items) => ({
  //   //     ...items,
  //   //     [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
  //   //   }));
  //   // }
  // }

  // const sensors = useSensors(
  //   useSensor(PointerSensor),
  //   useSensor(MouseSensor, {
  //     activationConstraint: {
  //       distance: 10
  //     }
  //   }),
  //   useSensor(TouchSensor),
  //   useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  // );

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log("source", source);
    console.log("destination", destination);
  };

  return (
    <>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
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
                  columnId={status}
                  handleOpenAdd={handleOpenAdd}
                  handleOpenEdit={handleOpenEdit}
                />
              </li>
            ))}
          </ul>
        </div>
      </DragDropContext>
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
