import styled from 'styled-components';

const SeperatorSC = styled.div`
  margin: 20px 0 20px 0;
  color: rgb(150, 150, 150);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-transform: uppercase;
  font-weight: 600;
  div {
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.borderColor};
  }
  span {
    margin-left: 20px;
    margin-right: 20px;
    font-size: 12px;
  }
`;

const Seperator = () => (
  <SeperatorSC>
    <div></div>
    <span>Or</span>
    <div></div>
  </SeperatorSC>
);

export default Seperator;
