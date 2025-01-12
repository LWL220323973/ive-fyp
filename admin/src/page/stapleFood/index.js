import React from "react";
import intl from "react-intl-universal";


function StapleFood() {
  return (
    <div>
      <h1>{intl.get("stapleFood")}</h1>
    </div>
  );
}

export default StapleFood;
