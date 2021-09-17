import styled from 'styled-components';
import { seeFeed_seeFeed_comments } from '../../__generated__/seeFeed';
import Comment from './Comment';

interface ICommentsProps {
  commentNumber?: number;
  comments: (seeFeed_seeFeed_comments | null)[] | null | undefined;
}

const CommentsContainer = styled.div``;

const CommentNumber = styled.div`
  margin-top: 20px;
  margin-bottom: 8px;
  color: #bbb;
  font-size: 11px;
`;

const Comments = ({ commentNumber, comments }: ICommentsProps) => {
  return (
    <CommentsContainer>
      {commentNumber === 0 ? null : (
        <CommentNumber>
          {commentNumber === 1 ? '1 Comment' : commentNumber + ' Comments'}
        </CommentNumber>
      )}

      {comments?.map((comment: seeFeed_seeFeed_comments | null | undefined) => (
        <Comment key={comment?.id} comment={comment} />
      ))}
    </CommentsContainer>
  );
};

export default Comments;
