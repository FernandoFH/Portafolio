import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { FaSun, FaMoon } from 'react-icons/fa';
import styled from '@emotion/styled';

const Ball = styled.div`
  background-color: #fff;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  height: 22px;  
  width: 22px;
  transition: transform 0.2s linear; 
`

const darkmode = () => (
  <ThemeToggler>
  {({ theme, toggleTheme }) => (
    <label for="checkbox">
      <FaSun size="15" color= '#f39c12'  />
      <FaMoon size="15" color= '#f1c40f'/>
      <Ball />
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