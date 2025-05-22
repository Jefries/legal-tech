import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      secondary: string
      background: string
      foreground: string
      error: string
      text: string
      lightGreen: string
    }
    breakpoints: {
      mobile: string
      tablet: string
      desktop: string
    }
    fonts: {
      body: string
      mono: string
    }
  }
}
