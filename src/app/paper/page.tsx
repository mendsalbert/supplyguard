import React from "react";

function page() {
  return (
    <div>
      <object
        data="http://africau.edu/images/default/sample.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <p>
          Alternative{" "}
          <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a>
        </p>
      </object>
    </div>
  );
}

export default page;
