
export type PaginationButtonProps = {
  pageNum: number | string;
  onClick: () => void;
  isCurrentPage: boolean;
};

const PaginationButton: React.FC<PaginationButtonProps> = ({
  pageNum,
  onClick,
  isCurrentPage,
}) => {
  return (
    <span>
        <button onClick={onClick} className="pagination-button">
          {pageNum}
        </button>
      <style jsx>{`
          .pagination-button {
            width: 70px;
            text-align: center;
            font-size: 17px;
            padding: 7px 5px 7px 5px;
            background: ${isCurrentPage ? "#a9ffa1;" : "#fff;"}
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .pagination-button:hover {
            background: ${isCurrentPage ? "#a9ffa1;" : "#eee;"}
          }
        `}</style>
    </span>
  );
};

export type PaginationBarProps = {
  currPageNum: number;
  pagesToShow: number;
  lastPage: number;
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  onPaginationClick: (pageNum: number) => void;
};

const PaginationBar: React.FC<PaginationBarProps> = ({
  currPageNum,
  pagesToShow,
  lastPage,
  onNextPageClick,
  onPrevPageClick,
  onPaginationClick,
}) => {
  const pages = [];

  // back button
  pages.push(
    <PaginationButton
      key={"prev"}
      pageNum={"<"}
      onClick={() => onPrevPageClick()}
      isCurrentPage={false}
      />
  );
 

  const firstPageNum = Math.max(currPageNum - Math.floor(pagesToShow / 2), 1);
  for (let i = firstPageNum; i < firstPageNum + pagesToShow; i++) {
    pages.push(
      <PaginationButton
        key={i}
        pageNum={i}
        onClick={() => onPaginationClick(i)}
        isCurrentPage={i - currPageNum === 0} /// ive used this condition to make sure its using number type
      />
    );
  }

  // forward button
  pages.push(
    <PaginationButton
      key={"next"}
      pageNum={">"}
      onClick={() => onNextPageClick()}
      isCurrentPage={false}
      />
  );

  return (
    <div className="pagination">
      {pages}
      <style jsx>{`
        .pagination {
          border-radios: 35px;
          padding: 5px 0 10px 0;
          margin-top: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default PaginationBar;
