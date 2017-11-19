import React from "react";
import { connectSearchBox } from "react-instantsearch/connectors";

const SearchBox = connectSearchBox(({ currentRefinement, refine }) => (
  <form
    noValidate
    className="bg-white border rounded-t px-3 pt-3 pb-2 flex flex-row"
    role="search"
  >
    <button
      type="submit"
      className="text-grey"
      title="Submit your search query"
    >
      <svg
        width="1.5rem"
        height="1.5rem"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="m17.409 15.789l3.441 3.441c.39.39.393 1.02-.001 1.414-.391.391-1.03.385-1.42-.005l-3.41-3.41c-1.373 1.108-3.119 1.771-5.02 1.771-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8 4.418 0 8 3.582 8 8 0 1.796-.592 3.454-1.591 4.789m-6.409 1.211c3.314 0 6-2.686 6-6 0-3.314-2.686-6-6-6-3.314 0-6 2.686-6 6 0 3.314 2.686 6 6 6" />
      </svg>
    </button>
    <input
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      className="bg-transparent flex-1 px-1 mx-1 text-black"
      name="query"
      onChange={e => refine(e.target.value)}
      placeholder="Search"
      spellCheck="false"
      type="search"
      value={currentRefinement}
      style={{ outline: "none" }}
    />
    {currentRefinement && (
      <button
        className="text-grey"
        onClick={() => refine("")}
        title="Clear the search query"
        type="reset"
      >
        <svg
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    )}
  </form>
));

export default SearchBox;
