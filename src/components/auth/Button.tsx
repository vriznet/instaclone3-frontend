import styled from 'styled-components';

const ButtonSC = styled.input`
  background-color: ${({ theme }) => theme.blue};
  border: none;
  width: 100%;
  color: white;
  padding: 7px 0;
  border-radius: 3px;
  font-weight: 700;
  font-size: 12px;
`;

interface IButtonProps {
  type: string;
  value?: string;
}

const Button = (props: IButtonProps) => <ButtonSC {...props} />;

export default Button;
