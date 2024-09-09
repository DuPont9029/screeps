var roleClaimer = {
    run: function(creep) {
        var flag = Game.flags[creep.memory.targetFlag];
        
        if (!flag) {
            console.log('Flag not found: ' + creep.memory.targetFlag);
            return;
        }

        if (creep.room.name != flag.pos.roomName) {
            // Move to the target room
            console.log(`${creep.name} moving to flag at ${flag.pos}`);
            creep.moveTo(flag);
        } else {
            // Move towards the center of the room if near the border
            if (creep.pos.x === 0 || creep.pos.x === 49 || creep.pos.y === 0 || creep.pos.y === 49) {
                console.log(`${creep.name} moving to center of the room`);
                creep.moveTo(25, 25);
            } else {
                // Claim the controller
                const controller = creep.room.controller;
                if (controller) {
                    const claimResult = creep.claimController(controller);
                    if (claimResult == ERR_NOT_IN_RANGE) {
                        console.log(`${creep.name} moving to controller at ${controller.pos}`);
                        creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    } else if (claimResult == OK) {
                        console.log(`${creep.name} successfully claimed controller at ${controller.pos}`);
                    } else {
                        console.log(`${creep.name} failed to claim controller at ${controller.pos} with error ${claimResult}`);
                    }
                } else {
                    console.log(`${creep.name} could not find controller in room ${creep.room.name}`);
                }
            }
        }
    }
};

module.exports = roleClaimer;