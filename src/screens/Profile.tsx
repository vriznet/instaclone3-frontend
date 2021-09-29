import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useParams } from 'react-router';
import { PHOTO_FRAGMENT } from '../fragments';
import { seeProfile } from '../__generated__/seeProfile';

interface IProfileUrlParams {
  username: string | undefined;
}

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      username
      firstName
      lastName
      bio
      avatarURL
      totalFollowers
      totalFollowing
      isMe
      isFollowing
      photos {
        ...PhotoFragment
      }
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Profile = () => {
  const { username } = useParams<IProfileUrlParams>();

  const { data } = useQuery<seeProfile>(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

  console.log(data);

  return <p>{username}</p>;
};

export default Profile;
