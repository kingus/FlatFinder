import React from "react";
import "./ActivateUser.css";
import ReactSwipeButton from "react-swipe-button";

const MySlider = (props) => {
  const handleSuccess = () => {
    console.log("AKTYWNY");
    props.verifyAccount();
  };

  return (
    <div className="slider">
      <ReactSwipeButton
        text="SWIPE TO ACTIVATE"
        color="#545454"
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default MySlider;
