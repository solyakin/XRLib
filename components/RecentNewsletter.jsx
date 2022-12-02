import Link from 'next/link'
import React from 'react'
import styles from '../styles/RecentNewsletter.module.css'

const RecentNewsletter = ({data}) => {
  return (
    <div className={styles.newletters}>
        <h3>{data.title}</h3>
        <div className={styles.newletterList}>
            <div className={styles.item}>
                <img src="/profile_3.svg" alt="" />
                <h4>🔥 5 Reasons Why Web 3.0 will Fail?</h4>
                <p>Do you really need to waste your time learning Web 3 if it is just a failed idea? Intro For the majority of people, Web 3.0 sounds like one more buzzword used to promote crypto scams or get a piece of hype. For others — it is decentralized web applications where…</p>
                <div className={styles.author}>
                    <img src="/AVATAR.svg" alt="" />
                    <p>Author’s Name <span>· 2 min read</span></p>
                </div>
            </div>
            <div className={styles.item}>
                <img src="/profile_3.svg" alt="" />
                <h4>🔥 5 Reasons Why Web 3.0 will Fail?</h4>
                <p>Do you really need to waste your time learning Web 3 if it is just a failed idea? Intro For the majority of people, Web 3.0 sounds like one more buzzword used to promote crypto scams or get a piece of hype. For others — it is decentralized web applications where…</p>
                <div className={styles.author}>
                    <img src="/AVATAR.svg" alt="" />
                    <p>Author’s Name <span>· 2 min read</span></p>
                </div>
            </div>
            <div className={styles.item}>
                <img src="/profile_3.svg" alt="" />
                <h4>🔥 5 Reasons Why Web 3.0 will Fail?</h4>
                <p>Do you really need to waste your time learning Web 3 if it is just a failed idea? Intro For the majority of people, Web 3.0 sounds like one more buzzword used to promote crypto scams or get a piece of hype. For others — it is decentralized web applications where…</p>
                <div className={styles.author}>
                    <img src="/AVATAR.svg" alt="" />
                    <p>Author’s Name <span>· 2 min read</span></p>
                </div>
            </div>
        </div>
        <div className={styles.readmore}>
            <button>
                <Link href='/newletters'>Read Newsletters</Link>
            </button>
        </div>
    </div>
  )
}

export default RecentNewsletter