var roleRegenerator = {
    run: function(creep) {
        if (creep.store[RESOURCE_GHODIUM] === 0) {
            // Move to the terminal and withdraw 1000 units of GHODIUM
            var terminal = creep.room.terminal;
            if (terminal && terminal.store[RESOURCE_GHODIUM] > 0) {
                if (creep.withdraw(terminal, RESOURCE_GHODIUM, 1000) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } else {
            // Move to the controller and generate safe mode
            var controller = creep.room.controller;
            if (controller) {
                if (creep.pos.inRangeTo(controller, 3)) {
                    if (creep.generateSafeMode(controller) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } else {
                    creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};

module.exports = roleRegenerator;