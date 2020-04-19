import React, { Component } from "react";

let initialized = process.env.REACT_APP_SHOW_ADS !== "true";
let pageViews = 0;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {initialized: false};
  }

  componentDidMount() {
    this.initialize();
  }

  shouldComponentUpdate() {
    if (!initialized) this.initialize();

    pageViews += 1;

    // Refresh the ad from time to time
    if (typeof window._carbonads !== "undefined" && pageViews % 10 === 0) {
      window._carbonads.refresh();
    }

    // The ad updates the DOM by itself, so component doesn't need to re-render
    return false;
  }

  initialize() {
    if (this.isMobile()) return;
    if (!this.isIndex()) return;

    if (initialized) return;
    initialized = true;

    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=jscoach"
    );
    script.setAttribute("type", "text/javascript");
    script.setAttribute("async", "async");
    script.setAttribute("id", "_carbonads_js");

    this._node.classList.remove("hidden");
    this._node.innerHTML = "";
    this._node.appendChild(script);
  }

  render() {
    return (
      <div
        ref={c => (this._node = c)}
        className="ad mb-8 shadow border rounded p-3 inline-block hidden"
      />
    );
  }

  isMobile() {
    return typeof window !== "undefined" && window.matchMedia("(max-width: 979px)").matches;
  }

  isIndex() {
    return window.location.pathname === "/";
  }
}

export default Index;
