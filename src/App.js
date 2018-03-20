import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel';
import SelectDish from "./SelectDish/SelectDish";

import DishDetails from "./DishDetails/DishDetails";

import Summary from "./Summary/Summary";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Dinner Planner',
    }
  }

  render() {
    return (
      <div className= "App">
				
        <header className="App-header">
			
					{/* HEADER ------------------------------------------------- */}
					<div className="row myHeader">
							<div className="col-sm-12" style= {{padding: 0}}>
									<div className="addBorder-bottom text-center">
											<h1>{this.state.title}</h1>
									</div>
							</div>
					</div>
				{/* END OF HEADER -------------------------------------------- */}
			
	
        </header>
		
			
				{/* CONTENT ------------------------------------------------ */}			
		    <div className="appContent container-fluid">
          {/* We rended diffrent component based on the path */}
					<Route exact path="/" component={Welcome}/> {/* This brings us to the Welcome view */}

					<Route path="/search"  render={() => <SelectDish model={modelInstance}/>}/>			
          <Route path="/dish/:id" render={(props) => <DishDetails model={modelInstance} {...props}/>}/>
          <Route path="/summary" render={() => <Summary model={modelInstance}/>}/>					
				</div>
				{/* END OF CONTENT ----------------------------------------- */}			
		
		
		    {/* FOOTER */}
		    <div className="myFooter">
        	<div className="col-sm-12 text-center addBorder-top">
        		<p><span className="glyphicon glyphicon-copyright-mark"></span> 2018 KTH All RIGHTS RESERVED</p>
        	</div>		
    		</div>
				{/* END OF FOOTER */}

      </div>
    );
  }
}

export default App;
