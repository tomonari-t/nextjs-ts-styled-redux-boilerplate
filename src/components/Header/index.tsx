import React from 'react'
import styled from 'styled-components'
import { misThemeColor, font } from '../../theme'

const Header = () => {
  return (
    <Container>
      <PcContainer>
        <LogoContainer>
          <img src='/static/image/logo_color.png' />
        </LogoContainer>
        <WantedlyButton
          href='https://www.wantedly.com/companies/makuake'
          target='_blank'
        >
          <WantedlyText>話を聞いてみる</WantedlyText>
        </WantedlyButton>
      </PcContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  position: relative;
`

const PcContainer = styled.div`
  display: flex;
  align-items: center;
`

const LogoContainer = styled.div`
  width: 65px;
`

const WantedlyButton = styled.a`
  background-color: ${misThemeColor.primary};
  border-radius: 4px;
  padding: 8 px 32px;
`

const WantedlyText = styled.span`
  color: ${misThemeColor.white};
  ${font.pcP}
`

export default Header
