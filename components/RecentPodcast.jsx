import Link from 'next/link'
import React from 'react'
import styles from '../styles/Recent.module.css'

const RecentPodcast = () => {
  return (
    <div className={styles.recent}>
        <img src="/grid bg.svg" alt="" className={styles.grid_bg} />
        <div className={styles.recent_wrapper}>
            <h3>Recent Podcasts</h3>
            <div className={styles.dflex}>
                <div className={styles.item}>
                    <img src="/profile_3.svg" alt="" className={styles.post_img} />
                    <div className={styles.content}>
                        <h5>How Augmented Reality is Revolutionalizing Education - Ludenso</h5>
                        <p>Do you really need to waste your time learning Web 3 if it is just a failed idea? Intro For the majority of people, Web 3.0 sounds like one more buzzword used to promote crypto scams or get a piece of hype.</p>
                        <img src="/Group 70.svg" alt="" />
                    </div>
                </div>
                <div className={styles.item}>
                    <img src="/profile_3.svg" alt="" className={styles.post_img} />
                    <div className={styles.content}>
                        <h5>How Augmented Reality is Revolutionalizing Education - Ludenso</h5>
                        <p>Do you really need to waste your time learning Web 3 if it is just a failed idea? Intro For the majority of people, Web 3.0 sounds like one more buzzword used to promote crypto scams or get a piece of hype.</p>
                        <img src="/Group 70.svg" alt="" />
                    </div>
                </div>
            </div>
            <div className={styles.button}>
                <button>
                    <Link href='/podcast'>Listen to Podcast</Link>
                </button>
            </div>
        </div>
    </div>
  )
}

export default RecentPodcast