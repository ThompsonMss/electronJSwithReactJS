import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
  height: 100vh;
  background-color: #eee;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
`;

export const WrapperLeft = styled(Wrapper)`
  border-right: 1px solid #000;
  height: 100%;
  background: #ff6800;
  overflow: scroll;
`;

export const WrapperRight = styled(Wrapper)``;

export const Title = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 0px;
  margin-bottom: 10px;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom: ${(props) => `0.5px solid ${props.color}`};

  span {
    font-size: 24px;
    color: ${(props) => props.color};
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const TitleList = styled.span`
  color: #fff;
`;

export const DescList = styled.span`
  color: #fff;
`;
