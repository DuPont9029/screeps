const navigator = require('navigator');

const roleScout = {
    run: function(creep) {
        if (!creep.memory.startTime) {
            creep.memory.startTime = Game.time;
        }
    
        let roomsToTraverse = ['W44N51c', 'W44N50c', 'W43N50c', 'W42N50c', 'W41N50c', 'W40N50c', 'W40N51c', 'W40N52c', 'W41N53c', 'W41N54c', 'CLAIM']
        navigator.run(creep, roomsToTraverse);

        if (roomsToTraverse.length === 0) {
            if (creep.signController(creep.room.controller, "fermi alliance sector, room reserved") == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleScout;