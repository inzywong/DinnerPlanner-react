const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};

const DinnerModel = function () {

	
  var numberOfGuests = 4;
  var observers = [];
	var dishesSelected = [];	
  let menu = [];


  this.setNumberOfGuests = function (num) {
    numberOfGuests = num;
    notifyObservers();
  };

  this.getNumberOfGuests = function () {
    return numberOfGuests;
  };


	
	this.addDishToMenu_kaua = function(dish){
		dishesSelected.push(dish);
		
		notifyObservers();		
	};
	
	this.getMenu_kaua = function(){
		return dishesSelected;
	}
	

  this.getMenu = function () {
    return menu;
  }

  this.addDishToMenu = function (dish) {
    if(!menu.some(d => d.id === dish.id)) {
      menu.push(dish);
      notifyObservers();
    }
  }

  this.removeDishFromMenu = function (dishId) {
    menu = menu.filter((x) => x.id !== dishId)
    notifyObservers();
  }

	
  // API Calls

  this.getAllDishes = function (type, filter) {
    let url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?'
    url +=  type ? "&type=" + type : '';
    url += filter ? "&query=" + filter : '';
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

	
	
	this.getDish = function (id) {  
		const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+id+"/information";
    return fetch(url, httpOptions)
    	.then(processResponse)
      .catch(handleError)

  }
  
	
  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }
  
  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }

  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
};

export const modelInstance = new DinnerModel();
