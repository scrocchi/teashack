import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
// import Hero from '../components/hero'
// import Tags from '../components/tags'
import * as styles from './page.module.css'

class PageTemplate extends React.Component {
  render() {
    const page = get(this.props, 'data.contentfulPage')
    const title = page.title
    const description = page.description?.childMarkdownRemark?.excerpt

    return (
      <Layout location={this.props.location}>
        <Seo
          title={page.title}
          description={page.description.childMarkdownRemark.excerpt}
        //   image={`http:${page.heroImage.resize.src}`}
        />
        <div className={styles.container}>
          <div className={styles.heading}>
            <h1 className={styles.title}>{title}</h1>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          <div className={styles.article}>
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{
                __html: page.body?.childMarkdownRemark?.html,
              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug(
    $slug: String!
  ) {
    contentfulPage(slug: { eq: $slug }) {
      slug
      title
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
      body {
        childMarkdownRemark {
          html
          timeToRead
        }
      }
      description {
        childMarkdownRemark {
          excerpt
        }
      }
    }
  }
`
