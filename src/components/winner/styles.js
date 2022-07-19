import styled from "styled-components/macro";

export const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  z-index: 100000;
`;

export const InfoBoard = styled.div`
  padding: 10px 50px;
  border-radius: 20px;
  font-size: 60px;
  white-space: nowrap;
`;
