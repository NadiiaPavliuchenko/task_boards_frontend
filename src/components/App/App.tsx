import { Suspense } from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Layout = lazy(() => import("../../pages/Layout"));
const Home = lazy(() => import("../../pages/Home"));
const Board = lazy(() => import("../../pages/Board"));

export function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<Board />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
