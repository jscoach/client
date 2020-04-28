import React from "react";
import { connectStateResults } from 'react-instantsearch-dom';
import Hit from "../Hits/ExpandedHit";
import Inline from "../Advertisement/Inline";

const NotFound = () => (
  <div
    className="relative select-none text-center mt-24"
    style={{top: "50%", transform: "translateY(-50%)"}}>
    <strong className="block text-2xl text-gray-300">404</strong>
    <span className="text-gray-900 text-xl">Package Not Found!</span>
  </div>
);

function Readme(props) {
  const {searchResults, id, searchState, allSearchResults} = props;
  const hit = searchResults && searchResults.hits.find(hit => hit.name === searchState.query);

  if (searchResults && hit) {
    hit.repositoryUrl = `https://github.com/${hit.repositoryUser}/${hit.repositoryName}${
      hit.customRepoPath ? `/tree/master/${hit.customRepoPath}` : ""
    }`;
  }
  return (<>

      {/*{!searching && !hit && allSearchResults ? <NotFound/> : null}*/}
      {searchResults && hit && (<>
          <div className="relative container mx-auto">
            <div className="flex flex-wrap">
              <div className="w-full md:w-8/12 p-6">
                <div dangerouslySetInnerHTML={{__html: hit && hit.readme}}/>
                <Inline/>
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
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default connectStateResults(Readme);
