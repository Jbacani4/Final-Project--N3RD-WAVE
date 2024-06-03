import React from 'react';
import styled from 'styled-components';

const About = () => {
  return (
    <AboutContainer>
      <Section>
        <Title>What is 3rd Wave Coffee?</Title>
        <Text>
        You may have heard of the term third wave coffee before- but what does this really mean, and why does it matter? When people talk about the first, second and third wave of coffee, they are talking about the different eras of the evolution of North American coffee culture. Each of these waves changed how we roast, brew and drink coffee, and affected the role coffee plays culturally and socially. Third wave coffee is a movement that views coffee as an artisanal product, like wine, rather than a commodity. It emphasizes quality, sustainability, and direct trade with farmers. You may have heard of the term third wave coffee before- but what does this really mean, and why does it matter? When people talk about the first, second and third wave of coffee, they are talking about the different eras of the evolution of North American coffee culture. Each of these waves changed how we roast, brew and drink coffee, and affected the role coffee plays culturally and socially. 
        </Text>
      </Section>
      <Section>
        <Title>Brief History</Title>
        <Text>
          Coffee culture has evolved over the years from the first wave of mass-produced coffee, through the second wave of coffee chains, to the third wave which focuses on craft and origin. The third wave began in the early 2000s and has since grown in popularity.
        </Text>
      </Section>
      <Section>
        <Title>FIRST WAVE: coffee as a tool</Title>
        <Text>
        First wave coffee treated coffee as a common tool, a practical and accessible means of fueling yourself throughout your day. Think of diner coffee, instant coffee and supermarket aisle pre-ground coffee: they offered consistent taste at an affordable price-point and in a convenient way. Coffee from the first wave tended to be bitter and super dark, sometimes with artificial flavoring added, and it was often accompanied by newly-created shelf-stable creamers to add even more flavor. This era’s coffee was mass-produced without a strong focus on roasting notes or ethical sourcing. Some of the most recognizable brands from this era include Folgers, Maxwell House and Nescafé.
        </Text>
        </Section>
        <Section>
        <Title>SECOND WAVE: coffee as a treat</Title>
        <Text>
        The second wave reframed coffee as a treat and as a social event, resulting in the rise of cafe culture and coffee shops as third spaces. This wave popularized coffee-based beverages on a global scale: rather than only consume dark roast filter coffee or instant coffee, customers now had new options ranging from mochas to lattes with flavored syrups and even brand-specific drinks. Popularized by Peet's Coffee (which went on to inspire the founders of Starbucks), this wave also introduced the idea of flavor profiles and tracing bean origins. Consumers learned that different countries and regions produced different characteristics in beans, further developing their palates and expanding the potential for customized drinks.
        </Text>
        </Section>
        <Section>
        <Title>FIRST WAVE: coffee as a tool</Title>
        <Text>
        First wave coffee treated coffee as a common tool, a practical and accessible means of fueling yourself throughout your day. Think of diner coffee, instant coffee and supermarket aisle pre-ground coffee: they offered consistent taste at an affordable price-point and in a convenient way. Coffee from the first wave tended to be bitter and super dark, sometimes with artificial flavoring added, and it was often accompanied by newly-created shelf-stable creamers to add even more flavor. This era’s coffee was mass-produced without a strong focus on roasting notes or ethical sourcing. Some of the most recognizable brands from this era include Folgers, Maxwell House and Nescafé.
        </Text>
        </Section>
      <Section>
        <Title>THIRD WAVE: coffee as art</Title>
        <Text>
        Third wave coffee, also called speciality coffee, draws a strong focus to the beans themselves. The third wave is particularly focused on direct trade sourcing and ethical and sustainable practices for coffee growers. While the second wave introduced tracing origins, this era further zooms in from tracing countries to tracing the specific farms of origin, and even whether beans come from a single source or a blend of locations. The third wave is known for its lighter roasts and developed flavor notes, manual brewing methods such as pour-overs, and latte art. Recognized as a respected art in the same realm as mixology and the culinary arts, the coffee industry now has its own industry trade shows and global barista competitions.
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