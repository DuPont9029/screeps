var roleClaimer = {
    run: function(creep) {
        // Trova la flag "reserve"
        const flag = Game.flags[creep.memory.targetFlag];
        
        if (!flag) {
            console.log('No claim flag found');
            return;
        }

        // Se il creep non è nella stessa stanza della flag, muoviti verso la flag
        if (creep.room.name !== flag.pos.roomName) {
            creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}});
        } else {
            // Se il creep è nella stessa stanza della flag, riserva il controller
            const result = creep.claimController(creep.room.controller);
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                console.log(`Reserve result: ${result}`);
            }
        }
    }
};

module.exports = roleClaimer;