import React, { useState } from "react";
import "./Apartaments.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SearchBar.css";
const SearchBar = (props) => {
  const [rooms, setRooms] = useState(0);
  const [area, setArea] = useState({
    min: 0,
    max: 99999999,
  });
  const [price, setPrice] = useState({
    min: 0,
    max: 99999999,
  });
  const [description, setDesctiption] = useState("");

  library.add(faSearch, faPlus, faMinus);

  const handleChangeDescription = (enteredDescription) => {
    setDesctiption(enteredDescription);
  };

  return (
    <div className="search-bar">
      <div className="search-description">
        <h5>Description:</h5>

        <input
          onChange={(e) => {
            handleChangeDescription(e.target.value);
          }}
        ></input>
      </div>
      <div className="search-description">
        <h5>Rooms:</h5>
        <div
          className="plus"
          onClick={() => {
            setRooms(rooms + 1);
          }}
        >
          <FontAwesomeIcon icon={["fa", "plus"]} size="xs" color="#dddddd" />
        </div>
        <span>{rooms}</span>
        <div
          className="plus"
          onClick={() => {
            setRooms(rooms - 1);
          }}
        >
          <FontAwesomeIcon icon={["fa", "minus"]} size="xs" color="#dddddd" />
        </div>
      </div>

      <div className="search-description">
        <h5>Area:</h5>
        <input
          className="area-input"
          onChange={(e) => {
            setArea({ ...area, min: e.target.value });
          }}
        ></input>
        <h5>m² - </h5>
        <input
          className="area-input"
          onChange={(e) => setArea({ ...area, max: e.target.value })}
        ></input>
        <h5>m²</h5>
      </div>
      <div className="search-description">
        <h5>Price:</h5>
        <input
          className="area-input"
          onChange={(e) => setPrice({ ...price, max: e.target.value })}
        ></input>
        <h5>zł - </h5>
        <input
          className="area-input"
          onChange={(e) => setPrice({ ...price, max: e.target.value })}
        ></input>
        <h5>zł</h5>
      </div>
      <div
        className="search-button"
        onClick={() => props.handleClickSearch(description, area, price)}
      >
        <FontAwesomeIcon icon={["fa", "search"]} size="lg" color="white" />
      </div>
    </div>
  );
};
export default SearchBar;
