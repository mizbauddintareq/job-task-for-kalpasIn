import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./Feedback.css";
import validator from "validator";
import { useForm } from "react-hook-form";
import UserInfo from "../UserInfo/UserInfo";
import ModalFeedback from "./ModalFeedback";
import Swal from "sweetalert2";

const Feedback = () => {
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, value) => {
    if (!validator.isEmail(data.email)) {
      setEmailError(true);
      return;
    } else if (validator.isEmail(data.email)) {
      setEmailError("");
    }

    if (!validator.isMobilePhone(data.pNumber)) {
      setPhoneError(true);
      return;
    } else if (validator.isMobilePhone(data.pNumber)) {
      setPhoneError("");
    }
    fetch(
      "https://kalpasin-job-task-default-rtdb.firebaseio.com/feedback.json",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((data) => {
      if (data.status === 200) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Your review has been saved on firebase data store",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      reset();
      setValue("");
    });
  };

  return (
    <div className="card mb-3 shadow-lg p-3 bg-body rounded border-0">
      <h2>Have a feedback?</h2>
      <button
        type="button"
        className="mt-3 mx-4 feedback-btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalLong"
      >
        We're Listening
      </button>
      <div
        className="modal fade w-75"
        id="exampleModalLong"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header feedback-modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body feedback-modal">
              <div className="row">
                <div className="col-md-3">
                  <UserInfo />
                  <ModalFeedback />
                </div>
                <div className="col-md-9">
                  <div className="card p-3 form-card border-0">
                    <div>
                      <h4>Thank you so much for taking the time!</h4>
                      <p>Please provide the below details</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-md-6">
                          <label>First Name</label>
                          <input
                            {...register("firstName", { required: true })}
                            className="form-control mb-2"
                            placeholder="Jhon"
                          />
                          {errors.firstName && (
                            <span className="text-danger">
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className="col-md-6">
                          <label>Last Name</label>
                          <input
                            {...register("lastName", { required: true })}
                            className="form-control mb-2"
                            placeholder="Doe"
                          />
                          {errors.lastName && (
                            <span className="text-danger">
                              This field is required
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Address</label>
                        <textarea
                          {...register("address", { required: true })}
                          className="form-control mb-2 p-3"
                          placeholder="Enter your full address here"
                        />
                        {errors.address && (
                          <span className="text-danger">
                            This field is required
                          </span>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Country</label>
                          <Select
                            {...register("country")}
                            options={options}
                            value={value}
                            onChange={changeHandler}
                          />
                          {errors.country && (
                            <span className="text-danger">
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className="col-md-6">
                          <label>Email</label>
                          <input
                            {...register("email", { required: true })}
                            className="form-control mb-2"
                            placeholder="example@example.com"
                          />
                          {emailError ? (
                            <span className="text-danger">
                              Please enter a valid email
                            </span>
                          ) : (
                            errors.email && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-2">
                          <label>Code</label>
                          <select
                            className="p-2 border-0"
                            {...register("cCode")}
                          >
                            <option value="+91">+91</option>
                            <option value="+880">+880</option>
                            <option value="+977">+977</option>
                            <option value="+975">975</option>
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label>Phone Number</label>
                          <input
                            {...register("pNumber", { required: true })}
                            className="form-control mb-2 p-2"
                            placeholder="123456789"
                          />
                          {phoneError ? (
                            <span className="text-danger">
                              Please enter a valid phone number
                            </span>
                          ) : (
                            errors.pNumber && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )
                          )}
                        </div>
                      </div>
                      <input
                        type="submit"
                        value="Submit Feedback"
                        className="feedback-btn mt-2 border-0 px-3"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
