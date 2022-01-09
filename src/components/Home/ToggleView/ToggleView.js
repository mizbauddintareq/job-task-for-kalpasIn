import "./ToggleView.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row } from "react-bootstrap";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import SinglePost from "../SinglePost/SinglePost";
import Loader from "../Loader/Loader";
const leftArrow = <FontAwesomeIcon icon={faAngleDoubleLeft} />;
const rightArrow = <FontAwesomeIcon icon={faAngleDoubleRight} />;
const ToggleView = (props) => {
  const [postList, setPostList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = postList.slice(indexOfFirstItem, indexOfLastItem);

  const [pageNumberLimit, setpageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(postList.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const removePost = (e) => {
    if (filteredList <= 0) {
      const rmPost = currentItems.filter((post) => post.id !== e);
      setFilteredList(rmPost);
    } else {
      const rmPost = filteredList.filter((post) => post.id !== e);
      setFilteredList(rmPost);
    }
  };
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setPostList(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return Loader();
  }
  return (
    <>
      {props.changeView === "listview" ? (
        filteredList.length <= 0 ? (
          currentItems.map((post) => (
            <SinglePost
              key={post.id}
              news={post}
              handleRemove={removePost}
              changeViewPost={props.changeView}
            />
          ))
        ) : (
          filteredList.map((post) => (
            <SinglePost
              key={post.id}
              news={post}
              handleRemove={removePost}
              changeViewPost={props.changeView}
            />
          ))
        )
      ) : (
        <Container>
          <Row xs={1} md={3} className="g-4 mb-4">
            {filteredList.length <= 0
              ? currentItems.map((post) => (
                  <SinglePost
                    key={post.id}
                    news={post}
                    handleRemove={removePost}
                    changeViewPost={props.changeView}
                  />
                ))
              : filteredList.map((post) => (
                  <SinglePost
                    key={post.id}
                    news={post}
                    handleRemove={removePost}
                    changeViewPost={props.changeView}
                  />
                ))}
          </Row>
        </Container>
      )}
      <ul className="pageNumber">
        <li>
          <button
            onClick={handlePrevBtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            {leftArrow}
          </button>
        </li>

        {renderPageNumbers}

        <li>
          <button
            onClick={handleNextBtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            {rightArrow}
          </button>
        </li>
      </ul>
    </>
  );
};

export default ToggleView;
