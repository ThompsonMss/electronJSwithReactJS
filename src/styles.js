import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
  height: 100vh;
  background-color: #eee;
`;

export const WrapperLeft = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  border-right: 1px solid #999;
`;

export const WrapperRight = styled.div`
  display: flex;
  flex: 1;
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 0px;
  margin: 10px;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom: .5px solid #2e2e2e;

  span {
    font-size: 24px;
    color: #2e2e2e;
  }
`;
