import { Container, WrapperLeft, WrapperRight, Title } from "./styles";
import { ResizableBox } from "react-resizable";

function App() {
  return (
    <Container>
      <ResizableBox
        width={400}
        height={Infinity}
        minConstraints={[300, Infinity]}
        maxConstraints={[500, Infinity]}
        resizeHandles={["e"]}
        axis="x"
      >
        <WrapperLeft>
          <Title>
            <span>Logs</span>
          </Title>
        </WrapperLeft>
      </ResizableBox>

      <WrapperRight>
        <Title>
          <span>BD</span>
        </Title>
      </WrapperRight>
    </Container>
  );
}

export default App;
