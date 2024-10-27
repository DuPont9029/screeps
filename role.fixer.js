const roleFixer = {
    run: function (creep) {
        const REPAIR_THRESHOLD = 15000000; // Soglia di riparazione in punti vita

        // Se il creep sta riparando e ha esaurito l'energia, passa alla raccolta
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }

        // Se il creep sta raccogliendo energia e ha la capacità piena, passa alla riparazione
        if (!creep.memory.repairing && creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()) {
            creep.memory.repairing = true;
            creep.say('⚒️ repair');
        }

        if (creep.memory.repairing) {
            // Se non ha un target di riparazione, trova una nuova struttura da riparare
            if (!creep.memory.repairTarget) {
                const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax && structure.hits < REPAIR_THRESHOLD
                });

                if (target) {
                    creep.memory.repairTarget = target.id;
                } else {
                    // Se non ci sono strutture da riparare, passa alla raccolta di energia
                    creep.memory.repairing = false;
                    creep.say('🔄 harvest');
                }
            }

            // Se ha un target di riparazione, continua a ripararlo
            if (creep.memory.repairTarget) {
                const target = Game.getObjectById(creep.memory.repairTarget);

                // Se il target ha raggiunto la soglia di riparazione, resettalo
                if (target && target.hits >= REPAIR_THRESHOLD) {
                    creep.memory.repairTarget = null;
                } else if (target && target.hits < target.hitsMax) {
                    if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } else {
                    // Se il target è completamente riparato o non esiste più, resettalo
                    creep.memory.repairTarget = null;
                }
            }
        } else {
            // Logica di raccolta energia simile a quella dei builder
            const sources = creep.room.find(FIND_SOURCES);
            const closestSource = creep.pos.findClosestByPath(sources);

            if (closestSource && creep.harvest(closestSource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleFixer;