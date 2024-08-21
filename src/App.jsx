import { useState } from "react";
import "./App.css";
import KMBLogo from "../src/assets/KMB.png";
import { useEffect } from "react";
import RouteBtn from "./component/RouteBtn";
import RouteLts from "./component/RouteLts";
import EtaComponent from "./component/EtaComponent";

function App() {
  // const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [routeResponse, setRouteResponse] = useState(null);
  const [routeArrChecked, setRouteArrChecked] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [showClickedData, setshowClickedData] = useState(false);
  const [routeClickedData, setrouteClickedData] = useState(null);
  const [etaDataObtained, setetaDataObtained] = useState(null);
  const [showEta, setshowEta] = useState(null);

  const handleInputChange = (event) => {
    let inputUpper = event.target.value.toUpperCase();
    let fixInput = inputUpper.replace(/ /g, "");
    setInputValue(fixInput);
  };

  useEffect(() => {
    // console.log(inputValue);
  }, [inputValue]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/v1/transport/kmb/stop");
        const newData = await res.json();
        setData(newData);
      } catch (err) {
        console.log(err);
      }
    }
    if (data == null) {
      fetchData();
    }
    // console.log(data);
  });

  const handleRouteResponse = async () => {
    try {
      const response = await fetch("/api/v1/transport/kmb/route/");
      const routeData = await response.json();
      setRouteResponse(routeData);
      setShowRoute(false);
      setshowClickedData(false);
      setshowEta(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (routeResponse && routeResponse.data) {
      let routes = routeResponse.data;
      let routeChecked = [];
      for (let route of routes) {
        if (route["route"] == inputValue) {
          routeChecked.push(route);
        }
      }
      setRouteArrChecked(routeChecked);
    }
  }, [routeResponse]);

  useEffect(() => {
    if (routeArrChecked && routeArrChecked.length > 0) {
      setShowRoute(true);
      // console.log(routeArrChecked);
    } else {
      setShowRoute(false);
    }
  }, [routeArrChecked]);

  const handleRouteClick = async (route, index) => {
    const routeboundConverted = route.bound == "O" ? "outbound" : "inbound";
    try {
      const routeClicked = await fetch(
        "/api/v1/transport/kmb/route-stop/" +
          route.route +
          "/" +
          routeboundConverted +
          "/" +
          route.service_type
      );
      const routeClickedData = await routeClicked.json();
      setrouteClickedData(routeClickedData);
      setshowEta(false);

      // console.log(routeClickedData);
      if (routeClickedData) {
        setshowClickedData(true);
        // console.log(showClickedData);
      } else {
        setshowClickedData(false);
      }
    } catch (error) {
      console.log("no data can be fetched");
    }
  };

  const handleClickedData = async (stopMatching, route) => {
    try {
      const eta = await fetch(
        "/api/v1/transport/kmb/eta/" +
          stopMatching.stop +
          "/" +
          route.route +
          "/" +
          route.service_type
      );
      const etaData = await eta.json();
      // console.log(etaData.data);
      let filter_arrayOfEtas = etaData.data.filter(function (info) {
        return (
          info.dir == route.bound &&
          info.service_type == route.service_type &&
          info.seq == route.seq
        );
      });
      setetaDataObtained(filter_arrayOfEtas);
      if (filter_arrayOfEtas) {
        setshowEta(true);
      } else {
        setshowEta(false);
      }

      // console.log(etaDataObtained);
    } catch (error) {
      console.log(error);
    }
  };

  const parenthandleCLose = () => {
    setshowEta(false);
  };

  return (
    <div>
      <div className="kmbLogo">
        <img
          src={KMBLogo}
          alt="logo"
          style={{
            height: "100px",
            width: "300px",
            objectFit: "cover",
            margin: "15px",
          }}
        />
      </div>

      <div className="rounded-xl flex border-2 border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
        <input
          type="input"
          placeholder="Search bus routes..."
          className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
          id="searchbox"
          onChange={handleInputChange}
          value={inputValue}
        />
        <button
          type="button"
          className="flex items-center justify-center bg-[#007bff] px-5 text-sm text-white"
          id="searchBtn"
          onClick={handleRouteResponse}
        >
          Search
        </button>
      </div>

      {showRoute && (
        <RouteBtn routes={routeArrChecked} handleClick={handleRouteClick} />
      )}

      {showClickedData && (
        <RouteLts
          routes={routeClickedData.data}
          stops={data}
          handleClick={handleClickedData}
        />
      )}

      {showEta && (
        <EtaComponent eta={etaDataObtained} handleClose={parenthandleCLose} />
      )}
    </div>
  );
}

export default App;
