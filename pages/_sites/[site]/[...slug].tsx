import type { NextPage } from "next";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Home.module.css";

const Page: NextPage = () => {
  return (
    <Layout>
      <p className={styles.description}>
        Get started by editing{" "}
        <code className={styles.code}>pages/index.tsx</code>
      </p>
    </Layout>
  );
};

export default Page;
