import styles from "./style.module.css";
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import Head from "next/head";

const name = "Your Name";
export const siteTitle = "Next.js Sample Website";

export default function Layout({ children, home, asyncData = [] }) {
  return (
    <div className={styles.container}>
      <Head>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.png"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              {/* <a> */}
                <img
                  src="/images/profile.png"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                />
              {/* </a> */}
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <span className={utilStyles.colorInherit}>{name}</span>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      <div>
        {
          asyncData.map(item => <div>哈哈哈</div>)
        }
      </div>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <span>← Back to home</span>
          </Link>
        </div>
      )}
    </div>
  );
}
