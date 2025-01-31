import { useAppSelector } from "../../hooks";
import { selectBoards } from "../../redux/boards/selectors";

const Home = () => {
  const boards = useAppSelector(selectBoards);
  return (
    <>
      <ul className="bg-red-300 flex gap-[20px]">
        {boards.map((board) => {
          return (
            <li className="w-" key={board._id}>
              {board.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;
