var roleHarvester = {
    run: function(creep) {
        if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
            creep.memory.harvesting = false;
        }
        if (!creep.memory.harvesting && creep.store.getUsedCapacity() === 0) {
            creep.memory.harvesting = true;
        }

        if (creep.memory.harvesting) {
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
                        source = safeSources[0];
                    }
                }

                creep.memory.sourceId = source.id;
            }

            // Raccogli energia dal nodo minerario assegnato
            var source = Game.getObjectById(creep.memory.sourceId);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION ||
                            structure.structureType === STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                // Se non ci sono strutture da riempire, torna alla fonte
                creep.memory.harvesting = true;
            }
        }
    }
};

module.exports = roleHarvester;