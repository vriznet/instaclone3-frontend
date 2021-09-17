import styled from 'styled-components';
import { seeFeed_seeFeed_comments } from '../../__generated__/seeFeed';
import { FatText } from '../shared';

interface ICommentProps {
  comment: seeFeed_seeFeed_comments | null | undefined;
}

const CommentContainer = styled.div`
  margin-bottom: 8px;
`;

const CommentUsername = styled(FatText)`
  margin-right: 4px;
`;

const CommentPayload = styled.span``;

const Comment = ({ comment }: ICommentProps) => {
  return (
    <CommentContainer key={comment?.id}>
      <CommentUsername>{comment?.user?.username}</CommentUsername>
      <CommentPayload>{comment?.payload}</CommentPayload>
    </CommentContainer>
  );
};

export default Comment;
