import * as liveBoard from "./live-board"; 

const div = document.createElement("div");
div.innerText = "Hello";
document.body.appendChild(div);

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
summaryBoard = liveBoard.getOrdersSummary(ordersCollection, "SELL");
ordersCollection = liveBoard.addOrder({userId: "user4", weight: 5.0, price: 305, type: "SELL"}, ordersCollection);
ordersCollection = liveBoard.removeOrderFromLiveBoard({price: 111, type: "SELL"}, ordersCollection);
summaryBoard = liveBoard.getOrdersSummary(ordersCollection, "SELL");

