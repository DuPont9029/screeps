var roleDistantBuilder = {

    run: function (creep) {

        let targetConstructionSite = Game.getObjectById(creep.memory.structId);
        let harvestFlag = Game.flags['harvestFlag'];

        if (!creep.memory.building && creep.store.getUsedCapacity([RESOURCE_ENERGY]) === 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.store.getUsedCapacity([RESOURCE_ENERGY]) === creep.store.getCapacity([RESOURCE_ENERGY])) {
            creep.memory.building = true;
        }

        if (creep.memory.building) {
            if (creep.room.name !== targetConstructionSite.pos.roomName) {
                // Move to the target room
                creep.moveTo(new RoomPosition(25, 25, targetConstructionSite.pos.roomName), {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                // Build the target construction site
                if (creep.build(targetConstructionSite) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetConstructionSite, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } else {
            if (creep.room.name !== harvestFlag.pos.roomName) {
                // Move to the room with the harvest flag
                creep.moveTo(harvestFlag, {visualizePathStyle: {stroke: '#ffaa00'}});
            } else {
                // Harvest energy in the room with the harvest flag
                let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};

module.exports = roleDistantBuilder;