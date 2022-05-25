import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import PropType from 'prop-types';
import ReactRotatingText from 'react-rotating-text';
import { NftCard } from '../components';

const BlinkingCursor = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Title = styled.h3`
  font-size: 3.5rem;
  text-align: center;
  color: #fff;
  .react-rotating-text-cursor {
    animation: ${BlinkingCursor} 1s cubic-bezier(0.68, 0.01, 0.01, 0.99) 0s
      infinite;
  }
`;

const GlowWithGradient = styled.span`
  text-shadow: 0 0 40px rgb(192 219 255 / 75%), 0 0 32px rgb(65 120 255 / 24%);
  background: linear-gradient(to right, #30cfd0, #c43ad6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 65%;
  margin: 0 auto;
  flex-wrap: wrap;
  > div {
    margin-top: 30px;
  }
`;

const NftGallery = ({ tokens }) => {
  return (
    <>
      <Title>
        <ReactRotatingText
          items={['Mint', 'Own', 'Enjoy', 'Love']}
          typingInterval={120}
          deletingInterval={100}
        />{' '}
        your <GlowWithGradient>TEXT</GlowWithGradient>.
      </Title>
      <Container>
        {tokens.map((tokenId) => (
          <NftCard key={tokenId} tokenId={tokenId % 3} />
        ))}
      </Container>
    </>
  );
};

NftGallery.propTypes = {
  tokens: PropType.arrayOf(PropType.number).isRequired,
};

export default NftGallery;
