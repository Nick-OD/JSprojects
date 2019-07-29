//Storage Controller
const StorageCtrl = (function(){

  return{
    storeItem: function(item){
      let items = [];
      //Check is any items
      if (localStorage.getItem('items') === null){
        items = [];
        items.push(item);
        //Set ls
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem('items'));

        //Push new item
        items.push(item);

        //Reset ls
        localStorage.setItem('items', JSON.stringify(items));
      }
      
    },
    getItemsFromStorage: function(){
      if (localStorage.getItem('items') === null){
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage: function(updatedItem){
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index){
        if(updatedItem.id === item.id){
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage: function(id){
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index){
        if(id === item.id){
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: function(){
      localStorage.removeItem('items');
    }
  }

})();


//Item Controller
const ItemCtrl = (function(){

  //ITem constructor
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
//Data Structure / State
const data = {
  // items: [
  //   // {id: 0, name: 'Steak Dinner', calories: 1200},
  //   // {id: 1, name: 'Cookie', calories: 400},
  //   // {id: 2, name: 'Eggs', calories: 300}
  // ],
  items: StorageCtrl.getItemsFromStorage(),
  currentItem: null,
  totalCalories: 0
}
return {
  getItems: function(){
    return data.items;
  },
  addItem: function(name, calories){
    let ID;
    //Create ID
    if (data.items.length > 0){
      ID = data.items[data.items.length - 1].id + 1;
    } else{
      ID = 0;
    }
    //Calories to Number
     calories = parseInt(calories);

     //Creat new Item
     newItem = new Item(ID, name, calories);
     data.items.push(newItem);
     return newItem;
   
  },
  getItemById: function(id){
    let found = null;
    //Loop through items
    data.items.forEach(function(item){
      if (item.id == id){
        found = item;
      }
    });
    return found;
  },
  updateItem: function(name, calories){
    //Turn calories to numebr
    calories = parseInt(calories);

    let found = null;

    data.items.forEach(function(item){
      if (item.id === data.currentItem.id){
        item.name = name;
        item.calories = calories;
        found = item;
        
      }
    });
    return found;
  },
  deleteItem: function(id){
    //Get ids
    const ids = data.items.map(function(item){
      return item.id;
    });

    //Get index
    const index = ids.indexOf(id);

    //Remove item
    data.items.splice(index, 1);
  },
  clearAllItems: function(){
    data.items = [];
  },
  setCurrentItem: function(item){
    data.currentItem = item;
  },
  getCurrentItem: function(){
    return data.currentItem;
  },
  getTotalCalories: function(){
    let total = 0;

    data.items.forEach(function(item){
      total += item.calories;
    });
    //Set total calories
    data.totalCalories = total;

    return data.totalCalories;
  },
  logData: function(){
    return data;
  }
}

})();

// UI Controller
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }

  //Public Methods
  return{
    populateItemList: function(items){
      let html = '';

      items.forEach(function(item){
        html += `
     <li class="collection-item" id="item-${item.id}">
     <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
     <a href="#" class="secondary-content">
       <i class="edit-item fa fa-pencil"></i>
     </a>
    </li>`;
      });

      //Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function(){
      return{
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function(item){
      //Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      //Create li element
     const li =  document.createElement('li');
     //Add class
     li.className = 'collection-item';
     li.id = `item-${item.id}`
     //Add html
     li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
     <a href="#" class="secondary-content">
       <i class="edit-item fa fa-pencil"></i>
     </a>`;
     //Insert item
     document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
    },
    updateListItem: function(item){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //Loop through nodes
      listItems = Array.from(listItems);
      listItems.forEach(function(listItem){
        const itemID = listItem.getAttribute('id');
        if (itemID === `item-${item.id}`){
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    deleteListItem: function(id){
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: function(){
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;

      UICtrl.showEditState();
    },
    removeItems: function(){
      let listItems = document.querySelectorAll(UISelectors.listItems);
      listItems = Array.from(listItems);
      listItems.forEach(function(item){
        item.remove();
      });
    },
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function(){

     
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
      UICtrl.clearInput();
    },
    showEditState: function(){
      
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    getSelectors: function(){
      return UISelectors;
    }
  }
 
})();


//App controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
  //Load event listeners
  const loadEventListeners = function(){
    const UISelectors = UICtrl.getSelectors();

    //Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    //Disable submit on Eter
  document.addEventListener('keypress', function(e){
    if (e.keyCode === 13 || e.which === 13){
      e.preventDefault();
      return false;
    }
  });
    //Edit icon clikc event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    //Update Item Event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    //Back Button
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

    //Delete Button
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

      //Clear all items
      document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  }

  //Add Item Submit
  const itemAddSubmit = function(e){
   
    //Get form input from UI controller
    const input = UICtrl.getItemInput();
//Check for name and calorie input

if (input.name !== '' && input.calories !== ''){
  //Add item
 const newItem = ItemCtrl.addItem(input.name, input.calories);

 //Add item to UI list
 UICtrl.addListItem(newItem);

//Get total calories
const totalCalories = ItemCtrl.getTotalCalories();
//Add total calories to UI
UICtrl.showTotalCalories(totalCalories);

//Store in local storage
StorageCtrl.storeItem(newItem);
 //Clear fields
 UICtrl.clearInput();
}

    console.log(input);

    e.preventDefault();
}
//Item Edit Click
const itemEditClick = function(e){
  if (e.target.classList.contains('edit-item')){
    console.log('edit item');
    //Get list item id
    const listId = e.target.parentNode.parentNode.id;
    const listIdArr = listId.split('-');

    //Get actual id
    const id = parseInt(listIdArr[1]);

    const itemToEdit = ItemCtrl.getItemById(id);

    //Set current Item
    ItemCtrl.setCurrentItem(itemToEdit);

    //Add item to form
    UICtrl.addItemToForm();

  }
  e.preventDefault();
}
//Item Update Submit
const itemUpdateSubmit = function(e){
//get item input
  input = UICtrl.getItemInput();

  //Update item
  const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

  //Updat UI
  UICtrl.updateListItem(updatedItem);

  //Get total calories
const totalCalories = ItemCtrl.getTotalCalories();
//Add total calories to UI
UICtrl.showTotalCalories(totalCalories);

//Update LS
StorageCtrl.updateItemStorage(updatedItem);

UICtrl.clearEditState();

  e.preventDefault();
}

//Delete button event
const itemDeleteSubmit = function(e){
  //Get current item
  const currentItem = ItemCtrl.currentItem();
  ItemCtrl.deleteItem(currentItem.id);

  //Delete from UI
  UICtrl.deleteListItem(currentItem.id);
   //Get total calories
const totalCalories = ItemCtrl.getTotalCalories();
//Add total calories to UI
UICtrl.showTotalCalories(totalCalories);

//Delete form LS
StorageCtrl.deleteItemFromStorage(currentItem.id);

UICtrl.clearEditState();

  e.preventDefault();
}

const clearAllItemsClick = function(){
  //Delete all items from data
  ItemCtrl.clearAllItems();

    //Get total calories
const totalCalories = ItemCtrl.getTotalCalories();
//Add total calories to UI
UICtrl.showTotalCalories(totalCalories);

  //remove from ui
  UICtrl.removeItems();

//Clear from LS
StorageCtrl.clearItemsFromStorage();

  //Hide list
  UICtrl.hideList();
}
  //Public MEthods
  return{
    init: function(){
    //Clear edit State
    UICtrl.clearEditState();

      //Fetch items from data strucure
      const items = ItemCtrl.getItems();

      //Check if any items
      if (items.length === 0){
        UICtrl.hideList();
      }else {
        UICtrl.populateItemList(items);
      }

  
      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

     //Load event listeners
     loadEventListeners();
    }
  }
})(ItemCtrl, StorageCtrl, UICtrl);


//Initialize App
App.init();