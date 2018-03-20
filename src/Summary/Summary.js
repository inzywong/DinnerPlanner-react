import React, { Component } from 'react';
import './Summary.css';
import { Link } from 'react-router-dom';

class Summary extends Component {
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
			<div className="dishes floatLeft" style={{width:215, height: 300}}>													 
				<img className="dishImage" style={{width:200, height: 200}} src={"https://spoonacular.com/recipeImages/" + dish.image} />
				<p className="dishTitle"> {dish.title} </p>
			</div>
    )

    return (
      <div className="container col-md-12">
				<div className="row">
            <div className="col-sm-9">
              <h3>Dinner for: {this.state.nGuests} People
							</h3>
            </div>
            <div className="col-sm-3">
							<Link to="./search">
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
					<div className="row">
						<div className="col-sm-9"></div>
						<div className="col-sm-3 bottom-align-text">

						<h3 >Total: {this.state.totalPrice}</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-md-5">
					</div>
					<div className="col-md-2">
						<Link to="./search">
						<button type="button" class="btn btn-primary">Print Full Recipe</button>
						</Link>
					</div>
				</div>
		</div>
    );
  }
}

export default Summary;
