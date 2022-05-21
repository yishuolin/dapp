import styled from '@emotion/styled';

const Container = styled.footer`
  height: 120px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  color: #fff;
  font-size: 1.1rem;
  font-weight: bold;
`;

const Footer = () => {
  return (
    <Container>
      <div>Decentralized Applications Design and Practice 2022 @NTU</div>
    </Container>
  );
};

export default Footer;
