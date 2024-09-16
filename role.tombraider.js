var roleTombraider = {
    run: function(creep) {
        if (creep.memory.collecting && creep.store.getFreeCapacity() === 0) {
            creep.memory.collecting = false;
        }
        if (!creep.memory.collecting && creep.store.getUsedCapacity() === 0) {
            creep.memory.collecting = true;
        }

        if (creep.memory.collecting) {
            var tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
                filter: (tomb) => tomb.store.getUsedCapacity() > 0
            });

            if (tombstone) {
                for (const resourceType in tombstone.store) {
                    if (creep.withdraw(tombstone, resourceType) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(tombstone, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
        } else {
            var storage = creep.room.storage;
            if (storage) {
                for (const resourceType in creep.store) {
                    if (creep.transfer(storage, resourceType) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
};

module.exports = roleTombraider;