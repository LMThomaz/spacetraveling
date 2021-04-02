import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import ButtonPreview from '../../components/ButtonPreview';
import Comments from '../../components/Comments';
import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  last_publication_date: string | null;
  uid: string;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
  nextPost: Post | null;
  prevPost: Post | null;
  preview: boolean;
}

export default function Post({
  post,
  preview,
  nextPost,
  prevPost,
}: PostProps): JSX.Element {
  const router = useRouter();

  const timeForReading = post.data.content.reduce((wordInPost, content) => {
    const { heading } = content;
    const headingLength = heading.split(' ').length;

    const bodyLength = content.body.reduce((wordInBody, body) => {
      return wordInBody + body.text.split(' ').length;
    }, 0);

    const contentWord = headingLength + bodyLength;

    return wordInPost + contentWord;
  }, 0);

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Head>
        <title>{post.data.title} | spacetraveling</title>
      </Head>
      <Header />
      <main className={commonStyles.container}>
        <img
          className={styles.banner}
          src={post.data.banner.url}
          alt="banner"
        />
        <section className={`${commonStyles.content} ${styles.post}`}>
          <header>
            <h1>{post.data.title}</h1>
            <p>
              <time>
                <FiCalendar />
                {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
                  locale: ptBR,
                })}
              </time>
              <span>
                <FiUser />
                {post.data.author}
              </span>
              <span>
                <FiClock />
                {`${Math.ceil(timeForReading / 200)} min`}
              </span>
            </p>
            {post?.last_publication_date &&
              post.last_publication_date !== post.first_publication_date && (
                <small>
                  * editado em{' '}
                  {format(new Date(post.last_publication_date), 'dd MMM yyyy', {
                    locale: ptBR,
                  })}
                  , às{' '}
                  {format(new Date(post.last_publication_date), 'HH:mm', {
                    locale: ptBR,
                  })}
                </small>
              )}
          </header>
          {post.data.content.map(content => (
            <article key={content.heading}>
              <h2>{content.heading}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(content.body),
                }}
              />
            </article>
          ))}
        </section>

        <footer className={styles.footer}>
          <div className={styles.links}>
            {prevPost && (
              <Link href={`/post/${prevPost.uid}`}>
                <a className={styles.prevPost}>
                  <p>{prevPost.data.title}</p>
                  <span>Post anterior</span>
                </a>
              </Link>
            )}

            {nextPost && (
              <Link href={`/post/${nextPost.uid}`}>
                <a className={styles.nextPost}>
                  <p>{nextPost.data.title}</p>
                  <span>Próximo post</span>
                </a>
              </Link>
            )}
          </div>
          <Comments />
          <ButtonPreview exit={preview} />
        </footer>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query([
    Prismic.Predicates.at('document.type', 'posts'),
  ]);

  const paths = posts.results.map(post => ({
    params: { slug: post.uid },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  previewData,
  params,
}) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {
    ref: previewData?.ref ?? null,
  });

  const nextPost = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      pageSize: 1,
      orderings: '[document.first_publication_date]',
      after: response.id,
      before,
    }
  );

  const prevPost = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      pageSize: 1,
      orderings: '[document.first_publication_date desc]',
      after: response.id,
    }
  );

  return {
    props: {
      preview,
      post: response,
      nextPost: nextPost.results[0] ?? null,
      prevPost: prevPost.results[0] ?? null,
    },
    revalidate: 60 * 60 * 8, // 8 hours
  };
};
