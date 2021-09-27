import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
interface IInputProps {
  value?: string;
  type: string;
  placeholder?: string;
  hasError?: boolean;
  onChange?: ChangeEventHandler;
}

const Input = styled.input<IInputProps>`
  width: 100%;
  padding: 10px 8px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? 'tomato' : theme.borderColor)};
  &:not(:last-child) {
    margin-bottom: 5px;
  }
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    outline: none;
    border-color: ${({ hasError }) =>
      hasError ? 'tomato' : 'rgb(100, 100, 100)'};
  }
`;

export default Input;
