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
      status: 'INITIAL',
      filter: '',
      type: 'drink' || ''
    }
    this.filter;
    this.type;

  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.getAllDishes( this.state.type,this.state.filter).then(dishes => {
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

  handleChange(event) {
        this.setState({type: event.target.value});
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
        {/*<Link to="/dish"></Link>*/ }
        dishesList = this.state.dishes.map((dish) =>
        <div className="col-md-6">    
        <Link to={dish/+dish.id}>
          <div className="dishes"><img className="dishImage" style={{width:150, height: 150}} src={"https://spoonacular.com/recipeImages/" + dish.image} />
          <p className="dishTitle"> {dish.title} </p>
        </div> </Link>
        </div>


        )
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="container bg-primary">
        <div className="row">
          <select className="custom-select mr-sm-2 dropdown btn btn-primary dropdown-toggle custom-select mb-2 mr-sm-2 mb-sm-0" id="select-dish-type" onChange={this.handleChange} value={this.state.type}>
            <option value="all" selected>All</option>
						<option value="starter">Starter</option>
						<option value="main dish">Main Dish</option>
						<option value="dessert">Dessert</option>
						<option value="side dish">Side Dish</option>
						<option value="salad">Salad</option>
						<option value="bread">Bread</option>
						<option value="soup">Soup</option>
						<option value="beverage">Beverage</option>       
          </select>
        </div>
        <div className="row">
          <div className="Dishes bg-success">
            <h3>Dishes</h3>
            <hr></hr>
              {dishesList}
          </div>
        </div>
      </div>
    );
  }
}

export default Dishes;
