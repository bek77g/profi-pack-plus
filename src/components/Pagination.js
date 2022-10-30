function PaginationComp({ setPage, page, pageSize }) {
  let pageBtns = Math.ceil(pageSize / 12);
  return (
    <nav
      aria-label='Page navigation example'
      className='d-flex justify-content-center mt-5 mb-5'>
      <ul className='pagination'>
        <li className='page-item' onClick={() => setPage(page - 1)}>
          <a className='page-link' href='#'>
            Previous
          </a>
        </li>
        {[...Array(pageBtns).fill()].map((pageBtn, i) => {
          let pageIdx = i + 1;
          return (
            <li
              className={`page-item ${pageIdx === page ? 'active' : ''}`}
              onClick={() => setPage(pageIdx)}>
              <a className='page-link' href='#'>
                {pageIdx}
              </a>
            </li>
          );
        })}
        <li className='page-item' onClick={() => setPage(page + 1)}>
          <a className='page-link' href='#'>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default PaginationComp;
