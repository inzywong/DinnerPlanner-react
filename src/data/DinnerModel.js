const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};

const DinnerModel = function () {
	
  var numberOfGuests = 0;
  var observers = [];
  let menu = [];
  var menuPrice=0;


  this.setNumberOfGuests = function (num) {
      numberOfGuests = num;
      localStorage.setItem('numberOfGuest', JSON.stringify(numberOfGuests));
      notifyObservers();
  }

  this.getNumberOfGuests = function () {
      if(localStorage.getItem('numberOfGuest'))
        return JSON.parse(localStorage.getItem('numberOfGuest'));
      else
        return numberOfGuests;
  }

  this.getMenuPrice= function () {
      return menuPrice;
  }

  this.getMenu = function () {
    if( localStorage.getItem('menu'))
      return menu=JSON.parse(localStorage.getItem('menu'));
    else
      return menu;
  }

  this.getTotalMenuPrice = function() 
  {
    var totalPrice=0;
    var tempMenu = this.getMenu();

		
    for(var i=0; i< tempMenu.length; i++)
    { 
    	totalPrice += tempMenu[i].pricePerServing;
    }
		//console.log(totalPrice);
		console.log(this.getNumberOfGuests());
		
    menuPrice=totalPrice*this.getNumberOfGuests();		

		
		return (menuPrice).toFixed(2);  
  }

  this.addDishToMenu = function (dish) {      
    if(!menu.some(d => d.id === dish.id)) {
      menu.push(dish);
    }
    localStorage.setItem('menu', JSON.stringify(menu));
    notifyObservers();

  }

  this.removeDishFromMenu = function (dishId) {
    menu = menu.filter((x) => x.id !== dishId)
    notifyObservers();
  }

	
  // API Calls

  this.getAllDishes = function (type, filter) {
    let url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?&number=12'
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
