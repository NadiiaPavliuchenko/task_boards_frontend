import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getBoardById } from "../../redux/boards/operations";
import { useAppDispatch, useAppSelector } from "../../hooks";
import BoardComponent from "../../components/BoardComponent";
import { getCardsById } from "../../redux/cards/operations";
import { selectCurBoard } from "../../redux/boards/selectors";

const Board = () => {
  const params = useParams();
  const id = params.id as string;
  const curBoard = useAppSelector(selectCurBoard);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardById(id));
  }, [dispatch, id]);

  const ids = useMemo(() => {
    return [
      ...(curBoard?.todo ?? []),
      ...(curBoard?.inProgress ?? []),
      ...(curBoard?.done ?? [])
    ];
  }, [curBoard]);

  useEffect(() => {
    if (ids.length > 0) {
      dispatch(getCardsById(ids));
    }
  }, [dispatch, ids]);

  return (
    <div className="p-4">
      <BoardComponent />
    </div>
  );
};

export default Board;
