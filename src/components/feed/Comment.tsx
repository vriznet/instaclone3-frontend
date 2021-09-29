import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  deleteComment,
  deleteCommentVariables,
} from '../../__generated__/deleteComment';
import { seeFeed_seeFeed_comments } from '../../__generated__/seeFeed';
import { FatText } from '../shared';

interface ICommentProps {
  comment: seeFeed_seeFeed_comments | null | undefined;
  photoId: number | undefined;
}

const CommentContainer = styled.div`
  margin-bottom: 8px;
`;

const CommentUsername = styled(FatText)`
  margin-right: 4px;
`;

const CommentPayload = styled.span``;

const DeleteCommentButton = styled.span`
  margin-left: 15px;
  font-size: 11px;
  cursor: pointer;
  color: ${({ theme }) => theme.blue};
`;

const Comment = ({ comment, photoId }: ICommentProps) => {
  const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($id: Int!) {
      deleteComment(id: $id) {
        ok
        error
      }
    }
  `;

  const [deleteCommentMutation, { loading: deleteCommentLoading }] =
    useMutation<deleteComment, deleteCommentVariables>(
      DELETE_COMMENT_MUTATION,
      {
        update: (cache, result) => {
          const ok = result?.data?.deleteComment?.ok;
          if (!ok) return console.log(result?.data?.deleteComment?.error);
          if (
            ok &&
            comment &&
            comment.id !== undefined &&
            comment.id !== null
          ) {
            const commentId = `Comment:${comment.id}`;
            cache.evict({ id: commentId });

            if (photoId) {
              cache.modify({
                id: `Photo:${photoId}`,
                fields: {
                  commentNumber(prev) {
                    return prev - 1;
                  },
                },
              });
            }
          }
        },
      }
    );

  const onDeleteClickHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    if (deleteCommentLoading) return;
    if (comment?.id) {
      deleteCommentMutation({
        variables: {
          id: comment.id,
        },
      });
    }
  };

  return (
    <CommentContainer key={comment?.id}>
      <Link to={`/users/${comment?.user?.username}`}>
        <CommentUsername>{comment?.user?.username}</CommentUsername>
      </Link>
      <CommentPayload>{comment?.payload}</CommentPayload>
      {comment?.isMine ? (
        <DeleteCommentButton onClick={onDeleteClickHandler}>
          삭제
        </DeleteCommentButton>
      ) : null}
    </CommentContainer>
  );
};

export default Comment;
