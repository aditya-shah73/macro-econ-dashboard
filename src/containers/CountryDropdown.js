import React from "react";
import { connect } from "react-redux";
import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import Flags from "country-flag-icons/react/3x2";
const countries = {
  USA: <Flags.US title="United States" style={{ width: "30px" }} />,
  China: <Flags.CH title="China" style={{ width: "30px" }} />,
  India: <Flags.IN title="India" style={{ width: "30px" }} />,
};

function CountrySelectItem({ country }) {
  return (
    <>
      {countries[country]}
      &nbsp;
      {country}
    </>
  );
}
function CountryDropdown({ selected, updateCountry }) {
  const onCountryChange = (country) => {
    if (country !== selected) {
      updateCountry(country);
    }
  };

  return (
    <DropdownButton
      as={ButtonGroup}
      id={`dropdown-variants-primary`}
      variant={"primary"}
      title={<CountrySelectItem country={selected} />}
      className="mt-1"
      style={{ width: "90%", pointer: "cursor" }}
    >
      {Object.keys(countries).map((key) => (
        <Dropdown.Item
          key={key}
          eventKey={key}
          active={selected === key}
          onClick={() => {
            onCountryChange(key);
          }}
        >
          <CountrySelectItem country={key} />
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}
const mapStateToProps = (state) => {
  return {
    selected: state.global.country,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateCountry: (country) => {
      dispatch({ type: "COUNTRY", payload: country });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CountryDropdown);
