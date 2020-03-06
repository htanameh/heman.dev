import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Container, Button } from 'components/common'
import dev from 'assets/illustrations/skills.svg'
import { Wrapper, SkillsWrapper, Details, Thumbnail } from './styles'

export const Skills = () => (
  <Wrapper id="about">
    <SkillsWrapper as={Container}>
      <Thumbnail>
        <img src={dev} alt="I’m Hemanath and I’m a Full Stack Web Developer!" />
      </Thumbnail>
      <Details>
        <h1>Hello!</h1>
        <p>
          I have a passion for web development and love to create web applications, I like to keep it simple and i know how to create websites to run across devices using the latest technologies available.
        </p>
        <Button as={AnchorLink} href="#contact">
          Hire me
        </Button>
      </Details>
    </SkillsWrapper>
  </Wrapper>
)
