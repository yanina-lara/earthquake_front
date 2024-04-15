import React from 'react';

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === currentPage - 1 || i === currentPage || i === currentPage + 1 || i === totalPages) {
        pageNumbers.push(
          <button key={i} onClick={() => handlePageChange(i)} className={currentPage === i ? 'current-page' : ''}>
            {i}
          </button>
        );
      } else if (i === 2 && currentPage > 4) {
        pageNumbers.push(<span key="dots-start">...</span>);
      } else if (i === totalPages - 1 && currentPage < totalPages - 3) {
        pageNumbers.push(<span key="dots-end">...</span>);
      }
    }

    return pageNumbers;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      {renderPageNumbers()}
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Paginator;
