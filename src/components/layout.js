/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import Rrss from "./rrss"

import Header from "./header"
import "./layout.css"

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 0 1.0875rem 1rem;
`

const GatsbyLink = styled.a`
  margin-left: 5px;
`

const GitHubPagesLink = styled.a`
  margin-left: 0px;
`

const Footer = styled.footer`
  padding: 0px;
  margin: 0px;
  display: flex;
  align-content: flex-end;
  justify-content: space-between;
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Content>
          <main>{children}</main>
          <Footer>
            <p>© {new Date().getFullYear()}, Built with {` `} 
              <GatsbyLink href="https://www.gatsbyjs.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Gatsbyjs Link"
              >Gatsby
              </GatsbyLink>
              <span> & </span>
              <GitHubPagesLink href="https://pages.github.com/"
                               target="_blank"
                               rel="noopener noreferrer"
                               title="GitHub Pages Link"
              >GitHub Pages
              </GitHubPagesLink>
            </p>
            <Rrss />
          </Footer>
        </Content>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout