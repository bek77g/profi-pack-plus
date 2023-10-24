function PaginationComp({ setPage, page, pageSize }) {
  let pageBtns = Math.ceil(pageSize / 12);

  return (
    <nav
      aria-label='Page navigation example'
      className='d-flex justify-content-center mt-5 mb-5'>
      <ul className='pagination'>
        <li className='page-item'>
          <button
            disabled={page <= 1 && true}
            className='page-link'
            onClick={() => setPage((prev) => +prev - 1)}>
            Назад
          </button>
        </li>

        {[...Array(pageBtns).fill()].map((pageBtn, i) => {
          let pageIdx = +i + 1;
          return (
            <li className={`page-item ${pageIdx === +page ? 'active' : ''}`}>
              <button className='page-link' onClick={() => setPage(+pageIdx)}>
                {pageIdx}
              </button>
            </li>
          );
        })}
        <li className='page-item'>
          <button
            disabled={page >= pageBtns}
            className='page-link'
            onClick={() => setPage((prev) => +prev + 1)}>
            Вперёд
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default PaginationComp;
