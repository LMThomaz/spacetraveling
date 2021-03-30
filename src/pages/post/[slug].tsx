import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
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

export default function Post(): JSX.Element {
  return (
    <>
      <Head>
        <title>Post | spacetraveling</title>
      </Head>
      <Header />
      <main className={commonStyles.container}>
        <img
          className={styles.banner}
          src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="banner"
        />
        <section className={`${commonStyles.content} ${styles.post}`}>
          <header>
            <h1>Criando um app CRA do zero</h1>
            <p>
              <time>
                <FiCalendar />
                15 Mar 2021
              </time>
              <span>
                <FiUser />
                Leonardo Thomaz
              </span>
              <span>
                <FiClock /> 4 min
              </span>
            </p>
          </header>
          <article>
            <h2>Proin et varius</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>
              Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit
              tellus. Nam facilisis sodales felis, pharetra pharetra lectus
              auctor sed.
            </p>
            <p>
              Ut venenatis mauris vel libero pretium, et pretium ligula
              faucibus. Morbi nibh felis, elementum a posuere et, vulputate et
              erat. Nam venenatis.
            </p>
          </article>
          <article>
            <h2>Cras laoreet mi</h2>
            <p>
              Nulla auctor sit amet quam vitae commodo. Sed risus justo,
              vulputate quis neque eget, dictum sodales sem. In eget felis
              finibus, mattis magna a, efficitur ex. Curabitur vitae justo
              consequat sapien gravida auctor a non risus. Sed malesuada mauris
              nec orci congue, interdum efficitur urna dignissim. Vivamus cursus
              elit sem, vel facilisis nulla pretium consectetur. Nunc congue.
            </p>
            <p>
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Aliquam consectetur massa nec
              metus condimentum, sed tincidunt enim tincidunt. Vestibulum
              fringilla risus sit amet massa suscipit eleifend. Duis eget metus
              cursus, suscipit ante ac, iaculis est. Donec accumsan enim sit
              amet lorem placerat, eu dapibus ex porta. Etiam a est in leo
              pulvinar auctor. Praesent sed vestibulum elit, consectetur egestas
              libero.
            </p>
            <p>
              Ut varius quis velit sed cursus. Nunc libero ante, hendrerit eget
              consectetur vel, viverra quis lectus. Sed vulputate id quam nec
              tristique. <a>Etiam lorem purus</a>, imperdiet et porta in,
              placerat non turpis. Cras pharetra nibh eu libero ullamcorper, at
              convallis orci egestas. Fusce ut est tellus. Donec ac consectetur
              magna, nec facilisis enim. Sed vel tortor consectetur, facilisis
              felis non, accumsan risus. Integer vel nibh et turpis.
            </p>
            <p>
              Nam eu sollicitudin neque, vel blandit dui. Aliquam luctus aliquet
              ligula, sed:
            </p>
            <ul>
              <li>
                Suspendisse ac facilisis leo. Sed nulla odio, aliquam ut
                lobortis vitae, viverra quis risus. Vivamus pulvinar enim sit
                amet elit porttitor bibendum. Nulla facilisi. Aliquam libero
                libero, porta ac justo vitae, dapibus convallis sapien. Praesent
                a nibh pretium, ultrices urna eget, vulputate felis. Phasellus
                ac sagittis ipsum, a congue lectus. Integer interdum ut velit
                vehicula volutpat. Nulla facilisi. Nulla rhoncus metus lorem,
                sit amet facilisis ipsum faucibus et. Lorem ipsum.
              </li>
              <li>
                Curabitur a rutrum ante. Praesent in justo sagittis, dignissim
                quam facilisis, faucibus dolor. Vivamus sapien diam, faucibus
                sed sodales sed, tincidunt quis sem. Donec tempus ipsum massa,
                ut fermentum ante molestie consectetur. In hac habitasse platea
                dictumst. Sed non finibus nibh, vitae dapibus arcu. Sed lorem
                magna, imperdiet non pellentesque et, rhoncus ac enim. Class
                aptent taciti sociosqu ad litora torquent per conubia.
              </li>
            </ul>
            <p>
              Praesent ac sapien eros. Suspendisse potenti. Morbi eu ante nibh.
              Proin dictum, tellus ut molestie tincidunt, urna tortor sodales
              velit, ut tempor lectus ipsum nec sapien. Nulla nec purus vitae
              libero aliquet posuere non et sapien. Cras in erat rhoncus,
              dignissim ligula iaculis, faucibus orci. Donec ligula neque,
              imperdiet vitae mauris eget, egestas varius massa. Praesent ornare
              nisi at dui dapibus, ac tristique felis.
            </p>
            <p>
              Phasellus maximus urna lacus, non imperdiet ex blandit sit amet.
              Vivamus et tellus est. Mauris ligula elit, placerat non tellus a,
              dictum porttitor urna. Phasellus mollis turpis id suscipit
              dapibus. In dolor.
            </p>
            <p>
              Sed sit amet euismod sapien, non eleifend erat. Vivamus et quam
              odio. Integer nisi lacus, maximus sit amet turpis in, luctus
              molestie sem. Duis sit amet euismod erat. Fusce pulvinar ex neque,
              egestas cursus nulla ullamcorper vel. Pellentesque mollis erat
              egestas est rhoncus, sit amet sodales massa ullamcorper. Etiam
              auctor ante a neque facilisis tristique. Proin ultricies fringilla
              turpis, eget tempus elit imperdiet non. Quisque.
            </p>
            <p>
              Etiam eu tortor placerat, varius orci non, ornare nunc. Cras
              suscipit in ligula ultricies lacinia. Pellentesque at tristique
              sapien, et scelerisque leo. Donec eu nisi at magna tristique
              luctus vel at turpis. Nam vestibulum ornare ex cursus vulputate.
              In elementum tellus at sapien bibendum, id maximus mauris
              convallis. Donec facilisis porta lobortis. Vivamus mauris diam,
              pretium ac dolor.
            </p>
            <p>Pellentesque et consequat arcu, ac laoreet ante. Nam non.</p>
          </article>
        </section>
      </main>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
