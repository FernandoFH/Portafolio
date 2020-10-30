import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { FaSun, FaMoon } from 'react-icons/fa';

const darkmode = () => (
  <ThemeToggler>
  {({ theme, toggleTheme }) => (
    <label for="checkbox">
      <FaSun size="15" color= '#f39c12'  />
      <FaMoon size="15" color= '#f1c40f'/>
       <input
        type="checkbox"
        onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
        checked={theme === 'dark'}
      />{' '}
    </label>
  )}
</ThemeToggler>
)

export default darkmode 