const navigator = {
    run: function(creep, rooms) {
        for (let i = 0; i < rooms.length; i++) {
            const flagName = rooms[i];
            const flag = Game.flags[flagName];
            if (!flag) continue;

            if (creep.pos.roomName !== flag.pos.roomName || !creep.pos.isEqualTo(flag.pos)) {
                creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}});
                return;
            }

            // Remove the room from the array after visiting it
            rooms.splice(i, 1);
            i--; // Adjust the index after removal
        }
    }
};

module.exports = navigator;