import React, { Component } from 'react';
import './DishInformation.css';
import { Link } from 'react-router-dom';


class DishInformation extends Component {
	constructor(props) {
		super(props)

		this.state = {
			nGuests: this.props.model.getNumberOfGuests()
		}
	}

	componentDidMount() {
		this.props.model.addObserver(this)
	}

	componentWillUnmount() {
		this.props.model.removeObserver(this)
	}

	update() {
		this.setState({
			nGuests: this.props.model.getNumberOfGuests()
		})
  }
	
	
	addDishToMenu = () => {
		this.props.model.addDishToMenu(this.props.dish);
  }

	render() {    
		//console.log(this.props.dish);
			
		var dishImage 	= "Loading...";
		var dishName 		= "Loading...";
		var preparation = "Loading...";
		var ingredients = "Loading...";

		
		if(this.props.dish)
		{
			var dish = this.props.dish;
			
			dishImage = dish.image;
			dishName  = dish.title;
			
			preparation = [];
			for(var i=0; i<dish.analyzedInstructions[0].steps.length; i++)
			{
				preparation.push(dish.analyzedInstructions[0].steps[i].step); 
			}
			
			ingredients = this.props.dish.extendedIngredients.map((ingredient) =>
					<div className='row'>																	

						<div className='col-sm-3 text-right'> 
							<img src={ingredient.image} height='42' width='42' ></img>  
						</div>				

						<div className='col-sm-3 text-right'> 
							<p> {ingredient.name} </p>  																						
						</div>

						<div className='col-sm-3 text-right'> 
							<p> {ingredient.amount} </p>  
						</div>						

						<div className='col-sm-3 text-right'> 
							<p> {ingredient.unit} </p>  
						</div>
					</div>

      )		
			
			
		}
							
					
	
        
		return ( 
			<div class="col-sm-10 addBorder-left" id="dishDetails">
				<div class="container-fluid" id="dishDetailsColumnContainer">
					<div class="row" id="dishDetailsRowContainer">
			
						{/* Dish Title + Image + Preparation */}
						<div class="col-sm-5 ">
							<h1 id="dish_name"> {dishName} </h1>
              	<img src={dishImage} alt={dishImage} className="dishPic"></img>
			
								<div className="col-md-12 text-left">
									<Link to="/search">
										<button type="button" className="btn btn-primary" id="back_to_search">Back to search</button>
									</Link>
								</div>				
			
			
								<h2> Preparation </h2>
								<p className="textJustifyCenter." >
                  	{preparation}			
								</p>
						</div>
			
						{/* Ingredients Table */}
						<div class="col-sm-7 " >
				   		<h1> Ingredients for {this.state.nGuests} people</h1>
			
							<div className='container-fluid'>																											
								{ingredients}
							</div>
			
							<div className="col-md-12 text-left">
								<button type="button" className="btn btn-primary" onClick={this.addDishToMenu} >Add to Menu</button>
							</div>		
			
						</div>
			
					</div>
				</div>
			</div>
		);
  }
}


export default DishInformation;