import React, { useEffect, useState } from "react";
import "../css/Contact.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Navbar from "./Navbar.js";

const Contact = props => {
  const [data, setData] = useState([]);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  const helpButton = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayLocationInfo);
    }

    function displayLocationInfo(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      console.log(`longitude: ${lng} | latitude: ${lat}`);
      setLongitude(lng);
      setLatitude(lat);
      console.log(longitude + " this is long");
      console.log(latitude + " this is lat");
    }
  };

  useEffect(() => {
    if (latitude === 0 && latitude === 0) {
      console.log("cannot get location");
    } else {
      axios
        .get(
          `https://api.betterdoctor.com/2016-03-01/doctors?location=${latitude},${longitude},100&skip=2&limit=3&user_key=e22ad77855d46b63d13c61d86916a357`
        )
        .then(res => {
          let list = res.data.data;
          // console.log(list);

          let viable = []; // available nearby doctors

          list.forEach(object => {
            // console.log(object);
            object.practices.forEach(practice => {
              // console.log(practice);
              if (
                practice.within_search_area &&
                practice.accepts_new_patients
              ) {
                viable.push(practice);
              }
            });
          });

          console.log(viable);
          setData(viable);
        });
    }
  });
  return (
    <>
      <Navbar />
      <div className="LungCancer">
        <h1 className="CancerTitle">Lung Cancer</h1>
        <img className="LungImage" src="/img/lung.jpg" />

        <div className="LungCancerBody">
          <h3>INTRO</h3>
          <p>
            Lung cancer is the leading cause of cancer death for both men and
            women. About 26% of all cancer deaths are from lung cancer.
          </p>
          <p>
            Lung Cancer is responsible for more deaths in Canada than breast,
            prostate and colon cancer combined.
          </p>

          <h3>CAUSES</h3>
          <p>
            Tobacco smoking is the number one cause of lung cancer. (85%-90%)
          </p>
          <p>Long term exposure to high concentrations of radon </p>

          <h3>SYMPTOMS</h3>
          <p>
            Early stages of lung cancer often have no symptoms. Because of this,
            most lung cancer patients already have advanced disease by the time
            they are diagnosed.
          </p>
          <p>Symptoms of advanced stages may include:</p>
          <ul>
            <li>
              New, changing or worsening cough, especially if the sputum
              contains blood
            </li>
            <li>
              Change in the ability to perform exercise (e.g. shortness of
              breath with walking)
            </li>
            <li>Repeated episodes of pneumonia and/or bronchitis</li>
            <li>Fever, weakness, weight loss</li>
            <li>Chest pain</li>
            <li>Difficulty swallowing</li>
            <li>Growth of lymph nodes in the neck</li>
          </ul>

          <h3>PREVENTIONS</h3>
          <p>
            Don’t smoke, and avoid exposure to tobacco and cigarette smoke.{" "}
          </p>
          <p>
            {" "}
            Quitting will reduce your cancer risk. Your risk of lung cancer
            decreases for each year that you haven't smoked. Ten years after
            quitting, the risk of dying from lung cancer is about half that of a
            person who is still smoking.
          </p>
          <p>
            If you live in an area where radon gas is likely, consider ways to
            reduce radon build up in your home.
          </p>
          <p>
            Lung cancer screening using low-dose CT scans is currently
            recommended by the Canadian Task Force on Preventive Health Care.{" "}
          </p>

          <h3>TREATMENT</h3>
          <ul>
            <li>Surgery</li>
            <li>Radiation Therapy</li>
            <li>Chemotherapy</li>
          </ul>

          <h3>REFERENCES</h3>
          <a
            href="https://bccancerfoundation.com/why-give/research/lung"
            target="_blank"
          >
            BC Cancer Foundation
          </a>
          <br />
          <a
            href="http://www.bccancer.bc.ca/health-info/types-of-cancer/lung/lung"
            target="_blank"
          >
            BC Cancer
          </a>
        </div>
        {data.map(data => (
          <h1 key={data.name}>
            Name: {data.name}
            Address: {data.visit_address.street}, {data.visit_address.city}
            {/* <img className="profile-picture" src={data.profile.image_url} /> */}
          </h1>
        ))}
        <button onClick={helpButton}>get help</button>
      </div>
    </>
  );
};

export default Contact;
