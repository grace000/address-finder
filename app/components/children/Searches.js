var React = require("react");

var Searches = React.createClass({


	render() {
		return (
			<div className="panel panel-default">
        		<div className="panel-heading">
          			<h3 className="panel-title text-center">History</h3>
        		</div>
        	 <div className="panel-body text-center">

          		{/* Here we use a map function to loop through an array in JSX */}
          		{this.props.location.map(function(search, i) {
            		return (
             		 <p key={i}>{search.location} - {search.date}</p>
            		);
          		})}
        	 </div>	
        	</div>	
      );
	}
})

module.exports = Searches;