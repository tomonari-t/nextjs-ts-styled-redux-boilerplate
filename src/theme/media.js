import { css } from 'styled-components'

export const media = {
  lg: (...args) => css`
    @media (min-width: 1040px) {
      ${css(...args)}
    }
  `,
  md: (...args) => css`
    @media (min-width: 480px) and (max-width: 1039px) {
      ${css(...args)}
    }
  `,
  mdsp: (...args) => css`
    @media (max-width: 1039px) {
      ${css(...args)}
    }
  `,
  sp: (...args) => css`
    @media (max-width: 479px) {
      ${css(...args)}
    }
  `,
}
