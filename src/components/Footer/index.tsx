import React from 'react'
import { misThemeColor, font } from '../../theme'
import Link from 'next/link'
import styled from 'styled-components'

const Footer = () => {
  return (
    <Container>
      <LinkContainer>
        <Link href='/about'>
          <FooterLink>About</FooterLink>
        </Link>
      </LinkContainer>
      <LinkContainer>
        <Link href='/works'>
          <FooterLink>Works</FooterLink>
        </Link>
      </LinkContainer>
      <LinkContainer>
        <Link href='/blogs'>
          <FooterLink>Blogs</FooterLink>
        </Link>
      </LinkContainer>
      <LinkContainer>
        <FooterLink
          href='https://www.wantedly.com/companies/makuake'
          target='_blank'
        >
          Recruit
        </FooterLink>
      </LinkContainer>
    </Container>
  )
}

const Container = styled.footer`
  background-color: ${misThemeColor.navy};
  padding: 40px;
`

const LinkContainer = styled.div`
  margin: 24px;
`

const FooterLink = styled.a`
  color: ${misThemeColor.white};
  cursor: pointer;
  ${font.pcH3}
`

export default Footer
