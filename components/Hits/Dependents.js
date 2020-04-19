import React from 'react';
import pluralize from "./pluralize";
import humanizedNumber from "./humanizedNumber";
import { averages, thresholds } from "./constants";

function Dependents({count}) {
  return (<span
    className={`mr-4 tooltipped tooltipped-s tooltipped-multiline tooltipped-no-delay inline-flex items-center ${
      count > thresholds.dependents ? "text-pink-600" : "text-gray-900"
    }`}
    aria-label={`${count} ${pluralize(count, "package")} ${pluralize(
      count,
      "depends",
      "depend"
    )} on this package${count > averages.dependents ? "\n(above average)" : ""}`}>
    <svg xmlns="http://www.w3.org/2000/svg" className="inline fill-current" width="12" height="12" viewBox="0 0 12 12">
      <path
        d="M5.49999938,1.5081529e-06 C5.39771197,1.5081529e-06 5.29651854,0.0249123286 5.20489747,0.0755206269 L0.295238654,2.78293348 C0.111586263,2.88428118 0,3.07989668 0,3.28285431 L0,8.71642868 C0,8.91964853 0.111723011,9.1052997 0.295238654,9.20704073 L5.20489747,11.9237624 C5.38739703,12.0254125 5.61273847,12.0254125 5.79523803,11.9237624 L10.7048968,9.20704073 C10.8878518,9.10601798 11.0004325,8.91885052 10.9999988,8.71642868 L10.9999988,3.28285431 C10.9999988,3.07963446 10.8884125,2.88428118 10.7048968,2.78293348 L5.79523803,0.0755206269 C5.70549329,0.02582561 5.60363639,-0.00022837378 5.49999938,1.5081529e-06 L5.49999938,1.5081529e-06 Z"/>
    </svg>
    {" "}
    {humanizedNumber(count)}
  </span>)
}

export default Dependents;
