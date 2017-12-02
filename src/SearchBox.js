import React from "react";
import { connectSearchBox } from "react-instantsearch/connectors";

const SearchBox = connectSearchBox(({ currentRefinement, refine }) => (
  <form
    noValidate
    className="bg-white border rounded py-2 px-3 h-12 flex items-center shadow"
    role="search">
    <button type="submit" className="leading-none text-grey" title="Submit your search query">
      <svg width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <path d="M14.4085473,12.7893825 L17.8498594,16.2306945 C18.2400429,16.6208781 18.2424894,17.2510442 17.8492424,17.6442911 C17.4587181,18.0348154 16.8197307,18.028993 16.4297323,17.6389945 L13.020013,14.2292753 C11.6473565,15.3368602 9.90112056,16 8,16 C3.581722,16 2.22044605e-15,12.418278 2.22044605e-15,8 C2.22044605e-15,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,9.79620538 15.4080326,11.4541494 14.4085473,12.7893825 L14.4085473,12.7893825 Z M8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 Z" />
      </svg>
    </button>
    <input
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      className="bg-transparent flex-1 p-2 mx-1 text-black"
      name="query"
      onChange={e => refine(e.target.value)}
      placeholder="Search for components, boilerplates, generators and other packages"
      spellCheck="false"
      type="search"
      value={currentRefinement}
      style={{ outline: "none" }}
    />
    {currentRefinement && (
      <button
        className="leading-none text-grey"
        onClick={() => refine("")}
        title="Clear the search query"
        type="reset">
        <svg width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
          <polygon points="16 3.41 14.59 2 9 7.59 3.41 2 2 3.41 7.59 9 2 14.59 3.41 16 9 10.41 14.59 16 16 14.59 10.41 9" />
        </svg>
      </button>
    )}
  </form>
));

export default SearchBox;
