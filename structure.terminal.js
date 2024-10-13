// Export the function
module.exports = function manageTerminal(flagName, stopSell, stopBuy) {
    // Retrieve the terminal object using the flagName
    const terminal = Game.flags[flagName].room.terminal;
    if (!terminal) {
        console.log(`No terminal found in the room with flag: ${flagName}`);
        return;
    }

    // Define the energy threshold for transactions
    const energyThreshold = 5000;

    // Function to find the best order to sell
    function findBestSellOrder(resourceType) {
        const orders = Game.market.getAllOrders({ type: ORDER_BUY, resourceType });
        return orders
            .filter(order => order.amount > 0 && order.price > 0)
            .sort((a, b) => b.price - a.price)
            .find(order => Game.market.calcTransactionCost(1000, terminal.room.name, order.roomName) <= energyThreshold);
    }

    // Function to find the best order to buy
    function findBestBuyOrder(resourceType) {
        const orders = Game.market.getAllOrders({ type: ORDER_SELL, resourceType });
        return orders
            .filter(order => order.amount > 0 && order.price > 0)
            .sort((a, b) => a.price - b.price)[0];
    }

    // Example array of resources to manage
    const resources = [RESOURCE_OXYGEN];

    // Iterate over resources and decide to buy or sell
    for (const resource of resources) {
        if (!stopSell) {
            const bestSellOrder = findBestSellOrder(resource);
            if (bestSellOrder) {
                const amount = Math.min(bestSellOrder.amount, terminal.store[resource]);
                if (amount > 0) {
                    Game.market.deal(bestSellOrder.id, amount, terminal.room.name);
                    console.log(`Sold ${amount} of ${resource} for ${bestSellOrder.price} credits each.`);
                }
            }
        }

        if (!stopBuy) {
            const bestBuyOrder = findBestBuyOrder(resource);
            if (bestBuyOrder) {
                const amount = Math.min(bestBuyOrder.amount, terminal.store.getFreeCapacity());
                if (amount > 0) {
                    Game.market.deal(bestBuyOrder.id, amount, terminal.room.name);
                    console.log(`Bought ${amount} of ${resource} for ${bestBuyOrder.price} credits each.`);
                }
            }
        }
    }
};