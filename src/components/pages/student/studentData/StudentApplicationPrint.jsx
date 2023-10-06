import React from "react";
import { useReactToPrint } from "react-to-print";

const PrintableComponent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <p>Add Application form here</p>
    </div>
  );
});

function StudentApplicationPrint() {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      {/* <h1>Your React App</h1> */}
      <button onClick={handlePrint}>Print</button>
      <PrintableComponent ref={componentRef} />
    </div>
  );
}

export default StudentApplicationPrint;
