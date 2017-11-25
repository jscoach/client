import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connectStateResults } from "react-instantsearch/connectors";
import { Helmet } from "react-helmet";
import TimeAgo from "react-timeago";
import "github-markdown-css";

import "./Readme.css";

const Header = hit => (
  <div className="bg-grey-lighter border-b border-grey-light px-8 py-4">
    <a
      className="float-right no-underline text-white bg-blue hover:bg-blue-dark border border-blue-darker py-2 px-4 rounded ml-4 mb-2"
      href={`https://github.com/${hit.repositoryUser}/${hit.repositoryName}`}
      target="_blank"
    >
      View on GitHub
    </a>

    <div className="text-grey text-sm mb-1">{hit.collections.join(", ")}</div>
    <strong className="pr-2 text-lg">{hit.name}</strong>
    <em className="roman text-grey-dark">
      v{hit.latestRelease} published{" "}
      <TimeAgo date={hit.modifiedAt} minPeriod="5" /> by {hit.repositoryUser}
    </em>
  </div>
);

const MetaTags = hit => (
  <Helmet>
    <title>{hit.name}</title>

    <meta property="og:title" content={hit.name} />
    <meta property="og:description" content={hit.description} />
    <meta
      property="og:image"
      content={`https://github.com/${hit.repositoryUser}.png`}
    />
    <meta name="twitter:title" content={hit.name} />
    <meta name="twitter:description" content={hit.description} />
    <meta
      name="twitter:image"
      content={`https://github.com/${hit.repositoryUser}.png`}
    />
  </Helmet>
);

class Readme extends Component {
  handleDismiss = e => {
    e.preventDefault();

    this.enableScroll();

    this.props.history.push({
      pathname: "/",
      search: this.props.location.search
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
    const hit =
      searchResults && searchResults.hits.find(hit => hit.name === id);

    return (
      <div className="fixed pin overflow-auto z-30 cursor-pointer" onClick={this.handleDismiss}>
        <div className="fixed bg-black pin pointer-events-none opacity-25" />
        {hit && (
          <div
            className="relative bg-white ml-auto cursor-auto"
            onClick={this.handleClick}
            style={{ boxShadow: "-1px 0 0 rgba(0,0,0,.2), 0 0 18px 4px rgba(0,0,0,.15)", maxWidth: 890 }}
          >
            <Header {...hit} />
            <div
              className="p-8"
              dangerouslySetInnerHTML={{ __html: hit && hit.readme }}
            />
            <MetaTags {...hit} />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(connectStateResults(Readme));
