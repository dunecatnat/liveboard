import Order from "./order"; // to use in eventuality, makes for cleaner code
import * as _ from "lodash";

/**
 * removeOrder method was created to remove order(s) from ordersCollection by price and type
 * from Live Board
 * @param {*} order 
 * @param {*} ordersCollection 
 */
export let removeOrderFromLiveBoard = (order, ordersCollection) => {
    let itemsToRemove = _.filter(ordersCollection, {'price': order.price, 'type': order.type});
    itemsToRemove.forEach(item => {
        let index = ordersCollection.map(obj => obj.price).indexOf(item.price);
        ordersCollection.splice(index, 1);
    })
    return ordersCollection;
}

/**
 * Remove individual order by orderId (eventual application)
 * orderId is not a part of requirement, however I would include it as it makes for more
 * consitent data, that is easier to manipulate
 * @param {*} order 
 * @param {*} ordersCollection 
 */
export let removeIndividualOrder = (order, ordersCollection) => {
    let index = ordersSummary.map(obj => obj.orderId).indexOf(order.orderId);
    ordersSummary.splice(index, 1);
    return ordersCollection;
}

/**
 * addOrder
 * adds order to order collection
 * returns new orders arrays
 * @param {*} order 
 * @param {*} ordersCollection 
 */
export let addOrder = (order, ordersCollection) => {
    ordersCollection.push(order);
    return ordersCollection;
}

/**
 * getOrdersSummary returns sorted and filtered array with summed prices
 * @param {*} ordersCollection 
 * @param {*} type 
 */
export let getOrdersSummary = (ordersCollection, orderType) => {
    let ordersFormatted = [];
    let ordersByType = getOrdersByType(ordersCollection, orderType);
    ordersFormatted = formatOrdersByPrice(ordersByType);
    ordersFormatted = sortOrders(ordersFormatted, orderType);
    return ordersFormatted;
}

/**
 * getOrdersByType filters main orderCollection by type of order
 * returns new filtered array
 * @param {*} ordersCollection 
 * @param {*} type 
 */
function getOrdersByType(ordersCollection, type) {
    let ordersCollectionCopy = _.cloneDeep(ordersCollection);
    let ordersCollectionByType = _.filter(ordersCollectionCopy, ['type', type]);
    return ordersCollectionByType;
}

/**
 * formatOrderByPrice
 * sums weights of orders with the same price
 * returns new array of orders
 * at the moment I left the userId property, but this could be removed or replaced by something more relevant
 * @param {*} ordersCollection 
 */
function formatOrdersByPrice(ordersCollection) {
    let ordersFormatted = [];
    let ordersCollectionCopy = _.cloneDeep(ordersCollection);
    ordersCollectionCopy.forEach(order => {
        if(ordersFormatted.length === 0) {
            ordersFormatted.push(order)
        } else {
            let index = ordersFormatted.map(obj => obj.price).indexOf(order.price);
            if(index === -1) {
                ordersFormatted.push(order);
            } else {
                if(ordersFormatted[index].type === order.type) {
                    ordersFormatted[index].weight = ordersFormatted[index].weight + order.weight;
                } else {
                    ordersFormatted.push(order);
                }
                
            }
        }
    });
    return ordersFormatted;
}

/**
 * sortOrders to sort orders by price
 * SELL price ascending
 * BUY price descending
 * returns sorted array of orders
 * @param {*} ordersCollection 
 * @param {*} type 
 */
function sortOrders(ordersCollection, type) {
    let ordersCollectionCopy = _.cloneDeep(ordersCollection);
    if(type === "SELL") {
        ordersCollectionCopy = _.orderBy(ordersCollectionCopy, ['price'], ['asc']);
    } else {
        ordersCollectionCopy = _.orderBy(ordersCollectionCopy, ['price'], ['desc']);
    }
    return ordersCollectionCopy;
}

