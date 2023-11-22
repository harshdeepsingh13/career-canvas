import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {PDFViewerWrapper} from "./styles";
import {Document, Page} from "react-pdf";
import {Pagination} from "react-bootstrap";

const PDFViewer = ({pdf, loading, onLoadSuccess, onLoadProgress}) => {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({numPages}) => {
        setNumPages(numPages);
        onLoadSuccess && onLoadSuccess();
    }

    const handleLoadProgress = () => {
        onLoadProgress && onLoadProgress();
    }

    return <>
        <PDFViewerWrapper>
            <div className="pagination-container">
                <span className={"description"}> Page(s): </span>
                <Pagination>
                    {Array.from({length: numPages}, (item, index) =>
                        <Pagination.Item
                            key={index + 1}
                            active={pageNumber === index + 1}
                            onClick={() => setPageNumber(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>)}
                </Pagination>
            </div>
            <Document
                file={pdf}
                renderTextLayer={false}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={loading}
                noData={"No Template Found or there is some error."}
                onLoadProgress={handleLoadProgress}
            >
                <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false}/>
            </Document>
        </PDFViewerWrapper>
    </>
};

PDFViewer.propTypes = {
    pdf: PropTypes.any,
    loading: PropTypes.bool,
    onLoadSuccess: PropTypes.func,
    onLoadProgress: PropTypes.func
};
PDFViewer.defaultProps = {
    loading: false
};

const arePropsEqual = (prev, next) => prev.pdf === next.pdf &&
    prev.loading === next.loading
export default React.memo(PDFViewer, arePropsEqual);
