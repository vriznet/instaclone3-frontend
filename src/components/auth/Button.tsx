import styled from 'styled-components';
interface IButtonProps {
  type: string;
  value?: string;
}

const Button = styled.input<IButtonProps>`
  background-color: ${({ theme }) => theme.blue};
  border: none;
  width: 100%;
  color: white;
  padding: 7px 0;
  border-radius: 3px;
  font-weight: 700;
  font-size: 12px;
`;

export default Button;
