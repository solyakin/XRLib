import Link from 'next/link'
import React from 'react'
import styles from '../styles/RecentNewsletter.module.css'
import PostsService from '../services/posts/posts.service'
import { Avatar } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

const RecentNewsletter = ({ info }) => {
    const { data } = useQuery({
        queryKey: ['recent-posts'], queryFn: async () => {
            return await PostsService.getRecentPosts()
        }, onSuccess: (data) => {
        },
    })

    return (
        <div className={styles.newletters}>
            <h3>{info?.title}</h3>
            <div className={styles.newletterList}>
                {
                    data && data.map(({ id, thumbnailUrl, author, title, contentText, readMinutes }) => {
                        return (
                            <div className={styles.list_wrapper} key={id}>
                                <Link href={`/newletters/${id}`}>
                                    <div className={styles.item}>
                                        {
                                            thumbnailUrl && <img src={thumbnailUrl} width={500} height={300} alt="figure" className={styles.postimg}/>
                                        }
                                        {
                                            !thumbnailUrl && <Image src='/femalegoogle.png'width={500} height={300} alt="figure" className={styles.postimg}/>
                                        }
                                        {/* <img src={thumbnailUrl} alt="" className={styles.postImg} /> */}
                                        <h4>{`${title}`}</h4>
                                        <p>{`${contentText?.substr(0, 160)}...`}</p>
                                        <div className={styles.author}>
                                            <Avatar src={author.profileImageUrl} name={author.displayName} size="sm"/>
                                            <p>{author.displayname} <span>{`· ${readMinutes} min read`}</span></p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
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

