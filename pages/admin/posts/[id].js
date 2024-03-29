import Head from 'next/head'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { motion, useScroll, useSpring } from "framer-motion";
import styles from '../../../styles/Newsletters.module.css';
import Header from '../../../components/Header';
import { months, weekday } from '../../../utils/monthList';
import PostsService from '../../../services/posts/posts.service';
import { Avatar } from '@chakra-ui/react';



const Preview = () => {

  const router = useRouter();
  const { id } = router.query;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [post, setPost] = useState(null)
  

  useEffect(() => {
    const fetching = async () => {
      const data = await PostsService.getPost(id)
      const result = data; 
      setPost(result)
    }
    fetching()
  }, [id])
  
 const newDate = post && post.createdAt.toDate();
 let dummyDate = new Date();
 const [month, day, year, dy] = post ? [newDate.getMonth(), newDate.getDate(), newDate.getFullYear(), newDate.getDay()]: [dummyDate.getMonth(), dummyDate.getDate(), dummyDate.getFullYear(), dummyDate.getDay()];

  return (
    <div className={styles.newletters}>
      <Head>
          <title>XRAtlas</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/xr.jpeg" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
      </Head>
      <main className={styles.preview_wrapper}>
        <motion.div className={styles.progress_bar} style={{ scaleX }} />
        <Header />
        <div className={styles.c}>
                 { post && <div className={styles.preview} key={post.id}>
                    <div className={styles.author}>
                        <Avatar src={post.author.profileImageUrl} size={"sm"} alt="avatar"/>
                        <p>{post.author.displayName}</p>
                        <p><span>{`${weekday[dy]} ${day} ${months[month]} ${year} `}</span></p>
                    </div>
                    <div className={styles.title}>
                      <h3>{post.title}</h3>
                    </div>
                    {
                      post.thumbnailUrl && <img src={post.thumbnailUrl} width={800} height={300} alt="figure" className={styles.articleimg}/>
                    }
                    {
                      !post.thumbnailUrl && <Image src='/femalegoogle.svg'width={800} height={300} alt="figure" className={styles.articleimg}/>
                    }
                      <div className={styles.writeup} dangerouslySetInnerHTML={{__html:post.content}}>
                    </div>
                  </div>}
           
        </div>
      </main>
    </div>
  )
}

export default Preview

// export async function getStaticPaths(){

//   const data = await axios.get(`${baseUrl}`)
//   const result = data.data; 
//   const paths = result.map(({_id}) => {
//     return{
//       params : {
//         id : `${_id}`
//       }
//     }
//   })
//   return{
//     paths : paths,
//     fallback : false
//   }
// }

// export async function getStaticProps(context){
//   const { params } = context
//   try {
//       const data = await axios.get(`${baseUrl}`)
//       const result = data.data; 
//       console.log(result)
//       return { 
//           props : { post : result }
//        }
       
//     } catch (error) {
//         console.log(error)
//     }
// }
