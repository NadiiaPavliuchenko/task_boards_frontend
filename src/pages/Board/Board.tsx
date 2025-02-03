import { useEffect } from "react";
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

  const ids = [
    ...(curBoard?.todo ?? []),
    ...(curBoard?.inProgress ?? []),
    ...(curBoard?.done ?? [])
  ];

  useEffect(() => {
    if (ids.length > 0) {
      dispatch(getCardsById(ids));
    }
  }, [dispatch, ids]);

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

  return (
    <div className="p-4">
      <BoardComponent />
    </div>
  );
};

export default Board;
