import React from 'react';
import pretty from "prettysize";


function Dependents(hit) {
  const [state, setState] = React.useState({});
  const [loading, toggleLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        toggleLoading(true)
        const res = await fetch(`https://bundlephobia.com/api/size?package=${hit.name}&record=true`);
        const json = await res.json();
        setState(json);
        toggleLoading(false)
      } catch (err) {
        console.error(err)
        setState({});
        toggleLoading(false)
      }
    }

    if (hit.compatibility.length === 0) {
      fetchData();
    }
  }, [])

  return hit.compatibility.length === 0 ? <>
    <h4
      className="mt-3 pt-3 mb-3 border-t border-gray-200 font-bold mt-5 text-sm uppercase text-gray-600 mb-1">BUNDLE
      SIZE</h4>
    {Object.keys(state).length ? <ul className="leading-10">
      <li>
        MINIFIED: <span className="font-bold text-xl">{pretty(state.size)}</span>
      </li>
      <li>
        MINIFIED + GZIPPED: <span className="font-bold text-xl">{pretty(state.gzip)}</span>
      </li>
    </ul> : null}
    {loading ? <span className="italic text-gray-700 text-sm font-semibold">Loading . . .</span> : null}
    {!Object.keys(state).length && !loading ?
      <span className="italic text-gray-700 text-sm font-semibold">Not Available</span> : null}
    <h4
      className="mt-3 pt-3 mb-3 border-t border-gray-200 font-bold mt-5 text-sm uppercase text-gray-600 mb-1">DOWNLOAD
      TIME</h4>
    {Object.keys(state).length ? <ul className="leading-10">
      <li>
        3G: <span className="font-bold text-xl">{Math.floor(state.gzip / 50)}ms</span>
      </li>
      <li>
        2G: <span className="font-bold text-xl">{Math.floor(state.gzip / 30)}ms</span>
      </li>
    </ul> : null}
    {loading ? <span className="italic text-gray-700 text-sm font-semibold">Loading . . .</span> : null}
    {!Object.keys(state).length && !loading ?
      <span className="italic text-gray-700 text-sm font-semibold">Not Available</span> : null}
  </> : null;
}

export default Dependents;
