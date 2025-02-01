import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { HiPencilAlt } from "react-icons/hi";
import { Card } from "../../redux/cards/card.types";
import { useAppDispatch } from "../../hooks";
import { deleteCard } from "../../redux/cards/operations";

type Props = {
  cards: Card[];
  isToDo: boolean;
  handleOpenAdd: () => void;
  handleOpenEdit: (cardData: Card) => void;
};

const CardList: React.FC<Props> = ({
  cards,
  isToDo,
  handleOpenAdd,
  handleOpenEdit
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteCard = (id: string) => {
    dispatch(deleteCard(id));
  };

  return (
    <ul className="bg-gray-200 p-4 h-[800px] w-[400px] overflow-y-auto flex flex-col gap-[20px] items-center">
      {cards &&
        cards.map((card) => (
          <li
            key={card._id}
            className="bg-gray-300 w-full h-[200px] p-[20px] text-left relative"
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
        ))}
      {isToDo && (
        <li
          className="bg-gray-300 w-full h-[200px] relative"
          onClick={handleOpenAdd}
        >
          <FaPlus className="w-[20px] h-[20px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" />
        </li>
      )}
    </ul>
  );
};

export default CardList;
