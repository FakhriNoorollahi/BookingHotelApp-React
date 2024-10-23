import React, { useRef, useState } from "react";
import { MdEditCalendar, MdLocationOn } from "react-icons/md";
import { HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import useOutsideClick from "../../hooks/useOutsideClick";
import { NavLink, createSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Header() {
  const { isAuth, user, logout } = useAuth();
  const [destination, setDestination] = useState("");
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const minOptions = { adult: 1, children: 0, room: 1 };
  const navigate = useNavigate();
  const query = {
    date: JSON.stringify(dateRange),
    destination,
    option: JSON.stringify(options),
  };

  const handleSearch = () => {
    navigate({
      pathname: "/hotels",
      search: createSearchParams(query).toString(),
    });
  };

  return (
    <div className="header">
      <NavLink
        to={`/bookmarks`}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Bookmarks
      </NavLink>
      <div className="headerSearch">
        <HeaderSearchCity
          destination={destination}
          setDestination={setDestination}
        />
        <HeaderDate dateRange={dateRange} setDateRange={setDateRange} />
        <HeaderOptions
          options={options}
          setOptions={setOptions}
          minOptions={minOptions}
        />
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
      <IsAuthentication isAuth={isAuth} user={user} logout={logout} />
    </div>
  );
}

export default Header;

function HeaderSearchCity({ destination, setDestination }) {
  return (
    <div className="headerSearchItem">
      <MdLocationOn className="headerIcon locationIcon " />
      <input
        className="headerSearchInput"
        type="text"
        placeholder="Where to go?"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <span className="seperator"></span>
    </div>
  );
}

function HeaderDate({ dateRange, setDateRange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dateRef = useRef();
  useOutsideClick(dateRef, "dateText", () => setIsOpen(false));
  return (
    <div className="headerSearchItem">
      <MdEditCalendar className="headerIcon dateIcon" />
      <div className="dateDropDown">
        <span id="dateText" onClick={(e) => setIsOpen(!isOpen)}>
          {format(new Date(dateRange[0].startDate), "yyyy/MM/dd")}
          &nbsp;to&nbsp;
          {format(new Date(dateRange[0].endDate), "yyyy/MM/dd")}
        </span>
      </div>
      {isOpen && (
        <div ref={dateRef}>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            minDate={new Date()}
            className="date"
          />
        </div>
      )}
      <span className="seperator"></span>
    </div>
  );
}

function HeaderOptions({ options, setOptions, minOptions }) {
  const [isOpen, setIsOpen] = useState(false);
  const optionRef = useRef();

  useOutsideClick(optionRef, "optionText", () => setIsOpen(false));
  return (
    <div className="headerSearchItem">
      <div>
        <span id="optionText" onClick={(e) => setIsOpen(!isOpen)}>
          {options["adult"]} adult &bull; {options["children"]} children
          &bull;&nbsp;
          {options["room"]} room
        </span>
        {isOpen && (
          <div className="guestOptions" ref={optionRef}>
            {Object.keys(options).map((item, index) => (
              <HeaderOptionsItem
                key={index}
                keyName={item}
                keyVal={options[item]}
                setOptions={setOptions}
                minimumVal={minOptions[item]}
                options={options}
              />
            ))}
          </div>
        )}
      </div>
      <span className="seperator"></span>
    </div>
  );
}

function HeaderOptionsItem({
  keyName,
  keyVal,
  setOptions,
  minimumVal,
  options,
}) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{keyName}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          onClick={(e) => setOptions({ ...options, [keyName]: keyVal - 1 })}
          disabled={keyVal <= minimumVal}
        >
          <HiMinus />
        </button>
        <span>{keyVal}</span>
        <button
          className="optionCounterBtn"
          onClick={(e) => setOptions({ ...options, [keyName]: keyVal + 1 })}
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
}

function IsAuthentication({ isAuth, user, logout }) {
  return (
    <div>
      {isAuth ? (
        <button className="buttons" onClick={(e) => logout(e)}>
          <strong>{user.name}</strong>{" "}
          <HiOutlineArrowRightOnRectangle className="icon logout" />
        </button>
      ) : (
        <NavLink
          to={`/login`}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          login
        </NavLink>
      )}
    </div>
  );
}
