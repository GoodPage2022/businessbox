import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const UsefulTools = () => {
  const [numPages, setNumPages] = useState<number[]>([]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    const numPagesArr = [];
    // SHOULD BE index <= numPages !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    for (let index = 1; index < numPages; index++) {
      numPagesArr.push(index);
    }
    setNumPages(numPagesArr);
  }

  return (
    <section className="usefulTools">
      <div className="container usefulTools__container">
        <h1 className="title usefulTools__title">Корисна інформація</h1>
        <div className="usefulTools__file">
          {
            <Document
              file={"/assets/info.pdf"}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {numPages.map((item) => (
                <Page
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  key={item}
                  pageNumber={item}
                />
              ))}{" "}
            </Document>
          }
        </div>
      </div>
    </section>
  );
};

export default UsefulTools;
