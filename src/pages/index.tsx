import Prismic from '@prismicio/client';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import { FiUser, FiCalendar } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Início | spacetraveling</title>
      </Head>

      <main className={`${commonStyles.container} ${styles.container}`}>
        <div className={commonStyles.content}>
          <img
            className={styles.logo}
            src="/images/logo.svg"
            alt="Space Traveling"
          />

          <ul className={styles.posts}>
            <li>
              <h1>Como utilizar hooks</h1>
              <sub>Pensando em sincronização em vez de ciclos de vida.</sub>
              <footer>
                <time>
                  <FiCalendar />
                  15 Mar 2021
                </time>
                <p>
                  <FiUser />
                  Joseph Oliveira
                </p>
              </footer>
            </li>
            <li>
              <h1>Como utilizar hooks</h1>
              <sub>Pensando em sincronização em vez de ciclos de vida.</sub>
              <footer>
                <time>
                  <FiCalendar />
                  15 Mar 2021
                </time>
                <p>
                  <FiUser />
                  Joseph Oliveira
                </p>
              </footer>
            </li>
            <li>
              <h1>Como utilizar hooks</h1>
              <sub>Pensando em sincronização em vez de ciclos de vida.</sub>
              <footer>
                <time>
                  <FiCalendar />
                  15 Mar 2021
                </time>
                <p>
                  <FiUser />
                  Joseph Oliveira
                </p>
              </footer>
            </li>
            <li>
              <h1>Como utilizar hooks</h1>
              <sub>Pensando em sincronização em vez de ciclos de vida.</sub>
              <footer>
                <time>
                  <FiCalendar />
                  15 Mar 2021
                </time>
                <p>
                  <FiUser />
                  Joseph Oliveira
                </p>
              </footer>
            </li>
          </ul>

          <button className={styles.morePosts} type="button">
            Carregar mais posts
          </button>
        </div>
      </main>
    </>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const prismic = getPrismicClient();
//   const postsResponse = await prismic.query(
//     [Prismic.predicates.at('document.type', 'posts')],
//     {
//       fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
//       page: 1,
//       pageSize: 20,
//     }
//   );

//   const results: Post[] = postsResponse.results.map(post => {
//     return {
//       uid: post.uid,
//       data: {
//         author: RichText.asText(post.data.author),
//         subtitle: RichText.asText(post.data.subtitle),
//         title: RichText.asText(post.data.title),
//       },
//       first_publication_date: new Date(
//         post.last_publication_date
//       ).toLocaleDateString('pt-BR', {
//         day: '2-digit',
//         month: 'long',
//         year: 'numeric',
//       }),
//     };
//   });

//   const posts: PostPagination = {
//     next_page: '1',
//     results,
//   };

//   return {
//     props: { posts },
//   };
// };
