import Link from 'next/link'
import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styles from '../styles/Recent.module.css'

const RecentPodcast = ({podcasts}) => {

  return (
    <div className={styles.recent}>
        <img src="/grid bg.svg" alt="" className={styles.grid_bg} />
        <div className={styles.recent_wrapper}>
            <h3>Recent Podcasts</h3>
            <div className={styles.dflex}>
                {
                    podcasts && podcasts.slice(0, 2).map(({title, contentSnippet, enclosure}) => {
                        return(
                            <div className={styles.item}>
                                <img src="/profile_3.svg" alt="" className={styles.post_img} />
                                <div className={styles.content}>
                                    <h5>{title}</h5>
                                    <p>{`${contentSnippet.substr(0, 220)} ...`}</p>
                                    <div className={styles.audio}>
                                            <AudioPlayer
                                            src={enclosure.url}
                                            onPlay={e => console.log("onPlay")}
                                            style={{borderRadius : "45px", background : "rgba(255, 255, 255, 0.1)", border : "1px solid rgba(255, 255, 255, 0.1)"}}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
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