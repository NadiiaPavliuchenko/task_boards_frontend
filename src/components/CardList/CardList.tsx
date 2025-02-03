import { FaPlus } from "react-icons/fa6";
import { Card } from "../../redux/cards/card.types";
import CardComponent from "../CardComponent";
import { Droppable, DroppableProvided } from "@hello-pangea/dnd";

type Props = {
  cards: Card[];
  columnId: string;
  handleOpenAdd: () => void;
  handleOpenEdit: (cardData: Card) => void;
};

const CardList: React.FC<Props> = ({
  cards,
  columnId,
  handleOpenAdd,
  handleOpenEdit
}) => {
  return (
    <Droppable key={columnId} droppableId={columnId} type="group">
      {(provided: DroppableProvided) => (
        <ul
          id={columnId}
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-200 p-4 h-[800px] w-[300px] md:w-[400px] overflow-y-auto flex flex-col gap-[20px] items-center scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        >
          {cards &&
            cards.map((card, index) => (
              <CardComponent
                key={card._id}
                card={card}
                handleOpenEdit={handleOpenEdit}
                index={index}
              />
            ))}
          {provided.placeholder}
          {columnId === "todo" && (
            <li
              className="bg-gray-300 w-full min-h-[200px] relative"
              onClick={handleOpenAdd}
            >
              <FaPlus className="w-[20px] h-[20px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" />
            </li>
          )}
        </ul>
      )}
    </Droppable>
  );
};

export default CardList;
