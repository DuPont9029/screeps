module.exports = {
    run: function(creep) {
        // Trova la harvest flag
        const harvestFlag = Game.flags['HarvestFlag'];
        if (!harvestFlag) {
            console.log('HarvestFlag non trovata');
            return;
        }

        // Se il creep non è nella stanza della harvest flag, muoviti lì
        if (creep.room.name !== harvestFlag.room.name) {
            creep.moveTo(harvestFlag);
            return;
        }

        // Trova i container nella stanza della harvest flag
        const containers = harvestFlag.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: (structure) => structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0
        });

        if (containers.length > 0) {
            // Se il container è pieno, prendi l'energia
            if (creep.withdraw(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0]);
            }
        } else {
            // Se non ci sono container pieni, aspetta al centro della stanza
            const centerPos = new RoomPosition(25, 25, creep.room.name);
            creep.moveTo(centerPos);
        }

        // Se il creep è pieno, torna alla stanza di origine
        if (creep.store.getFreeCapacity() === 0) {
            const homeFlag = Game.flags[creep.memory.homeFlag];
            if (homeFlag) {
                if (creep.room.name !== homeFlag.room.name) {
                    creep.moveTo(homeFlag);
                } else {
                    const terminal = creep.room.terminal;
                    if (terminal) {
                        if (creep.transfer(terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(terminal);
                        }
                    }
                }
            }
        }
    }
};