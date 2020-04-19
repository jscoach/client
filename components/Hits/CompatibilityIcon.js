import React from "react";
import classNames from "classnames";

const CompatibilityIcon = ({label, children, className}) => (
  <span
    className={classNames("mr-1 inline items-center fill-current",
      {"tooltipped tooltipped-s tooltipped-no-delay": label},
      className)}
    aria-label={label}>
    <svg xmlns="http://www.w3.org/2000/svg" className="inline fill-current" width="18" height="18" viewBox="0 0 18 18">
      {children}
    </svg>
  </span>
);

export default CompatibilityIcon;
