var roleSuppliesSender = {
    run: function(creep) {
        var flag = Game.flags[creep.memory.targetFlag];
        
        if (!flag) {
            console.log('Flag not found: ' + creep.memory.targetFlag);
            return;
        }

        if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
            creep.memory.harvesting = false;
        }
        if (!creep.memory.harvesting && creep.store.getUsedCapacity() === 0) {
            creep.memory.harvesting = true;
        }

        if (creep.memory.harvesting) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (source) {
                var result = creep.harvest(source);
                if (result === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                } else if (result !== OK) {
                    console.log(`${creep.name} failed to harvest: ${result}`);
                } else {
                    console.log(`${creep.name} is harvesting from source: ${source.id}`);
                }
            } else {
                console.log(`${creep.name} could not find a source`);
            }
        } else {
            if (creep.room.name != flag.pos.roomName) {
                // Move to the target room
                console.log(`${creep.name} moving to flag at ${flag.pos}`);
                creep.moveTo(flag);
            } else {
                // Move towards the center of the room if near the border
                if (creep.pos.x === 0 || creep.pos.x === 49 || creep.pos.y === 0 || creep.pos.y === 49) {
                    console.log(`${creep.name} moving to center of the room`);
                    creep.moveTo(25, 25);
                } else {
                    let targetExtension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType === STRUCTURE_EXTENSION
                                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });

                    if (targetExtension) {
                        if (creep.transfer(targetExtension, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(targetExtension, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    } else {
                        console.log(`${creep.name} could not find an extension to transfer energy to`);
                    }
                }
            }
        }
    }
};

module.exports = roleSuppliesSender;