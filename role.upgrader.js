var roleUpgrader = {
    run: function (creep) {
        let targetController = creep.room.controller;

        if (creep.memory.upgrading && creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(targetController) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targetController, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            if (!creep.memory.sourceId) {
                var sources = creep.room.find(FIND_SOURCES);
                var source = sources[0];

                // Controlla se ci sono nemici vicini alla fonte
                var hostiles = source.pos.findInRange(FIND_HOSTILE_CREEPS, 5);
                if (hostiles.length > 0) {
                    creep.say('❌');
                    return;
                }

                // Assegna il nodo minerario al creep
                creep.memory.sourceId = source.id;
            }

            // Recupera il nodo minerario assegnato
            var source = Game.getObjectById(creep.memory.sourceId);
            if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleUpgrader;