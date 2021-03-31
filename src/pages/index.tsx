import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { RichText } from 'prismic-dom';
import { useState } from 'react';
import { FiCalendar, FiUser } from 'react-icons/fi';
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

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [nextPage, setNextPage] = useState(postsPagination.next_page);
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);

  function handlePostsInNextPage() {
    fetch(nextPage)
      .then(response => response.json())
      .then(response => {
        const postsMore: Post[] = response.results.map(post => {
          const dateFormatted = format(
            new Date(post.first_publication_date),
            'dd MMM yyyy',
            {
              locale: ptBR,
            }
          );

          return {
            uid: post.uid,
            data: {
              author: RichText.asText(post.data.author),
              subtitle: RichText.asText(post.data.subtitle),
              title: RichText.asText(post.data.title),
            },
            first_publication_date: dateFormatted,
          };
        });

        setPosts([...posts, ...postsMore]);
        setNextPage(response.next_page);
      });
  }

  return (
    <>
      <Head>
        <title>Início | spacetraveling</title>
      </Head>

      <main className={`${commonStyles.container} ${styles.container}`}>
        <div className={commonStyles.content}>
          <img className={styles.logo} src="/images/logo.svg" alt="logo" />

          <ul className={styles.posts}>
            {posts.map(post => (
              <li key={post.uid}>
                <Link href={`/post/${post.uid}`}>
                  <a>
                    <h1>{post.data.title}</h1>
                    <sub>{post.data.subtitle}</sub>
                    <footer>
                      <time>
                        <FiCalendar />
                        {post.first_publication_date}
                      </time>
                      <p>
                        <FiUser />
                        {post.data.author}
                      </p>
                    </footer>
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          {nextPage?.length && (
            <button
              onClick={handlePostsInNextPage}
              className={styles.morePosts}
              type="button"
            >
              Carregar mais posts
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      page: 1,
    }
  );

  const posts: Post[] = postsResponse.results.map(post => {
    const dateFormatted = format(
      new Date(post.first_publication_date),
      'dd MMM yyyy',
      {
        locale: ptBR,
      }
    );

    return {
      uid: post.uid,
      data: {
        author: post.data.author,
        subtitle: post.data.subtitle,
        title: post.data.title,
      },
      first_publication_date: dateFormatted,
    };
  });

  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  };

  return {
    props: { postsPagination },
    revalidate: 60 * 60, // 1 hour
  };
};
