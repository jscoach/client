import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connectStateResults } from "react-instantsearch/connectors";
import { Helmet } from "react-helmet";
import "github-markdown-css";

import Hit from "./Hit";
import "./Readme.css";

const MetaTags = hit => (
  <Helmet>
    <title>{hit.name}</title>

    <meta property="og:title" content={hit.name} />
    <meta property="og:description" content={hit.description} />
    <meta property="og:image" content={`https://github.com/${hit.repositoryUser}.png`} />
    <meta name="twitter:title" content={hit.name} />
    <meta name="twitter:description" content={hit.description} />
    <meta name="twitter:image" content={`https://github.com/${hit.repositoryUser}.png`} />
  </Helmet>
);

class Readme extends Component {
  handleDismiss = e => {
    e.preventDefault();

    this.enableScroll();

    this.props.history.push({
      pathname: "/",
      search: this.props.location.search,
    });
  };

  handleClick = e => {
    e.stopPropagation();
  };

  disableScroll() {
    document.body.classList.add("overflow-hidden");
  }

  enableScroll() {
    document.body.classList.remove("overflow-hidden");
  }

  componentDidMount() {
    this.disableScroll();
  }

  componentDidUpdate() {
    this.disableScroll();
  }

  render() {
    const { searchResults, id } = this.props;
    const hit = searchResults && searchResults.hits.find(hit => hit.name === id);

    if (hit) hit.repositoryUrl = `https://github.com/${hit.repositoryUser}/${hit.repositoryName}`;

    return (
      <div className="fixed pin overflow-auto z-30 cursor-pointer" onClick={this.handleDismiss}>
        <div
          className="fixed bg-grey-darkest pin pointer-events-none opacity-75"
          style={{ opacity: 0.9 }}
        />
        {hit && (
          <div
            className="relative ml-auto cursor-auto p-6 mt-8"
            onClick={this.handleClick}
            style={{
              width: 890,
              maxWidth: "100%",
            }}>
            <div className="shadow-lg">
              <Hit hit={hit} expanded />

              <div className="p-8 bg-white rounded-b">
                <div dangerouslySetInnerHTML={{ __html: hit && hit.readme }} />
                {hit.readmeWasTruncated && (
                  <div className="w-full pt-6 text-lg text-center">
                    <a
                      className="block py-3 text-blue font-semibold no-underline border bg-white hover:bg-grey-lighter rounded shadow"
                      href={hit.repositoryUrl}
                      target="_blank">
                      Read more
                    </a>
                  </div>
                )}
              </div>
            </div>
            <MetaTags {...hit} />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(connectStateResults(Readme));
