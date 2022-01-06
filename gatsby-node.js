const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Create Blog Post Pages

  // Define a template for blog post
  const blogPost = path.resolve('./src/templates/blog-post.js')

  const blogPostResult = await graphql(
    `
      {
        allContentfulBlogPost {
          nodes {
            title
            slug
          }
        }
      }
    `
  )

  if (blogPostResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      blogPostResult.errors
    )
    return
  }

  const posts = blogPostResult.data.allContentfulBlogPost.nodes

  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostSlug = index === 0 ? null : posts[index - 1].slug
      const nextPostSlug =
        index === posts.length - 1 ? null : posts[index + 1].slug

      createPage({
        path: `/blog/${post.slug}/`,
        component: blogPost,
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })
  }

  // Create Static Pages

   // Define a template for static pages
  const pageTemplate = path.resolve('./src/templates/page.js')

  const pageResult = await graphql(
    `
      {
        allContentfulPage {
          nodes {
            title
            slug
          }
        }
      }
    `
  )

  if (pageResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful static pages`,
      pageResult.errors
    )
    return
  }

  const pages = pageResult.data.allContentfulPage.nodes

  // Create static pages
  // But only if there's at least one found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (pages.length > 0) {
    pages.forEach((page, index) => {

      createPage({
        path: `/${page.slug}/`,
        component: pageTemplate,
        context: {
          slug: page.slug,
        },
      })
    })
  }
}
