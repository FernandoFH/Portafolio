import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { FaSun, FaMoon } from 'react-icons/fa';
import styled from '@emotion/styled';


const Checkbox = styled.div`
  opacity: 0;
  position: absolute;
`

const Label = styled.div`
  background-color: #111;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  border-radius: 50px;
  position: relative;
  padding: 5px;
  height: 26px;
  width: 50px;
  transform: scale(1.5);
`

const Ball = styled.div`
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  height: 22px;  
  width: 22px;
  transition: transform 0.2s linear; 
  
    :hover {
      transform: translateX(24px);
  }
`

const darkmode = () => (
  <ThemeToggler>
  {({ theme, toggleTheme }) => (
    <Label>
      <FaSun size="15" color= '#f39c12'  />
      <FaMoon size="15" color= '#f1c40f'/>
       <Checkbox/>{' '}
       <Ball />
    </Label>
)}
</ThemeToggler>
)

export default darkmode 