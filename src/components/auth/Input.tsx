import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
interface IInputProps {
  onChange?: ChangeEventHandler;
  value?: string;
  type: string;
  placeholder?: string;
}

const Input = styled.input<IInputProps>`
  width: 100%;
  padding: 10px 8px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.bgColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  &:not(:last-child) {
    margin-bottom: 5px;
  }
  &::placeholder {
    font-size: 12px;
  }
`;

export default Input;
