import React from 'react'
import Timeline from '../components/timeline'

import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from "@emotion/styled"

const Contact  = styled.contact`
  padding: 0px;
  margin: 0px;
  display: flex;
  align-content: flex-end;
  justify-content: space-between;
  background-color: #595d64;
  border-radius: 5%;
`

const sobreMi = () => (
    <Layout>
      <SEO title="sobreMi" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Sobre mí</h1>
      <Timeline /> 
      <Contact />
    </Layout>
  )
  
  export default sobreMi