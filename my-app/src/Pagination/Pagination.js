import React, {useState, useEffect} from "react";
import "./style.css";


//render todo List from data
const renderData = (data) => {
    return (
      <ul>
        {data.map((todo, index) => {
          return <li key={index}>{todo.title}</li>;
        })}
      </ul>
    );
  };

function Pagination(){
    const [data, setData] = useState([]);
//current page no
    const [currentPage, setcurrentPage] = useState(1);
    //how many items to store per page
    const [itemsPerPage, setitemsPerPage] = useState(5);
  
    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  
    //handleclick per page for number of events displayed on page
    const handleClick = (event) => {
      setcurrentPage(Number(event.target.id));
    };
  //to get the total number of pages
    const pages = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      pages.push(i);
    }
  // calculate the index of last item
    const indexOfLastItem = currentPage * itemsPerPage;
    //calculate the index of first item
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    //slice data 
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  //to display Page numbers 
    const renderPageNumbers = pages.map((number) => {
      if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
        return (
          <li
            key={number}
            id={number}
            onClick={handleClick}
            className={currentPage == number ? "active" : null}
          >
            {number}
          </li>
        );
      } else {
        return null;
      }
    });
  //fetch json  data  from url to render
    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((json) => setData(json));
    }, []);
  //to go to next page
    const handleNextbtn = () => {
      setcurrentPage(currentPage + 1);
  
      if (currentPage + 1 > maxPageNumberLimit) {
        setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
    };
  // to go to prev page
    const handlePrevbtn = () => {
      setcurrentPage(currentPage - 1);
  
      if ((currentPage - 1) % pageNumberLimit == 0) {
        setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    };
  //to show more pages are available for users ...
    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
      pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
    }
  
    //to show more pages are available
    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
      pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
    }
  //to load more items on page 
    const handleLoadMore = () => {
      setitemsPerPage(itemsPerPage + 5);
    };
  
    return (
      <>
        <h1>Todo List</h1> <br />
        {renderData(currentItems)}
        <ul className="pageNumbers">
          <li>
            <button
              onClick={handlePrevbtn}
              disabled={currentPage == pages[0] ? true : false}
            >
              Prev
            </button>
          </li>
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
  
          <li>
            <button
              onClick={handleNextbtn}
              disabled={currentPage == pages[pages.length - 1] ? true : false}
            >
              Next
            </button>
          </li>
        </ul>
        <button onClick={handleLoadMore} className="loadmore">
          Load More
        </button>
      </>
    );
  }
export default Pagination;