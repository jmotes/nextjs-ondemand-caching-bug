import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Home.module.css";
import RevalidateLink from "../../../components/RevalidateLink";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";

export interface RequestParams extends NextParsedUrlQuery {
  site: string;
  slug: string[];
}

export type PageProps = {
  path: string;
  revalidateTime: number;
};

const Home: NextPage<PageProps> = ({ path, revalidateTime }) => {
  return (
    <Layout>
      <p className={styles.description}>
        Revalidated Time{" "}
        <code className={styles.code}>
          {new Date(revalidateTime).toLocaleString()}
        </code>
        <br />
        <RevalidateLink path={path} />
      </p>
    </Layout>
  );
};

export default Home;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{
      params: {
        site: "nextjs-ondemand-caching-bug.kairosdxp.com",
        slug: ["/"]
      }
    }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PageProps, RequestParams> = async ({
  params,
}) => {
  return {
    props: {
      path: params ? `/_sites/${params?.site}` : "",
      revalidateTime: Date.now(),
    },
    revalidate: 86400, // 24 hours
  };
};
