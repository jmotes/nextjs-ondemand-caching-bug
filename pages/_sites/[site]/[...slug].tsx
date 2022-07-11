import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { PageProps, RequestParams } from ".";
import Layout from "../../../components/Layout";
import RevalidateLink from "../../../components/RevalidateLink";
import styles from "../../../styles/Home.module.css";

const Page: NextPage<PageProps> = ({ path, revalidateTime }) => {
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

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PageProps, RequestParams> = async ({
  params,
}) => {
  return {
    props: {
      path: params ? `/_sites/${params.site}/${params.slug}` : "",
      revalidateTime: Date.now(),
    },
    revalidate: 86400, // 24 hours
  };
};
