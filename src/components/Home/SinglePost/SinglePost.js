import "../ToggleView/ToggleView.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Col, Container, Image } from "react-bootstrap";
const crossBtn = <FontAwesomeIcon icon={faTimes} size="2x" />;
const SinglePost = (props) => {
  const { id, title, body } = props.news;

  return (
    <>
      {props.changeViewPost === "listview" ? (
        <Container>
          <div className="row d-flex align-items-center">
            <div
              className="col-md-11"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <div className="card mb-3 shadow-lg p-2 bg-body rounded-4 border-0">
                <div className="row g-0 d-flex align-items-center">
                  <div className="col-md-1">
                    <Image
                      roundedCircle
                      src="https://i.ibb.co/F5GzrM5/pexels-thorsten-technoman-338515.jpg"
                      alt="user image"
                      style={{ width: "70px", height: "70px" }}
                    />
                  </div>
                  <div className="col-md-10">
                    <div>
                      <h5 className={props.changeViewPost}>
                        {title} (newsId: {id})
                      </h5>
                      <small>{body}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1">
              <button
                className="list-btn"
                onClick={() => props.handleRemove(id)}
              >
                {crossBtn}
              </button>
            </div>
          </div>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <iframe
                    src="https://kalpas.in/"
                    title="Iframe Example"
                    style={{ width: "100%", height: "80vh" }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </Container>
      ) : (
        <Col>
          <Card className="h-100">
            <Card.Body data-bs-toggle="modal" data-bs-target="#exampleModal">
              <Card.Title>
                {title.slice(0, 15)} (newsId: {id})
              </Card.Title>
              <Card.Text>
                <small>{body.slice(0, 40)}</small>
              </Card.Text>
              <Card.Img
                style={{ height: "170px" }}
                variant="top"
                src="https://i.ibb.co/F5GzrM5/pexels-thorsten-technoman-338515.jpg"
              />
            </Card.Body>
            <button
              className="del-card-btn"
              onClick={() => props.handleRemove(id)}
            >
              {crossBtn}
            </button>
          </Card>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <iframe
                    src="https://kalpas.in/"
                    title="Iframe Example"
                    style={{ width: "100%", height: "80vh" }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </Col>
      )}
    </>
  );
};

export default SinglePost;
