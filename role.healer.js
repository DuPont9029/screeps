var roleHealer = {
    /** @param {Creep} creep **/

    run: function(creep) {
        // Trova strutture danneggiate
        const damagedStructures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });

        if (damagedStructures.length > 0) {
            // Ripara la struttura più danneggiata
            if (creep.repair(damagedStructures[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(damagedStructures[0]);
            }
        } else {
            // Trova creeps danneggiati
            const damagedCreeps = creep.room.find(FIND_MY_CREEPS, {
                filter: (c) => c.hits < c.hitsMax
            });

            if (damagedCreeps.length > 0) {
                // Guarisce il creep più danneggiato
                if (creep.heal(damagedCreeps[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(damagedCreeps[0]);
                }
            }
        }
    }
};

module.exports = roleHealer;