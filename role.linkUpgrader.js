var roleLinkUpgrader = {

    run: function (creep) {
        var flag = Game.flags[creep.memory.targetFlag];

        if (flag && creep.room.name !== flag.pos.roomName) {
            // Move to the target room
            creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}});
            return;
        } else {
            if (creep.memory.upgrading && creep.store.getUsedCapacity([RESOURCE_ENERGY]) === 0) {
                creep.memory.upgrading = false;
            }
            if (!creep.memory.upgrading && creep.store.getUsedCapacity([RESOURCE_ENERGY]) === creep.store.getCapacity([RESOURCE_ENERGY])) {
                creep.memory.upgrading = true;
            }

            if (creep.memory.upgrading) {
                if (creep.room.controller) {
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            } else {
                // Find the link near the flag
                var link = flag.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.structureType === STRUCTURE_LINK && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                });

                if (link) {
                    if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(link, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } else {
                    creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};

module.exports = roleLinkUpgrader;