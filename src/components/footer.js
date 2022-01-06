import React from 'react'
import { Link } from 'gatsby'

import Container from './container'
import * as styles from './footer.module.css'

const Footer = () => (
  <Container as="footer">
    <div className={styles.container}>
      <span>
        <Link to="/" className={styles.logoLink}>
          <span className={styles.logo} />
        </Link>
      </span>
      <span>
        Copyright © 2022 Tea Shack.<br />
        <Link to="/privacy-policy">Privacy Policy</Link> &middot;{' '}
        <Link to="/terms-of-use">Terms of Use</Link> &middot;{' '}
        <Link to="/affiliate-disclosure">Affiliate Disclosure</Link>
      </span>
    </div>
  </Container>
)

export default Footer
