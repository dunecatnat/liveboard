# Silver Bars library

## Usage instructions:
run `npm install` to install all the dependencies  
run `npm run dev-server` to run the library locally  
run `npm run dev` to compile the code for development  
run `npm run build` to compile the code for production  

## Methods description
There are 3 main methods
* **getOrdersSummary(ordersCollection, orderType)**: This will will create a Live Board of orders from all orders available, filtered by order type
* **removeOrderFromLiveBoard(order, ordersCollection)**: This will remove an order or multiple orders from ordersCollection when called directly from Live Board, removes all orders of certain type with the same price.
* **removeIndividualOrder(order, ordersCollection)**: This will remove a particular order by order ID from collection
* **addOrder(order, ordersCollection)**: This will add an order to ordersCollection

## Sample usage
You can paste these statements into src/index.js file to be able to run the library.
```javascript
let ordersCollection = [
    {userId: "user1", weight: 5.0, price: 306, type: "SELL"},
    {userId: "user2", weight: 5.5, price: 307, type: "SELL"},
    {userId: "user3", weight: 3.5, price: 306, type: "SELL"},
    {userId: "user3", weight: 3.0, price: 205, type: "BUY"},
    {userId: "user3", weight: 3.5, price: 111, type: "SELL"},
    {userId: "user4", weight: 3.5, price: 111, type: "SELL"},
    {userId: "user4", weight: 3.5, price: 111, type: "BUY"}
];
let summaryBoard = [];
let order = {userId: "user4", weight: 5.0, price: 305, type: "SELL"};
summaryBoard = liveBoard.getOrdersSummary(ordersCollection, "SELL");
ordersCollection = liveBoard.addOrder(order, ordersCollection);
summaryBoard = liveBoard.getOrdersSummary(ordersCollection, "SELL");
ordersCollection = liveBoard.removeOrderFromLiveBoard({price: 111, type: "SELL"}, ordersCollection);
summaryBoard = liveBoard.getOrdersSummary(ordersCollection, "SELL");
```

After each action such as add or remove order, call `getOrdersSummary()` method to refresh the LiveBoard

