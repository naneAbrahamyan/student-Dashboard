import React, { useContext } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { ThemeContext } from "../../context/ThemeProvider";
import { DataContext } from "../../context/DataProvider";

export default function Form() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    password: "",
    country: "",
    city: "",
  });

  const [countries, setCountries] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const { theme } = useContext(ThemeContext);
  const { setQuery } = useContext(DataContext);

  React.useEffect(() => {
    fetch("https://api.example.com/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setFormData((prevData) => ({ ...prevData, country }));

    fetch(`https://api.example.com/countries/${country}/cities`)
      .then((response) => response.json())
      .then((data) => setCities(data));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:8050/students", formData)
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          age: "",
          password: "",
          country: "",
          city: "",
        });
      })
      .catch((error) => {
        console.error("There was an error submitting the form:", error);
        alert("error while submiting the form", error.message);
      });

    setQuery(Math.random());
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputProps={{
          className: `${theme}-form`,
        }}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputProps={{
          className: `${theme}-form`,
        }}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputProps={{
          className: `${theme}-form`,
        }}
      />
      <TextField
        label="Age"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputProps={{
          className: `${theme}-form`,
        }}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputProps={{
          className: `${theme}-form`,
        }}
      />
      <FormControl fullWidth margin="normal" className={`${theme}-form`}>
        <InputLabel
          id="country-label"
          className={`${theme}-form`}
          //   InputProps={{
          //     className: `${theme}-form`,
          //   }}
        >
          Country
        </InputLabel>
        <Select
          labelId="country-label"
          name="country"
          value={formData.country}
          onChange={handleCountryChange}
          InputProps={{
            className: `${theme}-form`,
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {countries.map((country) => (
            <MenuItem key={country.code} value={country.code}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" className={`${theme}-form`}>
        <InputLabel
          id="city-label"
          InputProps={{
            className: `${theme}-form`,
          }}
        >
          City
        </InputLabel>
        <Select
          labelId="city-label"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          disabled={!formData.country}
          InputProps={{
            className: `${theme}-form`,
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {cities.map((city) => (
            <MenuItem key={city.code} value={city.code}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}
