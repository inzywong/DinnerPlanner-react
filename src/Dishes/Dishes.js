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
  componentDidMount(){
    this.props.model.addObserver(this)

  }
	update(){
    this.componentDidMount();

	}

  handleChange(event){
    event.preventDefault();
    this.setState({type: event.target.value})
    modelInstance.getAllDishes( event.target.value, this.state.filter).then(dishes => {
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

  handleSubmit(event){
    event.preventDefault();
    this.setState({filter: event.target.value})
    modelInstance.getAllDishes( this.state.type, event.target.value).then(dishes => {
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
						<div className="dishes floatLeft" style={{width:215, height: 300}}>													 
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
      <div className="container addBorder-left col-md-10">
        <div className="row col-md-12">
          <h3>Search</h3>
          <hr></hr>
          </div>
          <div className="row">
          <div className="col-md-3">
          </div>
          <div className="col-md-9 floatLeft form-inline">
            <form className="form-inline"  >
              <input onChange={this.handleSubmit} type="text" ref="search" className="form-control" placeholder="Search..."/>
              {/*<span>
                <button type="button" className="btn btn-primary specialButton" >
              <span className="glyphicon glyphicon-search "></span>
                  Search
                </button>
              </span>*/}
              </form>

              <select className="custom-select dropdown btn btn-primary dropdown-toggle custom-select col-sm-2 col-form-label mb-2 mr-sm-2 mb-sm-0" id="select-dish-type" onChange={this.handleChange} value={this.state.value}>
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
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 Dishes" id="dishImages">
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
