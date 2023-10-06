import React from "react";
import { useReactToPrint } from "react-to-print";

// Define PrintableComponent as a forwardRef component
const PrintableComponent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      {/* Content to be printed */}
      {/* <h1>Hello, this is for printing!</h1> */}
      <p>cjscbkjascnzsjnk</p>
    </div>
  );
});

function Print() {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <h1>Your React App</h1>
      <button onClick={handlePrint}>Print</button>
      <PrintableComponent ref={componentRef} />
    </div>
  );
}

export default Print;
