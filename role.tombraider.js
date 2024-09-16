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
            } else {
                // Se non ci sono tombe, passa alla modalità di deposito
                creep.memory.collecting = false;
            }
        } 

        if (!creep.memory.collecting) {
            var storage = creep.room.storage;
            if (storage && creep.store.getUsedCapacity() > 0) {
                for (const resourceType in creep.store) {
                    if (creep.transfer(storage, resourceType) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            } else {
                // Se non ci sono tombe e non deve depositare, va alla flag
                var flag = Game.flags['DuPont9029'];
                if (flag) {
                    creep.moveTo(flag, {visualizePathStyle: {stroke: '#00ff00'}});
                }
            }
        }
    }
};

module.exports = roleTombraider;