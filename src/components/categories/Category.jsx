import React from "react";
import "./category.scss";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
function Category() {
  return (
    <div className="categories">
      <div className="cate-list">
        <div className="cate button-btn">
          <h3>Jobs</h3>
        </div>
        <div className="cate button-btn">
          <h3>Fast Jobs</h3>
        </div>

        <div className="cate button-btn">
          <h3>Wanted</h3>
        </div>
        <div className="cate button-btn">
          <h3>Full Time</h3>
        </div>
        <div className="cate button-btn">
          <h3>Part Time</h3>
        </div>
        <div className="cate button-btn">
          <h3>Freelancer</h3>
        </div>
        <div className="cate button-btn">
          <h3>Policy</h3>
        </div>
      </div>

      <div className="filter">
        {/* <h3>Hot search</h3> */}
        <div className="sort">
          <Box className={"sort-btn"} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Age
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: "age",
                  id: "uncontrolled-native",
                }}
              >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </NativeSelect>
            </FormControl>
          </Box>

          <Box className={"sort-btn"} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Age
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: "age",
                  id: "uncontrolled-native",
                }}
              >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </NativeSelect>
            </FormControl>
          </Box>

          <Box className={"sort-btn"} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Age
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: "age",
                  id: "uncontrolled-native",
                }}
              >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Category;
