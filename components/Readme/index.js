import React, { Component } from "react";
import { connectStateResults } from 'react-instantsearch-dom';
import { Helmet } from "react-helmet";
import { DefaultSeo, NextSeo } from 'next-seo';
import Hit from "../Hits/ExpandedHit";

const MetaTags = hit => (
  <Helmet>
    <title>{hit.name}</title>

    <meta property="og:title" content={hit.name}/>
    <meta property="og:description" content={hit.description}/>
    <meta property="og:image" content={`https://github.com/${hit.repositoryUser}.png`}/>
    <meta name="twitter:title" content={hit.name}/>
    <meta name="twitter:description" content={hit.description}/>
    <meta name="twitter:image" content={`https://github.com/${hit.repositoryUser}.png`}/>
  </Helmet>
);

const NotFound = () => (
  <div
    className="relative select-none text-center"
    style={{top: "50%", transform: "translateY(-50%)"}}>
    <strong className="block text-2xl text-gray-300">404</strong>
    <span className="text-gray-900 text-xl">Página não encontrada</span>
  </div>
);

class Readme extends Component {


  render() {
    const {searchResults, id, searching} = this.props;
    const hit = searchResults && searchResults.hits.find(hit => hit.name === id);

    if (hit) {
      hit.repositoryUrl = `https://github.com/${hit.repositoryUser}/${hit.repositoryName}${
        hit.customRepoPath ? `/tree/master/${hit.customRepoPath}` : ""
      }`;
    }
    return (<>

        {!searching && !hit && <NotFound/>}
        {hit && (<div className="relative container mx-auto">
            <NextSeo
              title={`${hit.name} - JS.coach`}
              description={hit.description}
              openGraph={{
                title: `${hit.name} - JS.coach`,
                description: hit.description
              }}
            />
            <div className="flex flex-wrap">
              <div className="w-full md:w-8/12 p-6">
                <div dangerouslySetInnerHTML={{__html: hit && hit.readme}}/>
                {hit.readmeWasTruncated && (
                  <div className="pt-6">
                    <a
                      className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-bold uppercase rounded-full p-3 w-full block text-center"
                      href={hit.repositoryUrl}
                      target="_blank">
                      Read more
                    </a>
                  </div>
                )}
              </div>
              <div className="w-full md:w-4/12">
                <Hit hit={hit}/>
                <MetaTags {...hit} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default connectStateResults(Readme);
