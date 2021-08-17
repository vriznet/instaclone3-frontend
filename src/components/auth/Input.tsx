import styled from 'styled-components';

const InputSC = styled.input`
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

interface IInputProps {
  type: string;
  placeholder: string;
}

const Input = (props: IInputProps) => <InputSC {...props} />;

export default Input;
