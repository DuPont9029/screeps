var roleLinkFiller = {

    run: function (creep) {

        let targetEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES, {
             filter: (structure) => {
                return ( /* structure.structureType === STRUCTURE_LINK  || structure.structureType === STRUCTURE_TOWER 
                    || structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION  */ 
                    structure.structureType === STRUCTURE_LINK) && structure.store.getUsedCapacity([RESOURCE_ENERGY]) < structure.store.getCapacity([RESOURCE_ENERGY]);
                }
        });

        var flag = Game.flags[creep.memory.targetFlag];

        if (flag && creep.room.name !== flag.pos.roomName) {
            // Move to the target room
            creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}});
            return;
        } else {
            if (creep.store.getUsedCapacity([RESOURCE_ENERGY]) === 0) {
                creep.memory.building = false;
            }
            if (creep.store.getUsedCapacity([RESOURCE_ENERGY]) === creep.store.getCapacity([RESOURCE_ENERGY])) {
                creep.memory.building = true;
            }

            if (targetEnergy) {
                if (creep.transfer(targetEnergy, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetEnergy, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};