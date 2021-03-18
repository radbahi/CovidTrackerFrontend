import styled from 'styled-components'
import { Figure } from 'react-bootstrap'
import RedPic from '../pictures/MYPIC.jpeg'
import KevinPic from '../pictures/KEVINPIC.jpeg'
import githublogo from '../pictures/githublogo.webp'
import linkedinlogo from '../pictures/linkedinlogo.png'

const StyledAboutUs = styled.div``

const AboutUs = () => {
  return (
    <StyledAboutUs>
      <div className='about-div'>
      <h1 className='about-title'>Who we are</h1>
      <p className='about-intro'>
        Hello! Welcome to the About Us page! We are Kevin Gleeson and Radouane
        Bahi (please call me Red, instead). We're both graduates from the
        Flatiron School and decided to team up to make this COVID-19 tracker.
      </p>
      </div>
      <div className='figure-container'>
      <Figure>
        <Figure.Image width={171} height={180} alt='redpic' src={RedPic} style={{borderRadius: "10px"}} />
        <br />
        <a href='https://github.com/radbahi' target='_blank' rel='noreferrer'>
          <Figure.Image width={32} height={32} alt='github' src={githublogo} />
        </a>
        <a
          href='https://www.linkedin.com/in/radouane-bahi-5410a1137/'
          target='_blank'
          rel='noreferrer'
        >
          {" "}
          <Figure.Image
            width={32}
            height={32}
            alt='linkedin'
            src={linkedinlogo}
          />
        </a>
        <Figure.Caption >
          Radouane 'Red' Bahi. This was originally my final project for Flatiron
          but I was still unhappy with how it turned out. I started all over and
          the final product is much better in my opinion. 
        </Figure.Caption>
      </Figure>
      <br />
      <Figure>
        <Figure.Image width={171} height={180} alt='kevinpic' src={KevinPic} style={{borderRadius: "10px"}} />
        <br />
        <a
          href='https://github.com/teapuddles'
          target='_blank'
          rel='noreferrer'
        >
          <Figure.Image width={32} height={32} alt='github' src={githublogo} />
        </a>
        {" "}
        <a
          href='https://www.linkedin.com/in/teapuddles824/'
          target='_blank'
          rel='noreferrer'
        >
          <Figure.Image
            width={32}
            height={32}
            alt='linkedin'
            src={linkedinlogo}
          />
        </a>
        <Figure.Caption>Kevin Gleeson. I'm a full stack developer, former music teacher,
           and life long learner. I was thrilled to work with Red on this project. Check out
           my socials and give me an add! 
        </Figure.Caption>
      </Figure>
      <br/>
      </div>
      <div className='logo-credit' href='https://pngtree.com/so/3d'>Globe Logo from Pngtree</div>
      <div className='logo-credit'>Contact UX Designer{' '}
          {
            <a className='ux-link'
              href='mailto:alfonsolibron@gmail.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Alfonso Libron
            </a>
          }{' '}
          for his design for this project.
        </div>
    </StyledAboutUs>
  )
}

export default AboutUs
