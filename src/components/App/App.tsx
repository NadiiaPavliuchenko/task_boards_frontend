import { Suspense, useEffect } from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { getAllBoards } from "../../redux/boards/operations";

const Layout = lazy(() => import("../../pages/Layout"));
const Home = lazy(() => import("../../pages/Home"));
const Board = lazy(() => import("../../pages/Board"));
const Loading = lazy(() => import("../../pages/Loading"));
const Error = lazy(() => import("../../pages/Error"));

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBoards());
  });

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="board/:id" element={<Board />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
