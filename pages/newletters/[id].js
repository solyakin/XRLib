import Head from 'next/head'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { motion, useScroll, useSpring } from "framer-motion";
import styles from '../../styles/Newsletters.module.css';
import Header from '../../components/Header';
import RecentNewsletter from '../../components/RecentNewsletter';
import Footer from '../../components/Footer';
import { months, weekday } from '../../utils/monthList';
import PostsService from '../../services/posts/posts.service';
import { Avatar } from '@chakra-ui/react';
import Link from 'next/link';

const info = {
  title : "Related topics",
}

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
      if (id){
      const data = await PostsService.getPublishedPostBySlug(id)
      const result = data; 
      setPost(result)
      }
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
          <meta name="description" content="XR Atlas focuses on exploring Extended Reality(XR), Artificial intelligence (AI), and Metaverse technologies, to better understand how these technologies are shaping the collective future of the human race!"></meta>
          <meta property="og:title" content="Exploring extended reality, aritificial intelligence and Meteverse"></meta>
          <meta property="og:description" content="XR Atlas focuses on exploring Extended Reality(XR), Artificial intelligence (AI), and Metaverse technologies, to better understand how these technologies are shaping the collective future of the human race!"></meta>
          <meta property="og:url" content="https://xratlas.vercel.app/"></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:image" content="https://xratlas.vercel.app/Group%2073.svg"></meta>
          <meta property="og:image:secure_url" content="https://xratlas.vercel.app/Group%2073.svg"></meta>
          <meta property="og:image:width" content="1200"></meta>
          <meta property="og:image:height" content="628"></meta>
          <meta property="og:image:alt" content="XR Atlas logo"></meta>
          <meta property="og:image:type" content="image/svg"></meta>
          <link rel="icon" href="/icon-xra.png" />
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
                       <Link href={`../p/${post.author.displayName}`}> <p>{post.author.displayName}</p></Link>
                        <p><span>{`${weekday[dy]} ${day} ${months[month]} ${year} `}</span></p>
                    </div>
                    <div className={styles.title}>
                      <h3>{post.title}</h3>
                    </div>
                    {
                      post.thumbnailUrl && <img src={post.thumbnailUrl} width={800} height={300} alt="figure" className={styles.articleimg}/>
                    }
                    {
                      !post.thumbnailUrl && <Image src='/femalegoogle.png'width={800} height={300} alt="figure" className={styles.articleimg}/>
                    }
                      <div className={styles.writeup} dangerouslySetInnerHTML={{__html:post.content}}>
                    </div>
                  </div>}
            <div className={styles.related}>
              <RecentNewsletter info={info}/>
              <Footer />
            </div>
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
