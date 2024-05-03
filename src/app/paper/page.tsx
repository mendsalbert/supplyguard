import React from "react";

function page() {
  return (
    <div>
      <object
        data="./supply-guard-whiteboard.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <p>
          Alternative{" "}
          <a href="https://drive.google.com/file/d/1kH7tRVogzoFr-tYrQ8afFv2duzQazq9v/view?usp=sharing">
            to the PDF!
          </a>
        </p>
      </object>
    </div>
  );
}

export default page;
