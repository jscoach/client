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

const NotFound = () => (
  <div
    className="relative select-none text-center"
    style={{ top: "50%", transform: "translateY(-50%)" }}>
    <strong className="block text-2xl text-grey-light">404</strong>
    <span className="text-grey-dark text-xl">Página não encontrada</span>
  </div>
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

  componentWillUnmount() {
    this.enableScroll();
  }

  render() {
    const { searchResults, id, searching } = this.props;
    const hit = searchResults && searchResults.hits.find(hit => hit.name === id);

    if (hit) {
      hit.repositoryUrl = `https://github.com/${hit.repositoryUser}/${hit.repositoryName}${
        hit.customRepoPath ? `/tree/master/${hit.customRepoPath}` : ""
      }`;
    }

    return (
      <div className="fixed pin overflow-auto z-30 cursor-pointer" onClick={this.handleDismiss}>
        <div className="fixed bg-grey-darkest pin pointer-events-none" style={{ opacity: 0.9 }} />

        {!searching && !hit && <NotFound />}

        {hit && (
          <div
            className="relative ml-auto cursor-auto p-6 mt-8"
            onClick={this.handleClick}
            style={{
              minWidth: 890,
              width: 890,
              maxWidth: "100%",
            }}>
            <div className="shadow-lg">
              <Hit hit={hit} expanded />

              <div className="p-8 bg-white rounded-b">
                <div dangerouslySetInnerHTML={{ __html: hit && hit.readme }} />
                {hit.readmeWasTruncated && (
                  <div className="pt-6">
                    <a
                      className="btn btn-secondary p-3 w-full"
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
