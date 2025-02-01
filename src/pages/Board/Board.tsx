import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBoardById } from "../../redux/boards/operations";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCardsByBoard } from "../../redux/cards/operations";
import { selectCards } from "../../redux/cards/selectors";

const Board = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectCards);
  const id = params.id as string;

  useEffect(() => {
    dispatch(getBoardById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getCardsByBoard(id));
  }, [dispatch, id]);

  return (
    <div>
      <ul>
        {cards && cards.map((card) => <li key={card._id}>{card.title}</li>)}
      </ul>
    </div>
  );
};

export default Board;
