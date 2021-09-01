import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BaseBox } from '../shared';

interface IBottomBoxProps {
  cta: string;
  link: string;
  linkText: string;
}

const BottomBoxSC = styled(BaseBox)`
  background-color: ${({ theme }) => theme.bgColor};
  padding: 20px 0;
  text-align: center;
  a {
    margin-left: 5px;
    font-weight: 700;
    color: ${({ theme }) => theme.blue};
  }
`;

const BottomBox = (props: IBottomBoxProps) => (
  <BottomBoxSC>
    <span>{props.cta}</span>
    <Link to={props.link}>{props.linkText}</Link>
  </BottomBoxSC>
);

export default BottomBox;
