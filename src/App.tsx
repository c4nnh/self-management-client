import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants";
import { Auth, Private } from "./pages";

function App() {
  return (
    <Routes>
      <Route path={`/${ROUTES.AUTH.ROOT}/*`} element={<Auth />} />
      <Route path="/*" element={<Private />} />
    </Routes>
  );
}

export default App;
