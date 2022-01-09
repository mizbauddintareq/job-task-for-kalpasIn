import React from "react";
import { Image } from "react-bootstrap";

const UserInfo = () => {
  return (
    <div className="card mb-3 shadow-lg p-2 bg-body rounded border-0">
      <div className="row g-0 d-flex align-items-center justify-content-center">
        <div className="col-md-3">
          <Image
            roundedCircle
            src="https://i.ibb.co/xLNQLBV/pexels-daniel-xavier-1212984.jpg"
            alt="user image"
            style={{ width: "70px" }}
          />
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <h5>Hi Readers</h5>
            <p>Here's your news</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
