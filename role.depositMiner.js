const navigator = require('navigator');

var roleDepositMiner = {
    run: function(creep) {
        if (!creep.memory.mining && creep.store.getFreeCapacity() === 0) {
            creep.memory.mining = true;
        }
        if (creep.memory.mining && creep.store.getUsedCapacity() === 0) {
            creep.memory.mining = false;
        }

        // Define the rooms to traverse
        let roomsToTraverse = ['Room1', 'Room2', 'DepositRoom']; // Replace with actual room names

        if (!creep.memory.mining) {
            // Navigate to the deposit room
            if (!navigator.run(creep, roomsToTraverse)) {
                return;
            }

            // Mine the deposit
            var deposit = creep.pos.findClosestByPath(FIND_DEPOSITS);
            if (deposit) {
                if (creep.harvest(deposit) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(deposit, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        } else {
            // Navigate back to the storage room
            let returnRooms = roomsToTraverse.slice().reverse();
            if (!navigator.run(creep, returnRooms)) {
                return;
            }

            // Transfer resources to storage
            var storage = creep.room.storage;
            if (storage && creep.transfer(storage, RESOURCE_SILICON) == ERR_NOT_IN_RANGE) { // Replace RESOURCE_SILICON with the actual resource type
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleDepositMiner;