import { useContext } from "react";
import ThemeContext from "./ThemeContextProvider";

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
  const { theme, toggleTheme } = useContext(ThemeContext);

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
            ${
              theme === "dark"
                ? `background-color: ${
                    isCurrentPage ? "hsl(223, 14%, 1%);" : "hsl(223, 14%, 25%);"
                  };
            color: #fff;`
                : ""
            }
            
            border: 1px solid rgba(221, 221, 221, ${ theme === "dark" ? "0.1" : "1"});
            border-radius: 5px;
          }
          .pagination-button:hover {
            background: ${isCurrentPage ? "hsl(223, 14%, 90%);" : "#eee;"}
            color: ${theme === "dark" ? "black;" : "white;"}
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

  // this calculation is to make sure the current page is always in the middle
  // AND when reaching first or last page, the pagination bar will not have empty space
  const firstPageNum = Math.min(
    Math.max(currPageNum - Math.floor(pagesToShow / 2), 1),
    lastPage - pagesToShow + 1
  );

  const lastPageNum = Math.min(firstPageNum + pagesToShow, lastPage + 1);
  for (let i = firstPageNum; i < lastPageNum; i++) {
    pages.push(
      <PaginationButton
        key={i}
        pageNum={i}
        onClick={() => onPaginationClick(i)}
        isCurrentPage={i - currPageNum === 0} /// make sure it's using number type
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
