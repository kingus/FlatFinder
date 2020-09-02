import React, { useState, useEffect, useContext, useRef } from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import "./Apartaments.css";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faPlus,
  faMinus,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import Apartament from "./Apartament";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AparamentsList = () => {
  const [apartaments, setApartaments] = useState([]);
  const [filtered_apartaments, setFilteredApartaments] = useState([]);
  const context = useContext(AuthContext);
  library.add(faSearch, faPlus, faMinus, faSync);

  const notify = (ifAdded) => {
    var notification = "";
    if (ifAdded) {
      notification = "The apartament has been added to favourites ❤";
    } else {
      notification = "The apartament has been removed from favourites ❤";
    }
    toast(notification, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
    });
  };

  const getApartaments = () => {
    console.log("CCC");
    var username = context.username;
    const body = JSON.stringify({ user: username });
    console.log("context", username);

    const config = {
      headers: { "Content-Type": "application/json" },
      data: body,
    };

    axios
      .get(`http://127.0.0.1:8000/users-apartaments?user=${username}`, config)
      .then(function (response) {
        setApartaments(response.data.apartaments);
        setFilteredApartaments(response.data.apartaments);
        console.log(response.data.apartaments);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let isRendered = useRef(false);
  useEffect(() => {
    isRendered = true;
    getApartaments();
    return () => {
      isRendered = false;
    };
  }, []);

  const handleClickSearch = (
    searchDescription,
    area,
    price,
    district,
    pricePerM
  ) => {
    var area_min = area.min;
    var area_max = area.max;
    var price_min = price.min;
    var price_max = price.max;
    var price_per_m_min = pricePerM.min;
    var price_per_m_max = pricePerM.max;
    console.log(price_per_m_min);
    console.log(price_per_m_max);

    if (!(area_min || area_max)) {
      area_min = 0;
      area_max = 99999999;
    }
    if (!(price_min || price_max)) {
      price_min = 0;
      price_max = 99999999;
    }
    if (!(price_min || price_max)) {
      price_per_m_min = 0;
      price_per_m_max = 99999999;
    }

    setFilteredApartaments(
      apartaments.filter((apartament) => {
        console.log("TYYYY", apartament.pricePerM);
        if (
          apartament.description
            .toLowerCase()
            .includes(searchDescription.toLowerCase()) &&
          area_min <= apartament.area &&
          apartament.area <= area_max &&
          price_min <= apartament.price &&
          apartament.price <= price_max &&
          price_per_m_min <= apartament.pricePerM &&
          apartament.pricePerM <= price_per_m_max &&
          apartament.place.toLowerCase().includes(district.toLowerCase())
        ) {
          return apartament;
        }
      })
    );
  };

  const handleLogOut = () => {
    return <Redirect to="/login" />;
  };

  const refreshData = () => {
    var username = context.username;
    const body = JSON.stringify({ user: username });

    const config = {
      headers: { "Content-Type": "application/json" },
      data: body,
    };

    axios
      .post(`http://127.0.0.1:8000/users-apartaments?user=${username}`, config)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <Navbar handleLogOut={handleLogOut}></Navbar>
        <SearchBar handleClickSearch={handleClickSearch}></SearchBar>
        {/* <button onClick={refreshData}>REFRESH DATA</button> */}
        <div className="refresh" onClick={() => refreshData()}>
          <FontAwesomeIcon icon={["fa", "sync"]} size="2x" />
        </div>
        <div className="apartaments_list">
          {filtered_apartaments.map((apartament) => {
            return (
              <Apartament
                key={apartament.apartament_id}
                description={apartament.description}
                place={apartament.place}
                area={apartament.area}
                price_per_m={apartament.price_per_m}
                price={apartament.price}
                source={apartament.source}
                offer_url={apartament.offer_url}
                rooms={apartament.rooms}
                apa={apartament.apartament_id}
                notify={notify}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AparamentsList;
