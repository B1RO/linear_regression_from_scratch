import Example from './example.mdx'
import Papa from 'papaparse';
import styled from "styled-components";

const RootDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  overflow: hidden;
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 64rem;
  font-size: 1.25rem;

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5rem;
    padding-bottom: 0;
  }
`;

function App() {
    return <RootDiv><InnerDiv><Example/></InnerDiv></RootDiv>
}

export default App
