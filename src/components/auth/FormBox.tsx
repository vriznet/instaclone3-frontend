import styled from 'styled-components';
import { BaseBox } from '../shared';

const FormBoxSC = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
  form {
    width: 100%;
    margin-top: 35px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    fieldset {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin-bottom: 15px;
    }
  }
`;

const FormBox = ({ children }: any) => <FormBoxSC>{children}</FormBoxSC>;

export default FormBox;
