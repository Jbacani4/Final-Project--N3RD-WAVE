import React from 'react';
import styled from 'styled-components';

const About = () => {
  return (
    <AboutContainer>
      <Section>
        <Title>What is 3rd Wave Coffee?</Title>
        <Text>
          Third wave coffee is a movement that views coffee as an artisanal product, like wine, rather than a commodity. It emphasizes quality, sustainability, and direct trade with farmers.
        </Text>
      </Section>
      <Section>
        <Title>Brief History</Title>
        <Text>
          Coffee culture has evolved over the years from the first wave of mass-produced coffee, through the second wave of coffee chains, to the third wave which focuses on craft and origin. The third wave began in the early 2000s and has since grown in popularity.
        </Text>
      </Section>
      <Section>
        <Title>Why Care About 3rd Wave Coffee?</Title>
        <Text>
          Caring about third wave coffee means valuing quality and sustainability. It's about enjoying a superior cup of coffee and knowing that it was ethically sourced. This movement has brought a niche interest into the mainstream, appealing to a growing number of discerning coffee drinkers.
        </Text>
      </Section>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  color: #333;
  font-family: 'Arial, sans-serif';
`;

const Section = styled.div`
  width: 80%;
  max-width: 800px;
  margin: 20px 0;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #d2691e;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.6;
`;

export default About;