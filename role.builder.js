var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.memory.sourceId = null; // Resetta la fonte di risorse
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } else {
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
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                // Se non ci sono fonti libere e sicure, muoviti verso una posizione di attesa
                creep.moveTo(Game.flags['WaitFlag'], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;
