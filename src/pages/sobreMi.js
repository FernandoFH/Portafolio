import React from 'react'
import Timeline from '../components/timeline'

import Layout from "../components/layout"
import SEO from "../components/seo"

const sobreMi = () => (
    <Layout>
      <SEO title="sobreMi" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Sobre mí</h1>
      <Timeline /> 
    </Layout>
  )
  
  export default sobreMi