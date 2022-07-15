import styled from "styled-components/macro";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
`;

export const Cover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
`;

export const Panel = styled.form`
  position: relative;
  padding: 20px 40px;
  border-radius: 20px;
  display: flex;
  text-align: left;

  flex-direction: column;
  font-weight: bold;
  width: 30%;
  overflow: hidden;

  ::after {
    content: "✓";

    display: ${({ ready }) => (ready === true ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 1;
    font-size: 90px;
    background-color: ${({ player }) => (player === 1 ? "black" : "white")};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const Input = styled.input`
  border: 0;
  background-color: transparent;
  text-align: left;
  outline: none;
  color: ${({ player }) => (player === 1 ? "white" : "black")};

  border-bottom: ${({ player }) => (player === 1 ? "white" : "black")} 2px solid;
`;

export const Submit = styled.button`
  background-color: transparent;
  font-size: large;
  border: 0;
  margin: 0;
  width: 100%;
  cursor: pointer;

  padding: 10px 20px 0 20px;
  color: ${({ player }) => (player === 1 ? "white" : "black")};

  text-align: center;
`;
