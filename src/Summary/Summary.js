import React, { Component } from 'react';
import './Summary.css';
import { Link } from 'react-router-dom';

class Summary extends Component {
  render() {
    return (
      <div className="Summary">
				<div className="container-fluid myPadding">
					<h1>This is the summary page</h1>
					<div className="row">
            <div className="col-sm-12">
              <div className="col-sm-9">
                <h1>My Dinner:
                	<span id="nGuests"></span> 
								</h1>
              </div>
              <div className="col-sm-3">
								<Link to="./search">
                	<button id ="return_to_previous_page_button" type="button" className="btn btn-primary">
										<span className="glyphicon glyphicon-arrow-left"></span>Return to previous page
									</button>
								</Link>
              </div>
            
            </div>
        	</div>
				</div>
      </div>
    );
  }
}

export default Summary;
