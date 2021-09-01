import styled from 'styled-components';

export const BaseBox = styled.div`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.borderColor};
  width: 100%;
`;

export const FatText = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;

export const Notification = styled.div`
  color: tomato;
  margin-bottom: 20px;
`;
