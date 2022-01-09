import "./Home.css";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import Feedback from "../Feedback/Feedback";
import UserInfo from "../UserInfo/UserInfo";
import ToggleView from "../ToggleView/ToggleView";

const list = <FontAwesomeIcon icon={faList} size="3x" />;
const news = <FontAwesomeIcon icon={faNewspaper} size="3x" />;

const Home = () => {
  const [viewMood, setViewMood] = useState("listview");

  return (
    <Container fluid>
      <div className="row">
        <div className="col-md-3 pt-5 px-5 fixed-section">
          {/* user section */}
          <UserInfo />

          {/* toggle section */}
          <div className="card mb-3 p-3 shadow-lg bg-body rounded border-0">
            <h2 className="text-center mb-3">View Toggle</h2>
            <div className="d-flex p-2 justify-content-between toggle-btn">
              <button
                className={viewMood === "cardview" ? "active" : null}
                onClick={() => setViewMood("cardview")}
              >
                {news}
              </button>
              <button
                className={viewMood === "listview" ? "active" : null}
                onClick={() => setViewMood("listview")}
              >
                {list}
              </button>
            </div>
          </div>

          {/* toggle section */}
          <Feedback />
        </div>
        <div className="col-md-9 mt-5">
          <ToggleView changeView={viewMood} />
        </div>
      </div>
    </Container>
  );
};

export default Home;
