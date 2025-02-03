import { IoClose } from "react-icons/io5";
import { Card } from "../../redux/cards/card.types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createCard, updateCard } from "../../redux/cards/operations";
import { selectCurBoard } from "../../redux/boards/selectors";

type Props = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  cardData?: Card;
};

const CardModal: React.FC<Props> = ({
  isModalOpen,
  handleCloseModal,
  cardData
}) => {
  const dispatch = useAppDispatch();
  const curBoard = useAppSelector(selectCurBoard);
  const mode = cardData ? "edit" : "add";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = form.elements.namedItem("title") as HTMLInputElement;
    const description = form.elements.namedItem(
      "description"
    ) as HTMLInputElement;

    if (cardData) {
      const data = {
        _id: cardData?._id,
        title: title.value,
        description: description.value
      };
      dispatch(updateCard(data));
    } else {
      if (curBoard !== null) {
        const data = {
          boardId: curBoard._id,
          title: title.value,
          ...(description.value.trim() && { description: description.value })
        };
        dispatch(createCard(data));
      }
    }
    form.reset();
    handleCloseModal();
  };

  return (
    isModalOpen && (
      <div
        className="bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 w-full h-full z-50"
        onClick={handleCloseModal}
      >
        <div
          className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-[600px] rounded-xl p-5 min-h-[200px] max-w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl">{mode === "edit" ? "Edit" : "Add"} Card</h3>
            <button
              className="inline-flex items-center"
              type="button"
              onClick={handleCloseModal}
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>
          <form
            className="mt-4 flex gap-3 flex-col"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter cards`s title..."
              className="border border-gray-400 rounded-sm p-3"
              defaultValue={cardData ? cardData.title : ""}
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter cards`s description..."
              className="border border-gray-400 rounded-sm p-3"
              defaultValue={cardData ? cardData.description : ""}
            />
            <button
              type="submit"
              className="bg-gray-300 h-9 w-full sm:w-20 px-4 py-4 rounded-md text-sm inline-flex items-center justify-center self-end"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default CardModal;
