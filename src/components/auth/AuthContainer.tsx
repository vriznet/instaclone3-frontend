import styled from 'styled-components';

const AuthContainer = ({ children }: any) => {
  const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `;

  const Wrapper = styled.div`
    max-width: 350px;
    width: 100%;
  `;

  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

export default AuthContainer;
