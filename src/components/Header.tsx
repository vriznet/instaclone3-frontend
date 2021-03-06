import { useReactiveVar } from '@apollo/client';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowAltCircleRight,
  faCompass,
} from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { isLoggedInVar } from '../apollo';
import useUser from '../hooks/useUser';
import { useHistory } from 'react-router';
import routes from '../routes';
import Avatar from './Avatar';
import { logUserOut } from '../apollo';

const HeaderSC = styled.header`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const IconContainer = styled.div`
  display: flex;
`;

const Icon = styled.span`
  &:not(:first-child) {
    margin-left: 15px;
  }
  cursor: pointer;
`;

const Button = styled.span`
  background-color: ${({ theme }) => theme.blue};
  border-radius: 4px;
  padding: 3px 15px;
  color: white;
  font-weight: 600;
`;

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();

  const history = useHistory();
  const logOutHandler = () => {
    history?.replace(routes.home, null);
    logUserOut();
  };

  return (
    <HeaderSC>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconContainer>
              <Icon>
                <Link to={routes.home}>
                  <FontAwesomeIcon icon={faHome} size="lg" />
                </Link>
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} size="lg" />
              </Icon>
              <Icon>
                <Link to={`/users/${data?.me?.username}`}>
                  <Avatar url={data?.me?.avatarURL} />
                </Link>
              </Icon>
              <Icon onClick={() => logOutHandler()}>
                <FontAwesomeIcon icon={faArrowAltCircleRight} size="lg" />
              </Icon>
            </IconContainer>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </HeaderSC>
  );
};

export default Header;
