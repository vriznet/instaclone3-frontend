import { useHistory } from 'react-router';
import routes from '../routes';
import { logUserOut } from '../apollo';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { seeFeed } from '../__generated__/seeFeed';
import Photo from '../components/feed/Photo';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';

export const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatarURL
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
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
