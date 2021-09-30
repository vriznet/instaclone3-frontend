import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import { useParams } from 'react-router';
import styled from 'styled-components';
import PageTitle from '../components/PageTitle';
import { Button, FatText } from '../components/shared';
import { PHOTO_FRAGMENT } from '../fragments';
import { seeProfile } from '../__generated__/seeProfile';
import { followUser, followUserVariables } from '../__generated__/followUser';
import {
  unfollowUser,
  unfollowUserVariables,
} from '../__generated__/unfollowUser';
import useUser from '../hooks/useUser';

interface IProfileUrlParams {
  username: string | undefined;
}

interface IPhotoProps {
  bg: string | undefined;
}

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
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

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
      error
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
      error
    }
  }
`;

const Header = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
`;

const Column = styled.div``;

const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;

const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 400;
  display: flex;
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  margin-right: 20px;
`;

const Value = styled(FatText)`
  font-size: 18px;
`;

const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div<IPhotoProps>`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileButton = styled(Button).attrs({
  as: 'span',
})`
  margin-left: 14px;
  text-align: center;
  cursor: pointer;
`;

const Profile = () => {
  const { username } = useParams<IProfileUrlParams>();

  const { data: userData } = useUser();

  const { data, loading } = useQuery<seeProfile>(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

  const client = useApolloClient();

  const [followUserMutation] = useMutation<followUser, followUserVariables>(
    FOLLOW_USER_MUTATION,
    {
      variables: {
        username: username || '',
      },
      update: (cache, result) => {
        const ok = result?.data?.followUser?.ok;
        if (!ok) return console.log(result?.data?.followUser?.error);
        cache.modify({
          id: `User:${username}`,
          fields: {
            isFollowing() {
              return true;
            },
            totalFollowers(prev) {
              return prev + 1;
            },
          },
        });
        cache.modify({
          id: `User:${userData?.me?.username}`,
          fields: {
            totalFollowing(prev) {
              return prev + 1;
            },
          },
        });
      },
    }
  );

  const [unfollowUserMutation] = useMutation<
    unfollowUser,
    unfollowUserVariables
  >(UNFOLLOW_USER_MUTATION, {
    variables: {
      username: username || '',
    },
    onCompleted: (result) => {
      const ok = result?.unfollowUser?.ok;
      if (!ok) return console.log(result?.unfollowUser?.error);
      const { cache } = client;
      cache.modify({
        id: `User:${username}`,
        fields: {
          isFollowing() {
            return false;
          },
          totalFollowers(prev) {
            return prev - 1;
          },
        },
      });
      cache.modify({
        id: `User:${userData?.me?.username}`,
        fields: {
          totalFollowing(prev) {
            return prev - 1;
          },
        },
      });
    },
  });

  const getButtonToDisplay = (profileData: {
    isMe: boolean | undefined;
    isFollowing: boolean | undefined;
  }) => {
    if (profileData.isMe) return <ProfileButton>Edit Profile</ProfileButton>;
    if (profileData.isFollowing)
      return (
        <ProfileButton onClick={() => unfollowUserMutation()}>
          Unfollow
        </ProfileButton>
      );
    else
      return (
        <ProfileButton onClick={() => followUserMutation()}>
          Follow
        </ProfileButton>
      );
  };

  return (
    <div>
      <PageTitle
        title={
          loading
            ? 'Loading...'
            : `${data?.seeProfile?.username}'s Profile | Instaclone`
        }
      />
      <Header>
        {data?.seeProfile?.avatarURL ? (
          <Avatar src={data?.seeProfile?.avatarURL} />
        ) : (
          <Avatar src="" />
        )}
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile ? getButtonToDisplay(data.seeProfile) : null}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName} {data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos?.map((photo) => (
          <Photo key={photo?.id} bg={photo?.file}>
            <Icons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {photo?.likes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {photo?.commentNumber}
              </Icon>
            </Icons>
          </Photo>
        ))}
      </Grid>
    </div>
  );
};

export default Profile;
