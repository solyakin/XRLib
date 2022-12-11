import React from 'react'
import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.footer_wrapper}>
            <h3>Sign up for <br></br>the XR Atlas newsletter</h3>
            <p>Are you curious about the latest trends and developments in the world of XR, AI, and other emerging technologies? Then sign up for our newsletter and get a regular dose of insights, news, and inspiration delivered straight to your inbox. We’ll not spam you we promise.</p>
            <div className={styles.email_wrapper}>
                <input type="text" placeholder='Enter your email address.' />
                <img src="/Vector (8).svg" alt="" />
            </div>

            <button onClick={() => window.scrollTo(0,0)}>
                <span>Back to the top</span>
                <img src="/Frame (1).svg" alt="" />
            </button>
            <div className={styles.copyright}>
                <p>©2022 All right reserved</p>
                <ul>
                    <li>Twitter</li>
                    <li>Discord</li>
                    <li>Linkedin</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer