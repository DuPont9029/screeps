var roleReloader = {

    run: function (creep) {

        let targetTower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_TOWER
                    && structure.store.getUsedCapacity(RESOURCE_ENERGY) < structure.store.getCapacity(RESOURCE_ENERGY);
            }
        });

        if (creep.memory.reloading && creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            creep.memory.reloading = false;
        }
        if (!creep.memory.reloading && creep.store.getUsedCapacity(RESOURCE_ENERGY) === creep.store.getCapacity(RESOURCE_ENERGY)) {
            creep.memory.reloading = true;
        }

        if (creep.memory.reloading) {
            if (targetTower) {
                if (creep.transfer(targetTower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetTower, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleReloader;