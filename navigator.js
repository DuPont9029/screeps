const navigator = {
    run: function(creep, rooms) {
        if (!creep.memory.currentRoomIndex) {
            creep.memory.currentRoomIndex = 0;
        }

        const currentRoom = rooms[creep.memory.currentRoomIndex];
        const flag = Game.flags[currentRoom];
        if (!flag) return false;

        if (creep.pos.roomName !== flag.pos.roomName || !creep.pos.isEqualTo(flag.pos)) {
            creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}});
        } else {
            creep.memory.currentRoomIndex++;
            if (creep.memory.currentRoomIndex >= rooms.length) {
                return true; // Ritorna true quando l'ultima flag è raggiunta
            }
        }
        return false;
    }
};

module.exports = navigator;