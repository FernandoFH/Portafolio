import React from "react"
import styled from "@emotion/styled"
import {
  FaGithubSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaDev,
  FaMedium,
  FaCaretSquareDown
} from "react-icons/fa"

const Rrss = styled.ul`
  margin-left: 15px;
  text-decoration: none;
  display: inline-block;
  position: relative;
`
export default function rrss() {
  return (
    <div>
      <ul>
        <Rrss>
          <a
            href="https://www.linkedin.com/in/fernandoh/"
            target="_blank"
            rel="noopener noreferrer"
            title="Linkedin Fernando H"
          >
            <FaLinkedin size="20" />
          </a>
        </Rrss>

        <Rrss>
          <a
            href="https://dev.to/fernandofh"
            target="_blank"
            rel="noopener noreferrer"
            title="Dev.to fernandofh"
          >
            <FaDev size="20" />
          </a>
        </Rrss>

        <Rrss>
          <a
            href="https://medium.com/@FernandoFH"
            target="_blank"
            rel="noopener noreferrer"
            title="Medium fernandofh"
          >
            <FaMedium size="20" />
          </a>
        </Rrss>

        <Rrss>
          <a
            href="https://twitter.com/fernandof_h"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter Fernando H"
          >
            <FaTwitterSquare size="20" />
          </a>
        </Rrss>

        <Rrss>
          <a
            href="https://github.com/FernandoFH"
            target="_blank"
            rel="noopener noreferrer"
            title="Github Fernando H"
          >
            <FaGithubSquare size="20" />
          </a>
        </Rrss>

        <Rrss>
          <a
            href="https://drive.google.com/file/d/1BSnlGQCl51u1-Ug2oNsspxXGPdt-xA0P/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            title="CV Fernando H"
          >
            <FaCaretSquareDown size="20" />
          </a>
        </Rrss>
      </ul>
    </div>
  )
}
