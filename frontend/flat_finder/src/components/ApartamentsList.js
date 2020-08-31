import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import "./Apartaments.css";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Apartament from "./Apartament";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AparamentsList = () => {
  const [apartaments, setApartaments] = useState([]);
  const [filtered_apartaments, setFilteredApartaments] = useState([]);
  library.add(faSearch, faPlus, faMinus);

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
    const body = JSON.stringify({ user: "kinga999" });

    const config = {
      headers: { "Content-Type": "application/json" },
      data: body,
    };

    axios
      .get("http://127.0.0.1:8000/users-apartaments?user=kinga999", config)
      .then(function (response) {
        // handle success
        setApartaments(response.data.apartaments);
        setFilteredApartaments(response.data.apartaments);
        console.log(response.data.apartaments);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  // getApartaments();
  // apartaments.map((apartament) => {});

  useEffect(() => {
    getApartaments();
  }, []);

  const handleClickSearch = (searchDescription, area, price, district) => {
    var area_min = area.min;
    var area_max = area.max;
    var price_min = price.min;
    var price_max = price.max;

    if (!(area_min || area_max)) {
      area_min = 0;
      area_max = 99999999;
    }
    if (!(price_min || price_max)) {
      price_min = 0;
      price_max = 99999999;
    }

    setFilteredApartaments(
      apartaments.filter((apartament) => {
        console.log(apartament.district);

        if (
          apartament.description
            .toLowerCase()
            .includes(searchDescription.toLowerCase()) &&
          area_min <= apartament.area &&
          apartament.area <= area_max &&
          price_min <= apartament.price &&
          apartament.price <= price_max &&
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

  const refreshData = () => {};

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <Navbar handleLogOut={handleLogOut}></Navbar>
        <SearchBar handleClickSearch={handleClickSearch}></SearchBar>
        <button onClick={refreshData}>REFRESH DATA</button>

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
