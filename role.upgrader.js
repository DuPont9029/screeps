var roleUpgrader = {

    run: function (creep) {

        let sources;
        let all_sources = creep.room.find(FIND_SOURCES);
        
        if (all_sources.length > 0) {
            sources = creep.pos.findClosestByPath(all_sources);
        }

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
                if (sources !== undefined) {
                    if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
        }
    }
};

module.exports = roleUpgrader;