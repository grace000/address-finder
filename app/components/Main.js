// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var Searches = require("./children/Searches");

// Helper Function
var helpers = require("./utils/helpers.js");

// This is the main component.
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    return { searchTerm: "", results: "", location: []};
  },

  componentDidMount: function() {
    helpers.getHistory().then(function(response){
      console.log(response);
      if(response !== this.state.location){
        console.log("searches:", response.data);
        this.setState({location: response.data});
      }
    }.bind(this));
  },

  // If the component updates we'll run this code
  componentDidUpdate: function(prevProps, prevState) {

    if (prevState.searchTerm !== this.state.searchTerm) {
      console.log("UPDATED");

      helpers.runQuery(this.state.searchTerm).then(function(data) {
        if (data !== this.state.results) {
          console.log("HERE");
          console.log(data);

          this.setState({ results: data });

          helpers.postHistory(this.state.searchTerm).then(function(){
            console.log("Updated history!");

            helpers.getHistory().then(function(response){
              console.log("current", response);
              this.setState({location: response.data});
            }.bind(this))
          }.bind(this))
        }
      }.bind(this));

    }
  },
  // We use this function to allow children to update the parent with searchTerms.
  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },

  // Here we describe this component's render method
  render: function() {
    return (
      <div className="container">

        <div className="row">

          <div className="jumbotron">
            <h2 className="text-center">Address Finder!</h2>
            <p className="text-center">
              <em>Enter a landmark to search for its exact address (ex: "Eiffel Tower").</em>
            </p>
          </div>

          <div className="col-md-6">

            <Form setTerm={this.setTerm} />

          </div>

          <div className="col-md-6">

            <Results address={this.state.results} />

          </div>

          <div className="row">
            <div className="col-md-12">

              <Searches location={this.state.location} />

            </div>
          </div>
        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
