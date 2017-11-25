import numeral from "numeral";

// This converts a number such as 4200 to 4.2K and 1004 to 1K
const format = "0[.]0a";

export default value => numeral(value).format(format);
