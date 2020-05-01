import React from 'react'
import "github-markdown-css";
import "primer-tooltips/build/build.css";
import '../css/app.css'
import '../css/github-markdown-css.css'
import '../css/readme.css'
import '../css/tailwind.css'

import { DefaultSeo } from 'next-seo';

function MyApp(props) {
  const {Component, pageProps} = props;
  return (
    <>
      <DefaultSeo
        title="JS.coach"
        description="Manually curated list of packages for React, Webpack and others."
        keywords="npm,package manager, yarn,react,react-native"
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://js.coach/',
          site_name: 'JS.coach',
          title: 'JS.coach',
          description: 'Manually curated list of packages for React, Webpack and others.'
        }}
        twitter={{
          handle: '@_jscoach',
          site: '@_jscoach',
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
