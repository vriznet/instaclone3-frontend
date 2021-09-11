import styled from 'styled-components';
import Avatar from '../Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { FatText } from '../shared';
import { seeFeed_seeFeed } from '../../__generated__/seeFeed';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import {
  toggleLike,
  toggleLikeVariables,
} from '../../__generated__/toggleLike';
import { MouseEventHandler } from 'react';
import { FEED_QUERY } from '../../screens/Home';

interface IPhotoProps {
  photo: seeFeed_seeFeed | null;
}

const PhotoContainer = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 12px;
`;

const PhotoFile = styled.img`
  width: 100%;
  height: 100%;
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

const Photo = ({ photo }: IPhotoProps) => {
  const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id: Int!) {
      toggleLike(id: $id) {
        ok
        error
      }
    }
  `;

  const [toggleLikeMutation, { loading }] = useMutation<
    toggleLike,
    toggleLikeVariables
  >(TOGGLE_LIKE_MUTATION, {
    refetchQueries: [{ query: FEED_QUERY }],
  });

  const onClickHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    if (loading) return;
    if (photo?.id) {
      toggleLikeMutation({
        variables: {
          id: +photo.id,
        },
      });
    }
  };

  return (
    <PhotoContainer key={photo?.id}>
      <PhotoHeader>
        <Avatar url={photo?.user?.avatarURL} size={30} />
        <Username>{photo?.user?.username}</Username>
      </PhotoHeader>
      <PhotoFile src={photo?.file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={(e) => onClickHandler(e)}>
              <FontAwesomeIcon
                size={'2x'}
                style={{ color: photo?.isLiked ? 'tomato' : 'inherit' }}
                icon={photo?.isLiked ? faSolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon size={'2x'} icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon size={'2x'} icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon size={'2x'} icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{photo?.likes === 1 ? '1 like' : `${photo?.likes} likes`}</Likes>
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;
