import React, { useState } from "react";
import "./Apartaments.css";
import flat from "../images/flat.jpg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Apartament = (props) => {
  const [isFavourite, setIsFavourite] = useState(true);
  const [heart, setHeart] = useState("#b6b6b6");
  library.add(faHeart, faRegularHeart);

  const heartHandler = () => {
    setIsFavourite(!isFavourite);
    if (isFavourite) {
      setHeart("pink");
    } else {
      setHeart("#b6b6b6");
    }
    props.notify(isFavourite);
  };

  return (
    <div className="apartament">
      <a href={props.offer_url}>
        <img src={flat} alt="Logo" className="apartament_photo" />
      </a>
      <div className="contain">
        <div className="apartament_info">
          <div className="header">
            <a href={props.offer_url}>
              <h2>{props.description} </h2>
            </a>
          </div>
          <h3>Dzielnica: {props.place}</h3>
          <h3>Cena: {props.price} </h3>
          <h3>Cena za metr: {props.price_per_m}</h3>
          <h3>Powierzchnia: {props.area}</h3>
          <h3>Portal: {props.source}</h3>
          <h3>Pokoje: {props.rooms}</h3>
        </div>
        <div className="icon">
          {/* <FontAwesomeIcon
            icon="heart"
            color={heart}
            size="2x"
            onClick={heartHandler}
          /> */}
          <FontAwesomeIcon
            icon={["far", "heart"]}
            color={heart}
            size="2x"
            onClick={heartHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Apartament;
