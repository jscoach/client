import React from 'react';
import pretty from "prettysize";


function Dependents(hit) {
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://bundlephobia.com/api/size?package=${hit.name}&record=true`);
      res
        .json()
        .then(res => setState(res))
        .catch(err => console.error(err));
    }

    if (hit.compatibility.length === 0) {
      fetchData();
    }
  }, []);

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
    </ul> : <span className="italic text-gray-700 text-sm font-semibold">Loading . . .</span>}
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
    </ul> : <span className="italic text-gray-700 text-sm font-semibold">Loading . . .</span>}

  </> : null;
}

export default Dependents;
