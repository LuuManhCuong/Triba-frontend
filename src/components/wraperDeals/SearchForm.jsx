import React, { useState } from "react";

function SearchForm() {
  const [location, setLocation] = useState("Destinations");
  const [price, setPrice] = useState("Price Range");

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý tìm kiếm khi người dùng nhấn nút tìm kiếm
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <div className="row inner">
          <div className="col-lg-2">
            <h4>Sort Deals By:</h4>
          </div>
          <div className="col-lg-4">
            <select
              name="Location"
              className="form-select"
              aria-label="Default select example"
              id="chooseLocation"
              value={location}
              onChange={handleLocationChange}
            >
              <option value="Destinations">Destinations</option>
              <option value="Italy">Italy</option>
              <option value="France">France</option>
              {/* Các option khác */}
            </select>
          </div>
          <div className="col-lg-4">
            <select
              name="Price"
              className="form-select"
              aria-label="Default select example"
              id="choosePrice"
              value={price}
              onChange={handlePriceChange}
            >
              <option value="Price Range">Price Range</option>
              <option value="100">$100 - $250</option>
              <option value="250">$250 - $500</option>
              {/* Các option khác */}
            </select>
          </div>
          <div className="col-lg-2">
            <button className="border-button" type="submit">
              Search Results
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
