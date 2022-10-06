// https://github.com/ben-rogerson/twin.examples/tree/master/next-styled-components-typescript#add-the-global-styles

// Due to an issue in styled-components, global styles get added in the wrong
// order when using styled-components. This gives the tailwind base styles an
// incorrect specificity.
// Until the issue is fixed, the workaround is to export the styles from
// another file.

import { createGlobalStyle } from 'styled-components'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle`
  body {
    ${tw`antialiased`};
		background-color: ${theme`colors[cionic-sky]`}
		
  }
`

const GlobalStyles = () => (
	<>
		<BaseStyles />
		<CustomStyles />
	</>
)

export default GlobalStyles
