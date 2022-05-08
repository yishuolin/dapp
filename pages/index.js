import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { ToggleButtonGroup, ToggleButton, Button } from '@mui/material';

const Title = styled.h1`
  font-size: 4rem;
  margin-y: 15rem;
  text-align: center;
`;

const TextField = styled.div`
  width: 60%;
  min-height: 100px;
  max-height: 300px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const TogglesContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Footer = styled.div`
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
`;

export default function Home() {
  const [words, setWords] = useState([]);
  const [selected, setSelected] = useState([]);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const imageRef = useRef();

  const getWords = async () => {
    setLoading(true);
    const data = ['Cat', 'Dog', 'Baby', 'Cat'];
    setWords(data);
    setLoading(false);
  };

  const getImage = () => {
    // TODO: need to check if the selected words are valid again
    setLoading(true);
    // TODO: move to requests.js
    const url = 'https://source.unsplash.com/random/400x300';
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        let objectURL = URL.createObjectURL(blob);
        setImage(objectURL);
        setLoading(false);
      });
  };

  const formatSentence = (selected) => {
    return selected.map((word) => word.split('-')[0]).join(' ');
  };

  const updateSelected = (e, newSelected) => {
    setSelected(newSelected);
  };

  useEffect(() => {
    getWords();
  }, []);

  useEffect(() => {
    imageRef.current.src = image;
  }, [image]);

  return (
    <div>
      <Head>
        <title>Dapp Final Project</title>
        <meta name="description" content="Dapp Final Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title>Text To Image</Title>
        <TextField>{formatSentence(selected)}</TextField>

        <TogglesContainer>
          <ToggleButtonGroup value={selected} onChange={updateSelected}>
            {words.map((text, index) => {
              return (
                <ToggleButton key={index} value={`${text}-${index}`}>
                  {text}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </TogglesContainer>

        <ButtonContainer>
          <Button variant="contained" onClick={getImage}>
            Generate
          </Button>
        </ButtonContainer>

        <ImageContainer>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <img ref={imageRef} src={image}></img>
          )}
        </ImageContainer>
      </main>

      <Footer>
        <div>Decentralized Applications Design and Practice 2022 @NTU</div>
      </Footer>
    </div>
  );
}
