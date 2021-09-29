import { useParams } from 'react-router';

interface IProfileUrlParams {
  username: string | undefined;
}

const Profile = () => {
  const { username } = useParams<IProfileUrlParams>();
  return <p>{username}</p>;
};

export default Profile;
