var roleTerminalLoader = {
    run: function(creep) {
        if (creep.store.getFreeCapacity() > 0) {
            // Se il creep ha capacità libera, cerca una fonte di energia
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            if (creep.room.terminal && creep.room.terminal.store && creep.room.terminal.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
                // Se il creep è nella stanza W43N52, trasferisce energia ai laboratori
                var labs = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: structure => structure.structureType === STRUCTURE_LAB && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                });
                if (labs.length > 0) {
                    if (creep.transfer(labs[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(labs[0], {visualizePathStyle: {stroke: '#00ff00'}});
                    }
                }
            } else {
                // Se il creep è pieno, trasferisce energia al terminale
                var terminal = creep.room.terminal;
                if (terminal && creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleTerminalLoader;
