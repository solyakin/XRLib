import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import styles from '../styles/RecentNewsletter.module.css'

const RecentNewsletter = ({ data }) => {

    const [recent, setRecent] = useState([])
    
    useEffect(() => {
    const fetching = async () => {
        try {
            const data = await axios.get('https://xr-speeds-production.up.railway.app/recent')
            const result = data.data; 
            setRecent(result)
        } catch (error) {
            console.log(error)
        }
    }

    fetching()
    }, [])

    const renderList = recent?.slice(0, 3)
    
  return (
    <div className={styles.newletters}>
        <h3>{data.title}</h3>
        <div className={styles.newletterList}>
            {
                renderList && renderList.map(({_id, postUrl, postName, postAuthor, postContent, postLength}) => {
                    return(
                        <Link href={`/newletters/${_id}`} key={_id}>
                            <div className={styles.item}>
                                <img src={postUrl} alt="" className={styles.postImg} />
                                <h4>{`${postName.substr(0, 80)}`}</h4>
                                <p>{`${postContent.substr(0, 160)}...`}</p>
                                <div className={styles.author}>
                                    <img src="/AVATAR.svg" alt="" />
                                    <p>{postAuthor} <span>{`· ${postLength} min read`}</span></p>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
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

