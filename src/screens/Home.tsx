import { useHistory } from 'react-router';
import routes from '../routes';
import { logUserOut } from '../apollo';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { seeFeed } from '../__generated__/seeFeed';
import Photo from '../components/feed/Photo';

export const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatarURL
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
      isLiked
    }
  }
`;

const Home = () => {
  const history = useHistory();

  const logOutHandler = () => {
    history?.replace(routes.home, null);
    logUserOut();
  };

  const { data } = useQuery<seeFeed>(FEED_QUERY);

  return (
    <div>
      {data?.seeFeed?.map((photo, i) => (
        <Photo photo={photo} key={photo?.id ? photo.id : i + 1} />
      ))}
    </div>
  );
};

export default Home;
