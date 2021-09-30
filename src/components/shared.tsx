import styled from 'styled-components';

export const BaseBox = styled.div`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.borderColor};
  width: 100%;
`;

export const FatText = styled.span`
  font-weight: 600;
`;

export const Notification = styled.div`
  color: tomato;
  margin-bottom: 20px;
`;

export const Button = styled.input`
  background-color: ${({ theme }) => theme.blue};
  border: none;
  width: 100%;
  color: white;
  padding: 7px 0;
  border-radius: 3px;
  font-weight: 700;
  font-size: 12px;
  opacity: ${(props) => (props.disabled ? '0.5' : 1)};
`;
