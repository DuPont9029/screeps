var roleTerminalLoader = {
    run: function(creep) {
        if (creep.store.getFreeCapacity() > 0) {
            // Se il creep ha capacità libera, cerca una fonte di energia
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            // Se il creep è pieno, trasferisce energia al terminale
            var terminal = creep.room.terminal;
            if (terminal && creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleTerminalLoader;