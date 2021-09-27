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
import React, { ChangeEventHandler, MouseEventHandler, useRef } from 'react';
import Comments from './Comments';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { commentInput } from '../../types/input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createComment,
  createCommentVariables,
} from '../../__generated__/createComment';
import FormError from '../auth/FormError';
import useUser from '../../hooks/useUser';

interface IPhotoProps {
  photo: seeFeed_seeFeed | null;
}

interface ICommentInputProps {
  value?: string;
  type: string;
  placeholder?: string;
  hasError?: boolean;
  onChange?: ChangeEventHandler;
}

interface ICommentButtonProps {
  type: string;
  value?: string;
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
  margin-top: 10px;
  margin-bottom: 10px;
  display: block;
`;

const Caption = styled.div`
  a {
    background-color: inherit;
    color: ${({ theme }) => theme.blue};
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const CaptionText = styled.span`
  margin-left: 4px;
`;

const CommentInputContainer = styled.div`
  margin-top: 14px;
`;

const CommentInput = styled.input<ICommentInputProps>`
  padding: 10px 8px;
  width: 500px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? 'tomato' : theme.borderColor)};
  &:not(:last-child) {
    margin-bottom: 5px;
  }
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    outline: none;
    border-color: ${({ hasError }) =>
      hasError ? 'tomato' : 'rgb(100, 100, 100)'};
  }
`;

const CommentButton = styled.input<ICommentButtonProps>`
  margin-left: 10px;
  background-color: ${({ theme }) => theme.blue};
  border: none;
  color: white;
  padding: 7px 12px;
  border-radius: 3px;
  font-weight: 700;
  font-size: 14px;
  opacity: ${(props) => (props.disabled ? '0.5' : 1)};
`;

const Photo = ({ photo }: IPhotoProps) => {
  const commentInputRef = useRef<HTMLInputElement | null>(null);

  const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id: Int!) {
      toggleLike(id: $id) {
        ok
        error
      }
    }
  `;

  const [toggleLikeMutation, { loading: toggleLikeLoading }] = useMutation<
    toggleLike,
    toggleLikeVariables
  >(TOGGLE_LIKE_MUTATION, {
    update: (cache, result) => {
      const ok = result?.data?.toggleLike?.ok;
      if (
        ok &&
        photo &&
        photo.likes !== undefined &&
        photo.likes !== null &&
        photo.id !== undefined &&
        photo.id !== null &&
        photo.isLiked !== undefined &&
        photo.isLiked !== null
      ) {
        const photoId = `Photo:${photo.id}`;
        cache.modify({
          id: photoId,
          fields: {
            isLiked(prev) {
              return !prev;
            },
            likes(prev) {
              if (photo.isLiked) {
                return prev - 1;
              }
              return prev + 1;
            },
          },
        });
      }
    },
  });

  const onLikeClickHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    if (toggleLikeLoading) return;
    if (photo?.id) {
      toggleLikeMutation({
        variables: {
          id: +photo.id,
        },
      });
    }
  };

  const validationSchema = yup.object().shape({
    payload: yup.string().required().min(2),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    getValues,
  } = useForm<commentInput>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const { data: userData } = useUser();

  const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($photoId: Int!, $payload: String!) {
      createComment(photoId: $photoId, payload: $payload) {
        ok
        id
        error
      }
    }
  `;

  const [createCommentMutation, { loading: createCommentLoading }] =
    useMutation<createComment, createCommentVariables>(
      CREATE_COMMENT_MUTATION,
      {
        update: (cache, result) => {
          const ok = result?.data?.createComment?.ok;
          if (!ok) {
            const error = result?.data?.createComment?.error;
            return setError('payload', { message: error || '' });
          }
          if (userData?.me) {
            const { payload } = getValues();
            const newComment = {
              __typename: 'Comment',
              createdAt: Date.now() + '',
              id: result?.data?.createComment?.id || 0,
              isMine: true,
              payload,
              user: {
                ...userData.me,
              },
            };

            const newCacheComment = cache.writeFragment({
              fragment: gql`
                fragment CommentFragment on Comment {
                  id
                  user {
                    username
                  }
                  payload
                  createdAt
                  isMine
                }
              `,
              data: newComment,
            });

            cache.modify({
              id: `Photo:${photo?.id}`,
              fields: {
                comments(prev) {
                  return [...prev, newCacheComment];
                },
                commentNumber(prev) {
                  return prev + 1;
                },
              },
            });
            if (commentInputRef !== null && commentInputRef !== undefined) {
              if (
                commentInputRef.current !== null &&
                commentInputRef.current !== undefined
              ) {
                commentInputRef.current.value = '';
              }
            }
          }
        },
      }
    );

  const onSubmit: SubmitHandler<commentInput> = () => {
    if (createCommentLoading) return;
    const { payload } = getValues();
    createCommentMutation({
      variables: {
        photoId: photo?.id ? +photo?.id : 0,
        payload,
      },
    });
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
            <PhotoAction onClick={(e) => onLikeClickHandler(e)}>
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
        <Caption>
          <FatText>{photo?.user?.username}</FatText>
          <CaptionText>
            {photo?.caption?.split(' ').map((word, index) =>
              /#[\w]+/.test(word) ? (
                <React.Fragment key={index}>
                  <Link to={`/hashtags/${word}`}>{word}</Link>{' '}
                </React.Fragment>
              ) : (
                <React.Fragment key={index}>{word} </React.Fragment>
              )
            )}
          </CaptionText>
        </Caption>
        <Comments
          commentNumber={photo?.commentNumber}
          comments={photo?.comments}
        />
        <CommentInputContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <CommentInput
                {...register('payload')}
                type="text"
                placeholder="Write a comment...."
                hasError={Boolean(errors?.payload?.message)}
                ref={commentInputRef}
              />
              <CommentButton
                type="submit"
                value={createCommentLoading ? 'loading' : 'Send'}
                disabled={!isValid || createCommentLoading}
              />
            </div>
            <FormError message={errors.payload?.message} />
          </form>
        </CommentInputContainer>
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;
