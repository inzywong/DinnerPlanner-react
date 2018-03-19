import React, {Component} from 'react';
import './Dishes.css';
// Alternative to passing the moderl as the component property, 
// we can import the model instance directly
import {modelInstance} from '../data/DinnerModel';
import { Link } from 'react-router-dom';



class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    this.state = {
      status: 'INITIAL'
    }
  }

  // This methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.getAllDishes().then(dishes => {
      this.setState({
        status: 'LOADED',
        dishes: dishes.results
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

  render() {
    let dishesList = null;
    
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case 'INITIAL':
        dishesList = <em>Loading...</em>
        break;
      case 'LOADED':
				
        dishesList = this.state.dishes.map((dish) =>
				
						<div className="dishes floatLeft" style={{width:220, height: 260}}>													 
							<Link to= {"/dish/"+dish.id} >
								<img className="dishImage" style={{width:200, height: 200}} src={"https://spoonacular.com/recipeImages/" + dish.image} />
								<p className="dishTitle"> {dish.title} </p>
							</Link>
						</div>
        ) 
        break;
				
      default:
        dishesList = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="Dishes col-sm-10">
        <h1>Find a dish</h1> 
			
			
			  {/* Dish Images */}
				<div class="row">
					<div class="col-md-12 " id="dishImages" > 
							{dishesList}
					</div>
				</div>   
			
			
			
          
      </div>
    );
  }
}

export default Dishes;
