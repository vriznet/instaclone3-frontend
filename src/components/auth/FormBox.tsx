import styled from 'styled-components';
import { BaseBox } from '../shared';

const FormBoxSC = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 40px 40px 40px;
  margin-bottom: 10px;
`;

const FormBox = ({ children }: any) => <FormBoxSC>{children}</FormBoxSC>;

export default FormBox;
