import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from 'uikit-layer2'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: inherit;
    letter-spacing: 0.1em !important;
  }
  @font-face {
    font-family: "Poly";
    src: url(/fonts/poly/Quivira.otf);
  } 
  body {
    background-color: ${({ theme }) => theme.colors.background};
    font-family: Poly;

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
