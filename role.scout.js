var roleScout = {
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
            // Save path in global memory with a specific name
            if (!Memory.paths) {
                Memory.paths = {};
            }
            var pathName = creep.memory.pathName || 'defaultPath';
            Memory.paths[pathName] = {
                roomName: creep.room.name,
                x: creep.pos.x,
                y: creep.pos.y
            };
            console.log(`${creep.name} saved path as ${pathName} in global memory`);
        }
    }
};

module.exports = roleScout;