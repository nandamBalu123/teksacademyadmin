// import React from "react";

// const Print = () => {
//   const handlePrint = () => {
//     window.print();
//   };
//   return (
//     <div>
//       <div>
//         <h1>My Component</h1>
//         <p>This is the content of my component.</p>
//         <button onClick={handlePrint}>Print</button>
//       </div>
//     </div>
//   );
// };

// export default Print;
// import React, { useState, useEffect } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// // Initialize PDF.js
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const Print = () => {
//   const [numPages, setNumPages] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState("C:\Irshad\teks-0410\teksacademyadmin\src\images\"); // Replace with your PDF URL or local file path

//   const handlePrint = () => {
//     const pdfWindow = window.open();
//     pdfWindow.document.write(
//       `<html><head><title>Print</title></head><body><embed width="100%" height="100%" src="${pdfUrl}" type="application/pdf"></body></html>`
//     );
//     pdfWindow.document.close();
//     pdfWindow.print();
//     pdfWindow.onafterprint = () => pdfWindow.close();
//   };

//   useEffect(() => {
//     // You can set the PDF URL dynamically here if needed
//   }, []);

//   return (
//     <div>
//       <Document
//         file={pdfUrl}
//         onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//       >
//         {Array.from(new Array(numPages), (el, index) => (
//           <Page
//             key={`page_${index + 1}`}
//             pageNumber={index + 1}
//             width={600} // Adjust width as needed
//           />
//         ))}
//       </Document>
//       <button onClick={handlePrint}>Print</button>
//     </div>
//   );
// };

// export default Print;
// import React, { useState, useEffect } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// // Import the PDF file
// // import pdfFile from "./images/Teks Academy Terms & conditions privacy policy (1).pdf"; // Replace with the actual file path
// import pdfFile from "../../images/Teks Academy Terms & conditions privacy policy (1).pdf";

// // Initialize PDF.js
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const Print = () => {
//   const [numPages, setNumPages] = useState(null);

//   const handlePrint = () => {
//     const pdfWindow = window.open();
//     pdfWindow.document.write(
//       `<html><head><title>Print</title></head><body><embed width="100%" height="100%" src="${pdfFile}" type="application/pdf"></body></html>`
//     );
//     pdfWindow.document.close();
//     pdfWindow.print();
//     pdfWindow.onafterprint = () => pdfWindow.close();
//   };

//   useEffect(() => {
//     // You can set the PDF URL dynamically here if needed
//   }, []);

//   return (
//     <div>
//       <Document
//         file={pdfFile}
//         onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//       >
//         {Array.from(new Array(numPages), (el, index) => (
//           <Page
//             key={`page_${index + 1}`}
//             pageNumber={index + 1}
//             width={600} // Adjust width as needed
//           />
//         ))}
//       </Document>
//       <button onClick={handlePrint}>Print</button>
//     </div>
//   );
// };

// export default Print;
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Import the PDF file
import pdfFile from "../../images/Teks Academy Terms & conditions privacy policy (1).pdf";

// Initialize PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Print = () => {
  const [numPages, setNumPages] = useState(null);

  //   const handlePrint = () => {
  //     const pdfWindow = window.open();
  //     pdfWindow.document.write(
  //       `<html><head><title>Print</title></head><body><iframe width="100%" height="100%" src="${pdfFile}" type="application/pdf"></iframe></body></html>`
  //     );
  //     pdfWindow.document.close();
  //     pdfWindow.print();
  //     pdfWindow.onafterprint = () => pdfWindow.close();
  //   };
  //   const handlePrint = () => {
  //     const pdfWindow = window.open();
  //     pdfWindow.document.write(
  //       `<html><head><title>Print</title></head><body><iframe width="100%" height="100%" src="${pdfFile}" type="application/pdf"></iframe></body></html>`
  //     );
  //     pdfWindow.document.close();

  //     // Listen for the onafterprint event and close the window when printing is done
  //     pdfWindow.onafterprint = () => {
  //       pdfWindow.close();
  //       console.log("Print operation completed.");
  //     };

  //     // Trigger the print operation
  //     pdfWindow.print();
  //   };
    const handlePrint = () => {
      const pdfWindow = window.open(pdfFile, "_blank");

      pdfWindow.onload = () => {
        pdfWindow.print();
        pdfWindow.onafterprint = () => {
          pdfWindow.close();
        };
      };
    };

  useEffect(() => {
    // You can set the PDF URL dynamically here if needed
  }, []);

  return (
    <div>
      <Document
        file={pdfFile}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {/* {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={600} // Adjust width as needed
          />
        ))} */}
      </Document>
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default Print;
