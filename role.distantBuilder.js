const navigator = require('navigator');

var roleDistantBuilder = {
    run: function (creep) {
        if (!creep.memory.roomsToTraverse) {
            creep.memory.roomsToTraverse = ['W44N51c', 'W44N50c', 'W43N50c', 'W42N50c', 'W41N50c', 'W40N50c', 'W40N51c', 'W40N52c', 'W41N53c', 'W41N54c', 'CLAIM'];
        }

        const reachedLastFlag = navigator.run(creep, creep.memory.roomsToTraverse);

        if (reachedLastFlag) {
            // Cambia il ruolo del creep in builder
            creep.memory.role = 'builder';
            console.log(`Creep ${creep.name} has reached the destination and is now a builder.`);
        }
    }
};

module.exports = roleDistantBuilder;




/*
var roleDistantBuilder = {
    run: function (creep) {
        let harvestFlag = Game.flags['CLAIM'];
        let targetFlag = Game.flags['CLAIM'];
        let allowedPlayers = ['DuPOnt9029']; // Array of allowed player names

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
                    let targetConstructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
                        filter: (site) => allowedPlayers.includes(site.owner.username)
                    });
                    if (targetConstructionSite) {
                        if (creep.build(targetConstructionSite) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(targetConstructionSite, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    } else {
                        console.log(`No construction sites found for allowed players in room ${creep.room.name} for creep ${creep.name}.`);
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
*/