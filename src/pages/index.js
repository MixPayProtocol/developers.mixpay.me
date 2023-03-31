import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.scss';
import HomepageFeatures from '../components/HomepageFeatures';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={clsx("container", styles.container)}>
        <div className={clsx("text-part", styles.left)}>
          <h1 className={clsx("hero__title", styles.title)}> Decentralized Web3 Cross-Chain Payment Protocol </h1>
          <h2> Built as Web3, for Web3. </h2>
          <ul className={clsx("hero__subtitle", styles.subtitle)}>
            <li className={styles.subtitle_li}>
              <strong>
                <Translate>features.free</Translate>
              </strong>
              <Translate>features.free.text</Translate>
            </li>
            <li className={styles.subtitle_li}>
              <strong>
                <Translate>features.web3</Translate>
              </strong>
              <Translate>features.web3.text</Translate>
            </li>
            <li className={styles.subtitle_li}>
              <strong>
                <Translate>features.non-custodial</Translate>
              </strong>
              <Translate>features.non-custodial.text</Translate>
            </li>
            <li className={styles.subtitle_li}>
              <strong>
                <Translate>features.powerful</Translate>
              </strong>
              <Translate>features.powerful.text</Translate>
            </li>

            <li className={styles.subtitle_li}>
              <strong>
                <Translate>features.friendly</Translate>
              </strong>
              <Translate>features.friendly.text</Translate>
            </li>
          </ul>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--primary button--lg', styles.button)}
              to="/developers/guides/introduction">
              <Translate>buttons.get_started</Translate>
            </Link>
            
          </div>
        </div>
        <div className={clsx("image-part", styles.right)}>
          <img src={useBaseUrl('images/home_head.png')} class="main-bg" />
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}
