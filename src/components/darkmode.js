import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

const darkmode = () => (
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <label>
            <input
              type="checkbox"
              onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
              checked={theme === 'dark'}
            />{' '}
            Dark Mode
          </label>
        )}
      </ThemeToggler>
)

export default darkmode