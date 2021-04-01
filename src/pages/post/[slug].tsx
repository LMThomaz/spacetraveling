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
}

export default function Post({ post }: PostProps): JSX.Element {
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
            <small>* editado em 19 mar 2021, às 15:49</small>
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
            <Link href="/posts/slug-pagina">
              <a>
                <p>Como utilizar Hooks</p>
                <span>Post anterior</span>
              </a>
            </Link>
            <Link href="/posts/slug-pagina">
              <a>
                <p>Criando um app CRA do Zero</p>
                <span>Próximo post</span>
              </a>
            </Link>
          </div>
          <Comments />
          <ButtonPreview />
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

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  console.log(response);

  const post = {
    data: {
      author: response.data.author,
      subtitle: response.data.subtitle,
      title: response.data.title,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content,
    },
    first_publication_date: response.first_publication_date,
    uid: response.uid,
  };

  return {
    props: {
      post,
      revalidate: 60 * 60 * 24, // 24 hours
    },
  };
};
