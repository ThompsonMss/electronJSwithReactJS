import { Container, WrapperLeft, WrapperRight } from "./styles";
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
        <WrapperLeft></WrapperLeft>
      </ResizableBox>

      <WrapperRight></WrapperRight>
    </Container>
  );
}

export default App;
