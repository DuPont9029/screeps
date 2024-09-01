var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            if (!creep.memory.sourceId) {
                var sources = creep.room.find(FIND_SOURCES);
                var source = sources[0];

                // Controlla se ci sono più di 4 harvester nel nodo minerario
                var harvestersAtSource = _.filter(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.sourceId == source.id).length;
                if (harvestersAtSource > 4) {
                    // Trova il nodo minerario più vicino senza nemici
                    var safeSources = creep.room.find(FIND_SOURCES, {
                        filter: (s) => {
                            var hostiles = s.pos.findInRange(FIND_HOSTILE_CREEPS, 5);
                            return hostiles.length == 0;
                        }
                    });
                    if (safeSources.length > 0) {
                        source = creep.pos.findClosestByPath(safeSources);
                    }
                }

                // Assegna il nodo minerario al creep
                creep.memory.sourceId = source.id;
            }

            // Recupera il nodo minerario assegnato
            var source = Game.getObjectById(creep.memory.sourceId);

            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};

module.exports = roleUpgrader;