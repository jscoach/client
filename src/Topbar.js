import React from "react";

const Topbar = () => (
  <div className="bg-orange-light flex items-center h-10 px-2 select-none">
    <a href="/" className="no-underline text-black p-2">
      <h1 className="text-xl font-bold">JS.coach</h1>
    </a>

    <div className="flex-1" />

    <a href="https://classic.js.coach" className="no-underline text-orange-dark p-2">
      Back to classic
    </a>
    <a
      href="https://github.com/jscoach/support/blob/master/CONTRIBUTING.md"
      className="no-underline text-black p-2">
      Submit a package
    </a>
    <a href="http://blog.js.coach/" className="no-underline text-black py-2 px-3">
      Blog
    </a>
    <a href="mailto:hello@js.coach" className="no-underline text-black p-2 leading-none">
      <svg viewBox="0 0 16 16" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path d="m14.4 1.6h-12.8c-.88 0-1.592.72-1.592 1.6l-.008 9.6c0 .88.72 1.6 1.6 1.6h12.8c.88 0 1.6-.72 1.6-1.6v-9.6c0-.88-.72-1.6-1.6-1.6m0 3.2l-6.4 4-6.4-4v-1.6l6.4 4 6.4-4v1.6" />
      </svg>
    </a>
    <a href="https://twitter.com/_jscoach" className="no-underline text-black p-2 leading-none">
      <svg viewBox="0 0 16 16" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path d="m15.969 3.048c-.59.26-1.219.437-1.884.517.677-.407 1.197-1.049 1.442-1.814-.634.37-1.336.639-2.084.789-.598-.639-1.449-1.039-2.395-1.039-1.811 0-3.28 1.469-3.28 3.277 0 .26.03.51.085.749-2.726-.13-5.144-1.439-6.762-3.417-.284.481-.444 1.04-.444 1.649 0 1.139.58 2.141 1.459 2.729-.538-.017-1.044-.165-1.486-.41v.04c0 1.589 1.129 2.915 2.631 3.217-.276.074-.566.114-.864.114-.21 0-.41-.02-.61-.058.42 1.303 1.629 2.251 3.068 2.278-1.119.879-2.538 1.403-4.067 1.403-.26 0-.52-.015-.78-.045 1.459.929 3.178 1.473 5.04 1.473 6.04 0 9.334-4.995 9.334-9.321 0-.14 0-.28-.01-.42.64-.46 1.199-1.039 1.639-1.698l-.031-.013" />
      </svg>
    </a>
    <a
      href="https://github.com/jscoach/support/"
      className="no-underline text-black p-2 leading-none">
      <svg viewBox="0 0 16 16" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path d="m8 0c-4.42 0-8 3.582-8 8 0 3.535 2.292 6.533 5.47 7.59.4.075.547-.172.547-.385 0-.19-.007-.693-.01-1.36-2.225.483-2.695-1.073-2.695-1.073-.364-.923-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.713 1.223 1.873.87 2.33.665.072-.517.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.953 0-.873.31-1.587.823-2.147-.09-.202-.36-1.015.07-2.117 0 0 .67-.215 2.2.82.64-.178 1.32-.266 2-.27.68.004 1.36.092 2 .27 1.52-1.035 2.19-.82 2.19-.82.43 1.102.16 1.915.08 2.117.51.56.82 1.273.82 2.147 0 3.073-1.87 3.75-3.65 3.947.28.24.54.731.54 1.48 0 1.071-.01 1.931-.01 2.191 0 .21.14.46.55.38 3.201-1.049 5.491-4.049 5.491-7.579 0-4.418-3.582-8-8-8" />
      </svg>
    </a>
  </div>
);

export default Topbar;
