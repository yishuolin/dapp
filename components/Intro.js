import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Tilt from 'react-parallax-tilt';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin: 120px auto;
`;

const Description = styled.div`
  width: 40%;
`;

const Title = styled.h3`
  font-size: 4rem;
  line-height: 1.1;
  text-shadow: 0 0 80px rgb(192 219 255 / 48%), 0 0 40px rgb(65 120 255 / 24%);
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: -1rem;
`;
const Subtitle = styled.h5`
  font-size: 1.6rem;
  color: #fff;
`;

const GlowWithGradient = styled.span`
  text-shadow: 0 0 40px rgb(192 219 255 / 75%), 0 0 32px rgb(65 120 255 / 24%);
  background: linear-gradient(to right, #30cfd0, #c43ad6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Gallery = styled.div`
  width: 800px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  mask: linear-gradient(90deg, rgba(255, 255, 255, 0.2), #fff);
  margin-left: -5%;
`;

const Card = styled.div`
  width: 12rem;
  height: 12rem;
  background: linear-gradient(to right, #30cfd0, #c43ad6);
  border-radius: 0.5rem;
  margin-bottom: 0.8rem;
  // background: url(/img/galaxy.jpeg);
  background-size: cover;
`;

const Intro = () => {
  const [tiltEnable, setTiltEnablem] = useState(true);
  useEffect(() => {
    setTiltEnablem(false);
  }, []);

  return (
    <Container>
      <Description>
        <Title>
          NFTs <br></br>for Decentralized <br></br>Generative Art
        </Title>
        <Subtitle>
          <GlowWithGradient>The TEXT</GlowWithGradient> is a collection of 1000
          NFTs representing 1000 text. Mint one to create beautiful artwork by
          AI.
        </Subtitle>
      </Description>
      <Tilt tiltAngleYInitial={20} tiltEnable={tiltEnable}>
        <Gallery>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </Gallery>
      </Tilt>
    </Container>
  );
};

export default Intro;
