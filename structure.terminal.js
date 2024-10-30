// Export the function
function buy(flagName, stopSell, stopBuy) {
    // Retrieve the terminal object using the flagName
    const terminal = Game.flags[flagName].room.terminal;
    if (!terminal) {
        console.log(`No terminal found in the room with flag: ${flagName}`);
        return;
    }
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





function buyById(transactionId) {
    // Recupera i dettagli della transazione
    const order = Game.market.getOrderById(transactionId);

    // Trova la bandiera nella stanza del terminale
    const terminalFlag = _.find(Game.flags, (flag) => flag.room && flag.room.terminal);

    if (!terminalFlag) {
        console.log('Nessuna bandiera trovata nella stanza del terminale.');
        return;
    }

    // Verifica se l'ordine esiste e se è un'offerta di vendita di pixel
    if (order && order.type === ORDER_SELL && order.resourceType === PIXEL) {
        // Controlla se ci sono abbastanza crediti per completare la transazione
        const totalCost = order.amount * order.price;
        if (Game.market.credits < totalCost) {
            console.log(totalCost)
            console.log('Non ci sono abbastanza crediti per completare la transazione.');
            return;
        }

        // Accetta la transazione e compra l'intero contenuto offerto
        const result = Game.market.deal(transactionId, order.amount, terminalFlag.room.name);

        // Controlla il risultato dell'operazione
        if (result === OK) {
            console.log(`Transazione accettata e ${order.amount} pixel comprati con successo.`);
        } else {
            console.log(`Errore nell'accettare la transazione: ${result}`);
        }
    } else {
        console.log('Transazione non valida o non è un\'offerta di vendita di pixel.');
    }
}

const terminalManager = {
    buy,
    buyById
}

module.exports = terminalManager;