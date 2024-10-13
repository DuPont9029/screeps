var roleMiner = {
    run: function(creep) {
        // Se il creep è in modalità di raccolta e il suo inventario è pieno, passa alla modalità di deposito
        if (creep.memory.mining && creep.store.getFreeCapacity() === 0) {
            creep.memory.mining = false;
        }
        // Se il creep è in modalità di deposito e il suo inventario è vuoto, passa alla modalità di raccolta
        if (!creep.memory.mining && creep.store.getUsedCapacity() === 0) {
            creep.memory.mining = true;
        }

        if (creep.memory.mining) {
            // Trova l'extractor più vicino che non è occupato
            var extractor = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_EXTRACTOR;
                }
            });

            // Trova il deposito minerale più vicino
            var mineral = creep.pos.findClosestByPath(FIND_MINERALS);

            if (extractor && mineral) {
                if (creep.harvest(mineral) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(mineral, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        } else {
            // Trova il terminale più vicino
            var terminal = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_TERMINAL && 
                           structure.store.getFreeCapacity(RESOURCE_MINERAL) > 0;
                }
            });

            if (terminal) {
                for (const resourceType in creep.store) {
                    if (creep.transfer(terminal, resourceType) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
};

module.exports = roleMiner;