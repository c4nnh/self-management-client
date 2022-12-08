import "./App.css";
import styled from "styled-components";
import tw from "twin.macro";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/logo.svg" className="logo" alt="Vite logo" />
        </a>
      </div>
      <StyledDiv>
        <span className="font-thin text-3xl">hello it is me</span>
      </StyledDiv>
    </div>
  );
}

export default App;

const StyledDiv = styled.div`
  ${tw`text-red-500`}
`;
