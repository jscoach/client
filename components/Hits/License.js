import React from "react";
import licenseUrl from "./licenses";

const License = ({id}) => (
  <a
    className="mr-4 bg-white px-1 tooltipped tooltipped-s tooltipped-multiline tooltipped-no-delay border rounded-sm text-sm truncate align-bottom no-underline text-inherit relative"
    target="_blank"
    href={licenseUrl(id)}
    aria-label={`Licensed under ${id}\n(click to learn more)`}>
    {id}
  </a>
);

export default License;
