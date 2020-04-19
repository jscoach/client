import React from "react";

const ExternalLinks = ({name, homepage, repositoryUrl, donationUrl}) => (
  <>


    <ul className="block relative">
      {donationUrl && (
        <li className="block">
          <a
            className="hover:bg-gray-200 hover:text-pink-800 py-3 px-3 rounded-md block text-pink-700"
            href={donationUrl}
            target="_blank"
            rel="noopener noreferrer">
            ♡ Donations
          </a>
        </li>
      )}
      {homepage && (
        <li className="block">
          <a className="hover:bg-gray-200 py-3 px-3 rounded-md block" href={homepage} target="_blank">
            Visit homepage
          </a>
        </li>)}
      <li className="block">
        <a className="hover:bg-gray-200 py-3 px-3 rounded-md block" href={repositoryUrl} target="_blank">
          View on GitHub
        </a>
      </li>
      <li className="block">
        <a href={`https://www.npmjs.com/package/${name}`} target="_blank"
           className="hover:bg-gray-200 py-3 px-3 rounded-md block">
          View on NPM
        </a>
      </li>
      <li className="block">
        <a href={`https://yarn.pm/${name}`} target="_blank"
           className="hover:bg-gray-200 py-3 px-3 rounded-md block">
          View on Yarn
        </a>
      </li>

    </ul>
  </>
);

export default ExternalLinks;
