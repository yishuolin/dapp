import styled from '@emotion/styled';
import Slide from 'react-reveal/Slide';
import { MEMBERS } from '../utils';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  color: #fff;
  margin: 150px auto;
`;

const Title = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
  text-align: center;
  width: 100%;
`;

const MembersContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
  margin: 0 auto;
  margin-top: 3rem;
`;

const Member = styled.div`
  width: 50%;
  margin: 0 20px;
  img {
    width: 100%;
    border-radius: 12px;
  }
`;
const Name = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 0.8rem;
`;
const Description = styled.div`
  font-size: 1.5rem;
  margin-top: 0.8rem;
`;

const Team = () => {
  return (
    <Container>
      <Title>Team</Title>
      <Slide left cascade>
        <MembersContainer>
          {MEMBERS.map(({ name, description, image }) => (
            <Member key={name}>
              <img src={image} />
              <Name>{name}</Name>
              <Description>{description}</Description>
            </Member>
          ))}
        </MembersContainer>
      </Slide>
    </Container>
  );
};

export default Team;
