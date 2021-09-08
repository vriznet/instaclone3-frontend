import styled from 'styled-components';

interface IAvatarProps {
  url: string;
}

const AvatarSC = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #2c2c2c;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar = ({ url = '' }: IAvatarProps) => {
  return (
    <AvatarSC>
      {url !== '' ? <Img src={url} alt="profile image" /> : null}
    </AvatarSC>
  );
};

export default Avatar;
