import styled from 'styled-components';

interface IFormErrorProps {
  message?: string;
}

const FormErrorSC = styled.span`
  color: tomato;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const FormError = (props: IFormErrorProps) =>
  props.message === '' || !props.message ? null : (
    <FormErrorSC>{props.message}</FormErrorSC>
  );

export default FormError;
