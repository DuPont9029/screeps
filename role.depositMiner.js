const navigator = require('navigator');

var roleDepositMiner = {
    run: function(creep) {
        // Save the spawn room when the creep is spawned
        if (!creep.memory.spawnRoom) {
            creep.memory.spawnRoom = creep.room.name;
            console.log(`${creep.name} spawn room set to ${creep.memory.spawnRoom}`);
        }

        // Initialize roomsToTraverse and roomsToReturn in memory if not already set
        if (!creep.memory.roomsToTraverse) {
            creep.memory.roomsToTraverse = ['W44N51c', 'W44N50c', 'W45N50c']; // Replace with actual room names
        }
        if (!creep.memory.roomsToReturn) {
            creep.memory.roomsToReturn = creep.memory.roomsToTraverse.slice().reverse();
            creep.memory.roomsToReturn.push(creep.memory.spawnRoom + 'c'); // Append the spawn room to the return path
        }

        // Check if the creep is mining or returning
        if (!creep.memory.mining && creep.store.getFreeCapacity() === 0) {
            creep.memory.mining = true;
        }
        if (creep.memory.mining && creep.store.getUsedCapacity() === 0) {
            creep.memory.mining = false;
        }

        if (!creep.memory.mining) {
            // Navigate to the deposit room
            if (!creep.memory.targetRoom) {
                creep.memory.targetRoom = creep.memory.roomsToTraverse[creep.memory.roomsToTraverse.length - 1].substring(0, (creep.memory.roomsToTraverse[creep.memory.roomsToTraverse.length - 1].length - 1));
                console.log(`${creep.name} target room set to ${creep.memory.targetRoom}`);
            }
            if (creep.room.name !== creep.memory.targetRoom) {
                console.log(`${creep.name} is moving to ${creep.memory.targetRoom}`);
                let result = navigator.run(creep, creep.memory.roomsToTraverse);
                console.log(`${creep.name} navigator result: ${result}`);
                return;
            }

            // Mine the deposit
            var deposit = creep.pos.findClosestByPath(FIND_DEPOSITS);
            if (deposit) {
                console.log(`${creep.name} found deposit at ${deposit.pos}`);
                if (creep.harvest(deposit) == ERR_NOT_IN_RANGE) {
                    console.log(`${creep.name} is moving to deposit at ${deposit.pos}`);
                    creep.moveTo(deposit, {visualizePathStyle: {stroke: '#ffaa00'}});
                } else {
                    console.log(`${creep.name} is mining deposit at ${deposit.pos}`);
                }
            } else {
                console.log(`${creep.name} did not find any deposits.`);
            }
        } else {
            // Navigate back to the spawn room
            if (creep.room.name !== creep.memory.spawnRoom) {
                console.log(`${creep.name} is moving to spawn room ${creep.memory.spawnRoom}`);
                let result = navigator.run(creep, creep.memory.roomsToReturn);
                console.log(`${creep.name} navigator result: ${result}`);
                return;
            }

            // Transfer the resources to terminal
            var terminal = creep.room.terminal;
            if (terminal) {
                for (const resourceType in creep.store) {
                    if (creep.transfer(terminal, resourceType) == ERR_NOT_IN_RANGE) {
                        console.log(`${creep.name} is moving to terminal at ${terminal.pos}`);
                        creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ffffff'}});
                    } else {
                        console.log(`${creep.name} is transferring ${resourceType} to terminal at ${terminal.pos}`);
                    }
                }
                // After transferring resources, reset mining and currentRoomIndex to return to mining
                creep.memory.mining = false;
                creep.memory.currentRoomIndex = 0;
                creep.memory.roomsToReturn = creep.memory.roomsToTraverse.slice().reverse();
                creep.memory.roomsToReturn.push(creep.memory.spawnRoom + 'c');
            } else {
                console.log(`${creep.name} did not find any terminal.`);
            }
        }
    }
};

module.exports = roleDepositMiner;