import Head from 'next/head'
import Image from 'next/image';
import { motion, useScroll, useSpring } from "framer-motion";
import styles from '../../styles/Newsletters.module.css';
import Header from '../../components/Header';
import RecentNewsletter from '../../components/RecentNewsletter';
import Footer from '../../components/Footer';

const data = {
  title : "Related topics",
}

const Preview = () => {

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={styles.newletters}>
      <Head>
          <title>XRAtlas</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/xr.jpeg" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
          <link href="https://fonts.googleapis.com/css2?family=Bungee&display=swap" rel="stylesheet"/>
      </Head>
      <main className={styles.preview_wrapper}>
        <motion.div className={styles.progress_bar} style={{ scaleX }} />
        <Header />
        <div className={styles.container}>
          <div className={styles.preview}>
            <div className={styles.author}>
                <Image src='/wepik2.png' width={30} height={30} alt="avatar"/>
                <p>Samuel Johnson</p>
                <p><span>12 Jan 2022</span></p>
            </div>
            <div className={styles.title}>
              <h3>🔥 5 Reasons Why Web 3.0 will Fail?</h3>
              {/* <p>Do you really need to waste your time learning Web 3 if it is just a failed idea?</p> */}
            </div>
            <Image src='/femalegoogle.svg'width={800} height={300} alt="figure" className={styles.articleimg}/>
            <div className={styles.writeup}>
              <h4>Intro</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora mollitia ab, laudantium veniam perferendis vero labore aliquam, harum, quam quos eveniet repellendus ullam dicta iste quia non quae ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora mollitia ab, laudantium veniam perferendis vero labore aliquam, harum, quam quos eveniet repellendus ullam dicta iste quia non quae ut.</p>
              <h4>Web3 as we have it now</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora mollitia ab, laudantium veniam perferendis vero labore aliquam, harum, quam quos eveniet repellendus ullam dicta iste quia non quae ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora mollitia ab, laudantium veniam perferendis vero labore aliquam, harum, quam quos eveniet repellendus ullam dicta iste quia non quae ut.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora mollitia ab, laudantium veniam perferendis vero labore aliquam, harum, quam quos eveniet repellendus ullam dicta iste quia non quae ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora mollitia ab, laudantium veniam perferendis vero labore aliquam, harum, quam quos eveniet repellendus ullam dicta iste quia non quae ut.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora mollitia ab, laudantium veniam perferendis vero labore aliquam, harum, quam quos eveniet repellendus ullam dicta iste quia non quae ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora mollitia ab, laudantium veniam perferendis vero labore aliquam, harum, quam quos eveniet repellendus ullam dicta iste quia non quae ut.</p>
              <h4>Conclusion</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora mollitia ab, laudantium veniam perferendis vero labore aliquam, harum, quam quos eveniet repellendus ullam dicta iste quia non quae ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora mollitia ab, laudantium veniam perferendis vero labore aliquam, harum, quam quos eveniet repellendus ullam dicta iste quia non quae ut.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora mollitia ab, laudantium veniam perferendis vero labore aliquam, harum, quam quos eveniet repellendus ullam dicta iste quia non quae ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora mollitia ab, laudantium veniam perferendis vero labore aliquam, harum, quam quos eveniet repellendus ullam dicta iste quia non quae ut.</p>
             
            </div>
          </div>
            <div className={styles.related}>
              <RecentNewsletter data={data}/>
              <Footer />
            </div>
        </div>
      </main>
    </div>
  )
}

export default Preview