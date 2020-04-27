import React from "react";
import { connectPagination } from 'react-instantsearch-dom';
import Paginator from "react-js-pagination";
import { withRouter } from 'next/router'

const Pagination = ({currentRefinement, nbPages, refine, createURL, router}) => {
  const handlePageChange = (page) => {
    refine(page);
  };

  const getPageUrl = (page) => {
    const path = router.asPath === '/' ? '/?page=1' : router.asPath;
    return path.replace(/page=[1-9]*/ig, `page=${page}`)
  };

  return (
    <Paginator
      hideDisabled={true}
      hideFirstLastPages
      innerClass="ais-Pagination-list"
      activeClass="ais-Pagination-item--selected"
      activePage={currentRefinement}
      itemsCountPerPage={10}
      totalItemsCount={nbPages}
      getPageUrl={getPageUrl}
      pageRangeDisplayed={5}
      onChange={handlePageChange}
      prevPageText={<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"
                         strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
        <polyline points="15 18 9 12 15 6"/>
      </svg>}
      nextPageText={<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"
                         strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
        <polyline points="9 18 15 12 9 6"/>
      </svg>}
    />
  );
};

export default withRouter(connectPagination(Pagination));
