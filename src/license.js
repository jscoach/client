const chooseLicense = [
  "afl-3.0",
  "agpl-3.0",
  "apache-2.0",
  "artistic-2.0",
  "bsd-2-clause",
  "bsd-3-clause-clear",
  "bsd-3-clause",
  "bsl-1.0",
  "cc-by-4.0",
  "cc-by-sa-4.0",
  "cc0-1.0",
  "ecl-2.0",
  "epl-1.0",
  "eupl-1.1",
  "gpl-2.0",
  "gpl-3.0",
  "isc",
  "lgpl-2.1",
  "lgpl-3.0",
  "lppl-1.3c",
  "mit",
  "mpl-2.0",
  "ms-pl",
  "ms-rl",
  "ncsa",
  "ofl-1.1",
  "osl-3.0",
  "postgresql",
  "unlicense",
  "wtfpl",
  "zlib",
];

/* If a license is explained on choosealicense.com by GitHub, return that link.
 * Otherwise link to the official spdx website. */
export default spdxId => {
  if (chooseLicense.includes(spdxId.toLowerCase())) {
    return `https://choosealicense.com/licenses/${spdxId.toLowerCase()}`;
  }
  return `https://spdx.org/licenses/${spdxId}.html`;
};
