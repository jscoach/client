import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connectStateResults } from "react-instantsearch/connectors";
import TimeAgo from "react-timeago";
import "github-markdown-css";

import "./Readme.css";

const Header = hit => (
  <div className="bg-grey-lighter border-b border-grey-light px-8 py-4 rounded-t">
    <a
      className="float-right no-underline text-white bg-blue hover:bg-blue-dark border border-blue-darker py-2 px-4 rounded ml-4 mb-2"
      href={hit.repositoryUrl}
      target="_blank"
    >
      View on GitHub
    </a>

    <div className="text-grey text-sm mb-1">Filed under {hit.collections}</div>
    <strong className="pr-2 text-lg">{hit.name}</strong>
    <em className="roman text-grey-dark">
      v{hit.latestRelease} published{" "}
      <TimeAgo date={hit.modifiedAt} minPeriod="5" /> by {hit.owner}
    </em>
  </div>
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
      <div className="fixed pin overflow-auto" onClick={this.handleDismiss}>
        <div className="fixed pin bg-teal opacity-75 pointer-events-none" />
        <div
          className="relative bg-white max-w-xl m-auto my-8 shadow-lg rounded"
          onClick={this.handleClick}
        >
          <Header {...hit} />
          <div
            className="p-8"
            dangerouslySetInnerHTML={{ __html: hit && hit.readme }}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(connectStateResults(Readme));
