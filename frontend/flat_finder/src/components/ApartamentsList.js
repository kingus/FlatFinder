import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Apartaments.css";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import Apartament from "./Apartament";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";

const AparamentsList = () => {
  const [apartaments, setApartaments] = useState([]);
  const [filtered_apartaments, setFilteredApartaments] = useState([]);
  const [search, setSearch] = useState("");
  library.add(faHeart, faRegularHeart);

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
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    axios
      .get("http://127.0.0.1:8000/apartament", config)
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

  const handleSearchChange = (e) => {
    setSearch(e);
  };

  const handleClickSearch = () => {
    setFilteredApartaments(
      apartaments.filter((apartament) => {
        return apartament.description
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    );
  };

  const handleLogOut = () => {
    return <Redirect to="/login" />;
  };

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <Navbar handleLogOut={handleLogOut}></Navbar>
        <input onChange={(e) => handleSearchChange(e.target.value)}></input>
        <button onClick={handleClickSearch}>SEARCH</button>
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
