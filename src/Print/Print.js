import React, { Component } from 'react';
import './Print.css';
import { Link } from 'react-router-dom';

class Print extends Component {
	constructor(props) {
		super(props)

		this.state = {
			nGuests: this.props.model.getNumberOfGuests(),
			totalPrice: this.props.model.getTotalMenuPrice(),
			dishesSelected: this.props.model.getMenu()
		}
	}
	componentDidMount() {
    this.props.model.addObserver(this)
  }

	update(){
		this.setState({
			numberOfGuests: this.props.model.getNumberOfGuests(),
			totalPrice: this.props.model.getTotalMenuPrice (),
			dishesSelected: this.props.model.getMenu()
		})
	}

  render() {
		let menu =null;

		menu = this.state.dishesSelected.map((dish) =>
			<div className="row border-Bottom">
				<div className="col-md-1"></div> 
				<div className="col-md-2"> 
					<img src={dish.image} style={{width:150, height: 150}}/> 
				</div> 
				<div className="col-md-4"> 
					<h5>{dish.title}</h5> 
					<p>{dish.instructions }</p> 
				</div>  
				<div className="col-md-4"> 
					<h5>Preperations</h5> 
					<p> {dish.instructions}</p> 
				</div> 
				<div className="col-md-4">
				</div>
				</div>


    )

    return (
      <div className="container col-md-12">
				<div className="row border-Bottom">
            <div className="col-sm-9">
              <h3>Print dinner for {this.state.nGuests} people
							</h3>
            </div>
            <div className="col-sm-3">
							<Link to="./summary">
                <button id ="return_to_previous_page_button" type="button" className="btn btn-primary">
								<span className="glyphicon glyphicon-arrow-left"></span>Return to previous page
								</button>
							</Link>
            </div>
        </div>
				<div className="row">
						<div className="col-sm-12">
							{menu}
						</div>
					</div>
					
		</div>
    );
  }
}

export default Print;
