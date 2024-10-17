var roleHarvester = {
    run: function (creep) {
        let targetEnergyId = creep.memory.targetEnergyId;
        let targetEnergy = targetEnergyId ? Game.getObjectById(targetEnergyId) : null;

        if (!targetEnergy || targetEnergy.store.getUsedCapacity(RESOURCE_ENERGY) >= targetEnergy.store.getCapacity(RESOURCE_ENERGY)) {
            targetEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION)
                        && structure.store.getUsedCapacity(RESOURCE_ENERGY) < structure.store.getCapacity(RESOURCE_ENERGY);
                }
            });
            if (targetEnergy) {
                creep.memory.targetEnergyId = targetEnergy.id;
            } else {
                creep.memory.targetEnergyId = null;
            }
        }

        let flag = Game.flags[creep.memory.targetFlag];

        if (flag && creep.room.name !== flag.pos.roomName) {
            // Move to the target room
            creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}});
            return;
        } else {
            let usedCapacity = creep.store.getUsedCapacity(RESOURCE_ENERGY);
            let totalCapacity = creep.store.getCapacity(RESOURCE_ENERGY);

            if (creep.memory.harvesting && usedCapacity === 0) {
                creep.memory.harvesting = false;
            }
            if (!creep.memory.harvesting && usedCapacity === totalCapacity) {
                creep.memory.harvesting = true;
            }

            if (creep.memory.harvesting) {
                if (targetEnergy) {
                    if (creep.transfer(targetEnergy, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetEnergy, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            } else {
                let sourceId = creep.memory.sourceId;
                let source = sourceId ? Game.getObjectById(sourceId) : null;

                if (!source) {
                    source = creep.pos.findClosestByPath(FIND_SOURCES);
                    if (source) {
                        creep.memory.sourceId = source.id;
                    }
                }

                if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;