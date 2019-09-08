import React from "react";
import Chart from "react-apexcharts";
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://127.0.0.1:5000");

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "AL",
      jobtitle: "Account",
      level: "Level I",
      clicked: false
    };
    this.data = {
      avgsalary: 100,
      maxsalary: 200000,
      minsalary: 0,
      avgrent: 5,
      maxrent: 10,
      minrent: 0,
      score: 5
    };
    this.points1 = {
      options: {
        chart: {
          stacked: true
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        stroke: {
          width: 0.2,
          colors: ["#fff"]
        },
        colors: ["#64b5f6"],
        title: {
          text: "Salary"
        },
        xaxis: {
          categories: [],
          min: this.data.minsalary,
          max: this.data.maxsalary,
          labels: {
            formatter: function(val) {
              return val + "K";
            }
          }
        },
        yaxis: {
          title: {
            text: undefined
          }
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + "K";
            }
          }
        },
        fill: {
          opacity: 1
        },

        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40
        }
      },
      series: [
        {
          name: "Salary",
          data: [this.data.avgsalary]
        }
      ]
    };
    this.points2 = {
      options: {
        chart: {
          stacked: true
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        colors: ["#ffd54f"],

        title: {
          text: "Rent"
        },
        xaxis: {
          categories: [],
          min: this.data.minrent,
          max: this.data.maxrent,
          labels: {
            formatter: function(val) {
              return val + "K";
            }
          }
        },
        yaxis: {
          title: {
            text: undefined
          }
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + "K";
            }
          }
        },
        fill: {
          opacity: 1
        },

        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40
        }
      },
      series: [
        {
          name: "Rent",
          data: [this.data.avgrent]
        }
      ]
    };
    this.points3 = {
      options: {
        chart: {
          stacked: true
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        colors: ["#f8bbd0"],
        title: {
          text: "Life Happiness"
        },
        xaxis: {
          categories: [],
          min: 0,
          max: 10,
          labels: {
            formatter: function(val) {
              return val + "K";
            }
          }
        },
        yaxis: {
          title: {
            text: undefined
          }
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + "K";
            }
          }
        },
        fill: {
          opacity: 1
        },

        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40
        }
      },
      series: [
        {
          name: "Life Happiness",
          data: [this.data.score]
        }
      ]
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleJobTitleChange = this.handleJobTitleChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
    this.drawGraph = this.drawGraph.bind(this);
  }

  getData() {
    socket.emit("send data", this.state);
    console.log(this.state)
    socket.on("incomming data", response => {
      console.log(response);
      this.data.maxrent = response.max;
      this.data.minrent = response.min;
      this.data.score = response.index;
      this.data.avgrent = response.avg;
      this.data.avgsalary = response.predictWage;
    });
  }

  handleLocationChange(event) {
    this.setState({
      location: event.target.value
    });
  }
  handleJobTitleChange(event) {
    this.setState({
      jobtitle: event.target.value
    });
  }
  handleLevelChange(event) {
    this.setState({
      level: event.target.value
    });
  }

  handleSubmit(event) {
    this.setState({
      clicked: true
    });
    event.preventDefault();
    this.getData();
  }

  drawGraph() {
    console.log("yes");

    return (
      <div className="chart">
        <Chart
          options={this.points1.options}
          series={this.points1.series}
          type="bar"
          height="150"
        />
        <Chart
          options={this.points2.options}
          series={this.points2.series}
          type="bar"
          height="150"
        />
        <Chart
          options={this.points3.options}
          series={this.points3.series}
          type="bar"
          height="150"
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            State
            <select
              value={this.state.location}
              onChange={this.handleLocationChange}
            >
              <option value="AL">AL</option>
              <option value="AK">AK</option>
              <option value="AZ">AZ</option>
              <option value="AR">AR</option>
              <option value="CA">CA</option>
              <option value="CO">CO</option>
              <option value="CT">CT</option>
              <option value="DE">DE</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="HI">HI</option>
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="IA">IA</option>
              <option value="KS">KS</option>
              <option value="KY">KY</option>
              <option value="LA">LA</option>
              <option value="ME">ME</option>
              <option value="MD">MD</option>
              <option value="MA">MA</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="MS">MS</option>
              <option value="MO">MO</option>
              <option value="MT">MT</option>
              <option value="NE">NE</option>
              <option value="NV">NV</option>
              <option value="NH">NH</option>
              <option value="NJ">NJ</option>
              <option value="NM">NM</option>
              <option value="NY">NY</option>
              <option value="NC">NC</option>
              <option value="ND">ND</option>
              <option value="OH">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="TX">TX</option>
              <option value="UT">UT</option>
              <option value="VT">VT</option>
              <option value="VA">VA</option>
              <option value="WA">WA</option>
              <option value="WV">WV</option>
              <option value="WI">WI</option>
              <option value="WY">WY</option>
            </select>
          </label>
          <label>
            Job Title
            <select
              value={this.state.jobtitle}
              onChange={this.handleJobTitleChange}
            >
              <option value="Accountant">Accountant</option>
              <option value="Analyst">Analyst</option>
              <option value="Architect">Architect</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Associate">Associate</option>
              <option value="Consultant">Consultant</option>
              <option value="Manager">Manager</option>
              <option value="Physical Therapist">Physical Therapist</option>
              <option value="Postdoctoral Fellow">Postdoctoral Fellow</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Research Assistant">Research Assistant</option>
              <option value="Software Engineer/Developer">
                Software Engineer
              </option>
              <option value="Technical Lead">Technical</option>
            </select>
          </label>
          <label>
            Level
            <select value={this.state.level} onChange={this.handleLevelChange}>
              <option value="Level I">Level 1</option>
              <option value="Level II">Level 2</option>
              <option value="Level III">Level 3</option>
              <option value="Level IV">Level 4</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="graph">
          {this.state.clicked ? this.drawGraph() : null}
        </div>
      </div>
    );
  }
}

export default FlavorForm;
