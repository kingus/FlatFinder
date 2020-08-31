import React, { useState } from "react";
import "./Apartaments.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faPlus,
  faMinus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SearchBar.css";
const SearchBar = (props) => {
  const [districtsList, setDistrictsList] = useState([
    "",
    "Bielany",
    "Wola",
    "Żoliborz",
    "Mokotów",
  ]);

  const [rooms, setRooms] = useState(0);
  const [area, setArea] = useState({
    min: "",
    max: "",
  });
  const [price, setPrice] = useState({
    min: "",
    max: "",
  });
  const [pricePerM, setPricePerM] = useState({
    min: "",
    max: "",
  });
  const [description, setDesctiption] = useState("");
  const [district, setDistrict] = useState("");

  library.add(faSearch, faPlus, faMinus, faTimes);

  const handleChangeDescription = (enteredDescription) => {
    setDesctiption(enteredDescription);
  };

  return (
    <div className="main-container">
      <div className="search-bar">
        <div className="search-description">
          <h5>Description</h5>
          <div className="row">
            <input
              className="description-input"
              value={description}
              onChange={(e) => {
                handleChangeDescription(e.target.value);
              }}
            ></input>
            <div
              className="close-icon"
              onClick={() => {
                setDesctiption("");
              }}
            >
              <FontAwesomeIcon
                icon={["fa", "times"]}
                size="xs"
                color="#dddddd"
              />
            </div>
          </div>
        </div>

        <div className="search-description">
          <h5>Rooms</h5>
          <div className="row">
            <div
              className="plus"
              onClick={() => {
                setRooms(rooms - 1);
              }}
            >
              <FontAwesomeIcon
                icon={["fa", "minus"]}
                size="xs"
                color="#dddddd"
              />
            </div>
            <h5 value={rooms}>{rooms}</h5>

            <div
              className="plus"
              onClick={() => {
                setRooms(rooms + 1);
              }}
            >
              <FontAwesomeIcon
                icon={["fa", "plus"]}
                size="xs"
                color="#dddddd"
              />
            </div>
            <div
              className="close-icon"
              onClick={() => {
                setRooms(0);
              }}
            >
              <FontAwesomeIcon
                icon={["fa", "times"]}
                size="xs"
                color="#dddddd"
              />
            </div>
          </div>
        </div>

        <div className="search-description">
          <h5>Area</h5>

          <div className="row">
            <div className="input-container">
              <input
                value={area.min}
                className="area-input"
                onChange={(e) => {
                  setArea({ ...area, min: e.target.value });
                }}
              ></input>
              <h5>m²</h5>
            </div>

            <h5>-</h5>
            <div className="input-container">
              <input
                value={area.max}
                className="area-input"
                onChange={(e) => setArea({ ...area, max: e.target.value })}
              ></input>
              <h5>m²</h5>
            </div>
            <div
              className="close-icon"
              onClick={() => {
                setArea({ min: "", max: "" });
              }}
            >
              <FontAwesomeIcon
                icon={["fa", "times"]}
                size="xs"
                color="#dddddd"
              />
            </div>
          </div>
        </div>
        <div className="search-description">
          <h5>Price</h5>
          <div className="row">
            <div className="input-container">
              <input
                value={price.min}
                className="price-input"
                onChange={(e) => setPrice({ ...price, min: e.target.value })}
              ></input>
              <h5>PLN</h5>
            </div>

            <h5> - </h5>
            <div className="input-container">
              <input
                className="price-input"
                value={price.max}
                onChange={(e) => setPrice({ ...price, max: e.target.value })}
              ></input>
              <h5>PLN</h5>
            </div>
            <div
              className="close-icon"
              onClick={() => {
                setPrice({ min: "", max: "" });
              }}
            >
              <FontAwesomeIcon
                icon={["fa", "times"]}
                size="xs"
                color="#dddddd"
              />
            </div>
          </div>
        </div>
        <div className="search-description">
          <h5>Price per m</h5>
          <div className="row">
            <div className="input-container">
              <input
                value={pricePerM.min}
                className="price-input"
                onChange={(e) =>
                  setPricePerM({ ...pricePerM, min: e.target.value })
                }
              ></input>
              <h5>PLN</h5>
            </div>
            <h5> - </h5>
            <div className="input-container">
              <input
                className="price-input"
                value={pricePerM.max}
                onChange={(e) =>
                  setPricePerM({ ...pricePerM, max: e.target.value })
                }
              ></input>
              <h5>PLN</h5>
            </div>
            <div
              className="close-icon"
              onClick={() => {
                setPricePerM({ min: "", max: "" });
              }}
            >
              <FontAwesomeIcon
                icon={["fa", "times"]}
                size="xs"
                color="#dddddd"
              />
            </div>
          </div>
        </div>

        <div className="search-description">
          <h5>Disctrict</h5>
          <div className="select-district">
            <select
              id="districts"
              name="districts"
              value={district}
              className="select-dist"
              onChange={(e) => {
                setDistrict(e.target.value);
              }}
            >
              {districtsList.map((district) => {
                return <option>{district}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
      <div
        className="search-button"
        onClick={() =>
          props.handleClickSearch(description, area, price, district)
        }
      >
        <FontAwesomeIcon icon={["fa", "search"]} size="xs" color="white" />
      </div>
    </div>
  );
};
export default SearchBar;
