import React from 'react'
import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.footer_wrapper}>
            <h3>Sign up for <br></br>the XR Atlas newsletter</h3>
            <p>We’ll only send you relevant information on new innovations and technologies in the VR space, updates to exisiting discoveries, interviews, tools or other initiatives associated with XR community.</p>
            <div className={styles.email_wrapper}>
                <input type="text" placeholder='Enter your email address.' />
                <img src="/Vector (8).svg" alt="" />
            </div>

            <button>
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