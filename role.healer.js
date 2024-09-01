var roleHealer = {
    /** @param {Creep} creep **/

    run: function(creep) {
        // Se il creep ha capacità libera per l'energia, trova una fonte di energia e raccoglila
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            if (!creep.memory.sourceId) {
                var sources = creep.room.find(FIND_SOURCES);
                var targetSource = sources.find(source => {
                    var creepsAtSource = _.filter(Game.creeps, (c) => c.memory.sourceId == source.id);
                    var enemiesNearSource = source.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
                    return creepsAtSource.length < 3 && enemiesNearSource.length == 0;
                });

                if (targetSource) {
                    creep.memory.sourceId = targetSource.id;
                }
            }

            var source = Game.getObjectById(creep.memory.sourceId);
            if (source) {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            } else {
                // Se non ci sono fonti libere e sicure, muoviti verso una posizione di attesa
                creep.moveTo(Game.flags['WaitFlag']);
            }
            return;
        }

        // Trova strutture danneggiate
        const damagedStructures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });

        // Ordina le strutture danneggiate in base ai loro punti vita
        damagedStructures.sort((a, b) => a.hits - b.hits);

        while (creep.store[RESOURCE_ENERGY] > 0 && damagedStructures.length > 0) {
            // Ripara la struttura più danneggiata
            if (creep.repair(damagedStructures[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(damagedStructures[0]);
            }
            // Rimuovi la struttura riparata dall'array
            if (damagedStructures[0].hits == damagedStructures[0].hitsMax) {
                damagedStructures.shift();
            }
        }
    }
};

module.exports = roleHealer;