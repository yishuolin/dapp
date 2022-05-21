import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  color: #fff;
  margin: 150px auto;
`;

const Title = styled.div`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  width: 100%;
`;

const MembersContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
  margin: 0 auto;
  margin-top: 4rem;
`;

const Member = styled.div`
  width: 30%;
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
      <MembersContainer>
        <Member>
          <img src="https://uploads-ssl.webflow.com/61a08842191af40097b65a21/61d83eb452352e9adee34f0b_la.png" />
          <Name>XXX</Name>
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            egestas dolor augue.
          </Description>
        </Member>
        <Member>
          <img src="https://uploads-ssl.webflow.com/61a08842191af40097b65a21/61dc003e622493023e1023a9_margo.png" />
          <Name>YYY</Name>
          <Description>
            Curabitur aliquet massa ac tristique maximus. Quisque suscipit
            varius mauris a fringilla
          </Description>
        </Member>
        <Member>
          <img src="https://uploads-ssl.webflow.com/61a08842191af40097b65a21/61efa9a55ae46a429703ff89_zander.png" />
          <Name>XXX</Name>
          <Description>
            Nam eget faucibus massa. Praesent commodo dignissim arcu, convallis
            posuere eros pharetra et.
          </Description>
        </Member>
      </MembersContainer>
    </Container>
  );
};

export default Team;
