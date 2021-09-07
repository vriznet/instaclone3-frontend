import styled from 'styled-components';
import { defaultProps } from '../../types/react-component';
import { BaseBox } from '../shared';

const FormBoxSC = styled(BaseBox)`
  background-color: ${({ theme }) => theme.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 40px 40px 40px;
  margin-bottom: 10px;
`;

const FormBox = ({ children }: defaultProps) => (
  <FormBoxSC>{children}</FormBoxSC>
);

export default FormBox;
