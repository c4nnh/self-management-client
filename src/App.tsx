import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Button } from "antd";
import styled from "styled-components";
import tw from "twin.macro";
import { useTranslation } from "react-i18next";

function App() {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <span>{t("abcd.ef")}</span>
      </div>
      <StyledDiv>
        <span>hello</span>
      </StyledDiv>
      <h1 className="text-red-200">Vite + React</h1>
      <Button type="primary">asd</Button>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;

const StyledDiv = styled.div`
  ${tw`text-red-500`}
`;
