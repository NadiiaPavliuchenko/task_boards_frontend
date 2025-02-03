import { FaTrashCan } from "react-icons/fa6";
import { HiPencilAlt } from "react-icons/hi";
import { Card } from "../../redux/cards/card.types";
import { deleteCard } from "../../redux/cards/operations";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import { selectCurBoard } from "../../redux/boards/selectors";

type Props = {
  card: Card;
  handleOpenEdit: (cardData: Card) => void;
  index: number;
};

const CardComponent: React.FC<Props> = ({ card, handleOpenEdit, index }) => {
  const dispatch = useAppDispatch();
  const curBoard = useAppSelector(selectCurBoard);

  const handleDeleteCard = (id: string) => {
    if (curBoard) {
      dispatch(deleteCard({ id, boardId: curBoard._id }));
    }
  };

  return (
    <Draggable key={card._id} draggableId={card._id} index={index}>
      {(provided: DraggableProvided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-gray-300 w-full h-[200px] p-[20px] text-left relative touch-none"
        >
          <p className="font-medium mb-[20px]">{card.title}</p>
          <p>{card.description}</p>
          <div className="absolute bottom-[20px] right-[20px] flex gap-2.5">
            <button type="button" onClick={() => handleOpenEdit(card)}>
              <HiPencilAlt className="w-[20px] h-[20px] hover:fill-blue-400" />
            </button>
            <button type="button" onClick={() => handleDeleteCard(card._id)}>
              <FaTrashCan className="w-[20px] h-[20px] hover:fill-red-500" />
            </button>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default CardComponent;
