import React from "react";

import axios from "axios";

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "AL",
      jobtitle: "Account",
      level: "Level 1"
    };
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleJobTitleChange = this.handleJobTitleChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getDataAxios = this.getDataAxios.bind(this);
  }

  async getDataAxios() {
    // const response = $.ajax({
    //   url: "/search?q=" + query
    // })
    const response = await axios.get("/user?q=hehehehehe");
    // , {
    //   data: {
    //     location: this.state.location,
    //     jobtitle: this.state.jobtitle,
    //     level: this.state.level
    //   }
    // });
    console.log(response.data);
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
    alert(this.state.location + this.state.jobtitle + this.state.level);
    //event.preventDefault();
    this.getDataAxios();
  }

  render() {
    return ( <
      form onSubmit = {
        this.handleSubmit
      } >
      <
      label >
      State <
      select value = {
        this.state.location
      }
      onChange = {
        this.handleLocationChange
      } >
      <
      option value = "AL" > AL < /option> <
      option value = "AK" > AK < /option> <
      option value = "AZ" > AZ < /option> <
      option value = "AR" > AR < /option> <
      option value = "CA" > CA < /option> <
      option value = "CO" > CO < /option> <
      option value = "CT" > CT < /option> <
      option value = "DE" > DE < /option> <
      option value = "FL" > FL < /option> <
      option value = "GA" > GA < /option> <
      option value = "HI" > HI < /option> <
      option value = "ID" > ID < /option> <
      option value = "IL" > IL < /option> <
      option value = "IN" > IN < /option> <
      option value = "IA" > IA < /option> <
      option value = "KS" > KS < /option> <
      option value = "KY" > KY < /option> <
      option value = "LA" > LA < /option> <
      option value = "ME" > ME < /option> <
      option value = "MD" > MD < /option> <
      option value = "MA" > MA < /option> <
      option value = "MI" > MI < /option> <
      option value = "MN" > MN < /option> <
      option value = "MS" > MS < /option> <
      option value = "MO" > MO < /option> <
      option value = "MT" > MT < /option> <
      option value = "NE" > NE < /option> <
      option value = "NV" > NV < /option> <
      option value = "NH" > NH < /option> <
      option value = "NJ" > NJ < /option> <
      option value = "NM" > NM < /option> <
      option value = "NY" > NY < /option> <
      option value = "NC" > NC < /option> <
      option value = "ND" > ND < /option> <
      option value = "OH" > OH < /option> <
      option value = "OK" > OK < /option> <
      option value = "OR" > OR < /option> <
      option value = "PA" > PA < /option> <
      option value = "RI" > RI < /option> <
      option value = "SC" > SC < /option> <
      option value = "SD" > SD < /option> <
      option value = "TN" > TN < /option> <
      option value = "TX" > TX < /option> <
      option value = "UT" > UT < /option> <
      option value = "VT" > VT < /option> <
      option value = "VA" > VA < /option> <
      option value = "WA" > WA < /option> <
      option value = "WV" > WV < /option> <
      option value = "WI" > WI < /option> <
      option value = "WY" > WY < /option> < /
      select > <
      /label> <
      label >
      Job Title <
      select value = {
        this.state.jobtitle
      }
      onChange = {
        this.handleJobTitleChange
      } >
      <
      option value = "Accountant" > Accountant < /option> <
      option value = "Analyst" > Analyst < /option> <
      option value = "Architect" > Architect < /option> <
      option value = "Assistant Professor" > Assistant Professor < /option> <
      option value = "Associate" > Associate < /option> <
      option value = "Consultant" > Consultant < /option> <
      option value = "Manager" > Manager < /option> <
      option value = "Physical Therapist" > Physical Therapist < /option> <
      option value = "Postdoctoral Fellow" > Postdoctoral Fellow < /option> <
      option value = "Project Manager" > Project Manager < /option> <
      option value = "Research Assistant" > Research Assistant < /option> <
      option value = "Software Engineer/Developer" >
      Software Engineer <
      /option> <
      option value = "Technical Lead" > Technical < /option> < /
      select > <
      /label> <
      label >
      Level <
      select value = {
        this.state.level
      }
      onChange = {
        this.handleLevelChange
      } >
      <
      option value = "Level I" > Level 1 < /option> <
      option value = "Level II" > Level 2 < /option> <
      option value = "Level III" > Level 3 < /option> <
      option value = "Level IV" > Level 4 < /option> < /
      select > <
      /label> <
      input type = "submit"
      value = "Submit" / >
      <
      /form>
    );
  }
}

export default FlavorForm;