import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Apartaments.css";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import Apartament from "./Apartament";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AparamentsList = () => {
  const [apartaments, setApartaments] = useState([]);

  library.add(faHeart, faCoffee, faRegularHeart);
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
      },
    };

    axios
      .get("http://127.0.0.1:8000/apartament", config)
      .then(function (response) {
        // handle success
        setApartaments(response.data.apartaments);
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

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <Navbar></Navbar>
        <div className="apartaments_list">
          {apartaments.map((apartament) => {
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
