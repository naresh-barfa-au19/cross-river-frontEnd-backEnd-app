import React, { Component } from "react";

import axios from "axios";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      RiverVelocity: "",
      RiverWidth: "",
      PersonVelocity: "",
      result: {},
    };
  }

  inputHandler = (e) => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/enterdata", {
        RiverVelocity: this.state.RiverVelocity,
        RiverWidth: this.state.RiverWidth,
        PersonVelocity: this.state.PersonVelocity,
      })
      .then((response) => {
        console.log(response);
        this.setState({ result: response.data.result });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <h4>problem statement</h4>
        <p>
          There is a use case where a person wishes to swim with V m/s velocity
          across a river with a X m/s velocity and and width of W meter .
        </p>
        <br />
        <form method="POST" onSubmit={this.submitHandler}>
          <label>River Width :</label>{" "}
          <input
            type="number"
            name="RiverWidth"
            min="0"
            value={this.state.RiverWidth}
            onChange={this.inputHandler}
          />
          <br />
          <label>River Velocity :</label>
          <input
            type="number"
            name="RiverVelocity"
            min="0"
            value={this.state.RiverVelocity}
            onChange={this.inputHandler}
          />
          <br />
          <label>Person Velocity :</label>
          <input
            type="number"
            name="PersonVelocity"
            min="0"
            value={this.state.PersonVelocity}
            onChange={this.inputHandler}
          />
          <br />
          <br />
          <button type="submit"> Submit </button>
        </form>
        <br />
        {Object.keys(this.state.result).length !== 0 ? (
          <div>
            <h5>trejectory_angle : {this.state.result.angle} Degree </h5>
            <h5>taken_time : {this.state.result.Time} seconds </h5>
          </div>
        ) : (
          ""
        )}
        <br />
      </React.Fragment>
    );
  }
}
export default Form;
