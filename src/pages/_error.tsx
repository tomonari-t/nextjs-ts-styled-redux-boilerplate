import styled from 'styled-components'
import { misThemeColor } from '../theme'
import Link from 'next/link'

const NotFound = () => {
  return (
    <Container>
      <Logo>
        <img src='/static/image/logo_white.svg' />
      </Logo>
      <Title>404</Title>
      <TitleText>ご指定のページが見つかりません</TitleText>
      <Description>
        ご指定のページは削除されたか、
        <br />
        移動した可能性がございます。
      </Description>
      <Link href='/'>
        <ToTopButton>
          <ToTopButtonText>トップページへ</ToTopButtonText>
        </ToTopButton>
      </Link>
      <CopyRight>Copyright © Makuake, Inc. All Rights Reserved.</CopyRight>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(53, 57, 70, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Logo = styled.div`
  width: 242px;
  margin-bottom: 120px;
`

const Title = styled.h1`
  color: ${misThemeColor.white};
  font-size: 90px;
  font-weight: 100;
  margin-bottom: 40px;
`

const TitleText = styled.h2`
  color: ${misThemeColor.white};
  font-size: 25px;
  margin-bottom: 20px;
`

const Description = styled.p`
  color: ${misThemeColor.white};
  font-size: 18px;
  line-height: 2;
  text-align: center;
  letter-spacing: 0.1em;
  margin-bottom: 56px;
`

const ToTopButton = styled.a`
  border: 1px solid rgba(167, 167, 167, 1);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 15px 45px;
  margin-bottom: 56px;
`

const ToTopButtonText = styled.span`
  font-size: 17px;
  color: ${misThemeColor.white};
`

const CopyRight = styled.small`
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.1em;
  color: rgba(232, 232, 232, 1);
`

export default NotFound
