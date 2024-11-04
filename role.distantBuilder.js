var roleDistantBuilder = {

    run: function (creep) {

        let targetConstructionSite = Game.getObjectById(creep.memory.structId);
        let harvestFlag = Game.flags['harvestFlag'];
        let targetFlag = Game.flags['rovy'];

        if (creep.memory.building && creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.store.getUsedCapacity(RESOURCE_ENERGY) === creep.store.getCapacity(RESOURCE_ENERGY)) {
            creep.memory.building = true;
        }

        if (creep.memory.building) {
            if (targetFlag) {
                if (creep.room.name !== targetFlag.pos.roomName) {
                    // Move to the target room
                    creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#ffffff'}});
                } else {
                    // Build the target construction site
                    if (targetConstructionSite) {
                        if (creep.build(targetConstructionSite) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(targetConstructionSite, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    } else {
                        console.log(`Target construction site not found for creep ${creep.name}. ID: ${creep.memory.structId}`);
                    }
                }
            } else {
                console.log(`Target flag not found for creep ${creep.name}. Flag: ${creep.memory.flag}`);
            }
        } else {
            if (harvestFlag) {
                if (creep.room.name !== harvestFlag.pos.roomName) {
                    // Move to the room with the harvest flag
                    creep.moveTo(harvestFlag, {visualizePathStyle: {stroke: '#ffaa00'}});
                } else {
                    // Harvest energy in the room with the harvest flag
                    let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                    if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            } else {
                console.log(`Harvest flag not found for creep ${creep.name}`);
            }
        }
    }
};

module.exports = roleDistantBuilder;