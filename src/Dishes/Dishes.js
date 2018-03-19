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
      type: 'all' || ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // This methods is called by React lifecycle when the 
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

  handleChange(event){
    this.setState({type: event.target.value})
    this.componentDidMount();
  }
  handleSubmit(event){
    this.setState({filter: event.target.value})
    this.componentDidMount();  
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
					<a href="#" key={dish.id} data-id={dish.id} className="nav-to-dish">
						<div className="dishes floatLeft" style={{width:220, height: 300}}>
							<img className="dishImage" style={{width:200, height: 200}} src={"https://spoonacular.com/recipeImages/" + dish.image} />
							<p className="dishTitle"> {dish.title} </p>
						</div>
					</a>
        )
        break;
				
      default:
        dishesList = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="container addBorder-left col-md-10 Dishes">
        <div className="row">
          <h3>Searchfield</h3>
          <div className="floatLeft">
            <form className="form-inline" id="searchBar">
              <input type="text" ref="search" className="form-control col-sm-10 col-form-label mb-10 mr-sm-10 mb-sm-0" onChange={this.handleSubmit} placeholder="Search..."/>
              <span>
                <button type="button" className="btn btn-primary specialButton">
                  <span className="glyphicon glyphicon-search "></span>
                  Search
                </button>
              </span>
              <select className="custom-select dropdown btn btn-primary dropdown-toggle custom-select col-sm-4 col-form-label mb-4 mr-sm-4 mb-sm-0" id="select-dish-type" onChange={this.handleChange} value={this.state.value}>
                <option value="all" >All</option>
                <option value="starter">Starter</option>
                <option value="main dish">Main Dish</option>
                <option value="dessert">Dessert</option>
                <option value="side dish">Side Dish</option>
                <option value="salad">Salad</option>
                <option value="bread">Bread</option>
                <option value="soup">Soup</option>
                <option value="beverage">Beverage</option>       
              </select>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" id="dishImages">
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
