import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

const FacebookLoginCS = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 700;
  color: #385184;
  svg {
    margin-right: 7px;
  }
  font-size: 13px;
`;

const FacebookLoginBtn = () => (
  <FacebookLoginCS>
    <FontAwesomeIcon icon={faFacebookSquare} />
    Log in with Facebook
  </FacebookLoginCS>
);

export default FacebookLoginBtn;
