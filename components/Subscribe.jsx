import React from 'react'
import styles from '../styles/Subscribe.module.css'

const Subscribe = () => {
  return (
    <div className={styles.subscribe}>
        <div className={styles.wrapper}>
            <h4>Sign up for the XR Atlas newletter</h4>
            <p>We’ll only send you relevant information on new innovations and technologies in the VR space, updates to exisiting discoveries, interviews, tools or other initiatives associated with XR community.</p>
            <form action="" className={styles.form}>
                <input type="text" placeholder='YOUR EMAIL'/>
                <button>SIGN UP</button>
            </form>
        </div>
        <div className={styles.social}>
            <p>FOLLOW US :</p>
            <div className={styles.logos}>
                <a href="">TWITTER</a>
                <a href="https://www.linkedin.com/newsletters/xr-atlas-6897026405473812480/">LINKEDIN</a>
                <a href="">DISCORD</a>
            </div>
        </div>
    </div>
  )
}

export default Subscribe