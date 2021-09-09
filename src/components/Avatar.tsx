import styled from 'styled-components';

interface IAvatarProps {
  url?: string | null | undefined;
  size?: number | null | undefined;
}

interface IAvatarSCProps {
  size: number | null | undefined;
}

const AvatarSC = styled.div<IAvatarSCProps>`
  width: ${(props) => (props.size ? props.size + 'px' : '20px')};
  height: ${(props) => (props.size ? props.size + 'px' : '20px')};
  border-radius: 50%;
  border: 1px solid #2c2c2c;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar = ({ url = '', size = 20 }: IAvatarProps) => {
  return (
    <AvatarSC size={size}>
      {url !== '' ? <Img src={url || ''} alt="profile image" /> : null}
    </AvatarSC>
  );
};

export default Avatar;
