/*
var roleScout = {
    run: function(creep) {
        // Step 1: Define the target room and rooms to traverse
        const targetRoom = 'W50N50'; // Replace with your specific target room
        const roomsToTraverse = ["W44N52",'W45N52', "W45N51", "W46N51", "W46N50", "W47N50", "W48N50", "W49N50", "W49N51", "W49N52", "W49N53", "W48N53"]; // Replace with your specific rooms to traverse
        const dangerRoom = "W49N52"
        // Step 2: Move through the rooms in sequence
        for (let i = 0; i < roomsToTraverse.length; i++) {
            if (creep.room.name !== roomsToTraverse[i]) {
                creep.moveTo(new RoomPosition(25, 25, roomsToTraverse[i]));
                return;
            }
        }

        // Step 3: Move to the target room if in the last room to traverse
        if (creep.room.name === roomsToTraverse[roomsToTraverse.length - 1] && creep.room.name !== targetRoom) {
            creep.moveTo(new RoomPosition(25, 25, targetRoom));
            return;
        }

        // Step 4: Perform scouting actions in the target room
        if (creep.room.name === targetRoom) {
            // Add any scouting actions here, e.g., reporting structures, resources, etc.
            console.log(`Scout ${creep.name} is in the target room ${targetRoom}`);
        }
    }
};

module.exports = roleScout;
*/

var roleScout = {
    run: function(creep) {
        // Step 1: Define the target room and rooms to traverse
        const targetRoom = 'W50N50'; // Replace with your specific target room
        const roomsToTraverse = ["W44N52", 'W45N52', "W45N51", "W46N51", "W46N50", "W47N50", "W48N50", "W49N50", "W49N51", "W49N52", "W49N53", "W48N53"]; // Replace with your specific rooms to traverse
        const dangerRoom = "W49N52"; // Replace with your specific danger room

        // Step 2: Move through the rooms in sequence
        for (let i = 0; i < roomsToTraverse.length; i++) {
            if (creep.room.name !== roomsToTraverse[i]) {
                creep.moveTo(new RoomPosition(25, 25, roomsToTraverse[i]));
                return;
            }

            // Step 3: Handle the danger room
            if (creep.room.name === dangerRoom) {
                // Find turrets in the room
                const turrets = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                    filter: (structure) => structure.structureType === STRUCTURE_TOWER
                });

                // Avoid turrets by keeping a distance of at least 10 tiles
                if (turrets.length > 0) {
                    const exit = creep.room.findExitTo(roomsToTraverse[i + 1]);
                    const exitPos = creep.pos.findClosestByRange(exit);
                    const safePath = PathFinder.search(creep.pos, { pos: exitPos, range: 1 }, {
                        flee: true,
                        roomCallback: (roomName) => {
                            if (roomName !== dangerRoom) return;
                            let costs = new PathFinder.CostMatrix;
                            turrets.forEach(turret => {
                                for (let x = turret.pos.x - 10; x <= turret.pos.x + 10; x++) {
                                    for (let y = turret.pos.y - 10; y <= turret.pos.y + 10; y++) {
                                        costs.set(x, y, 0xff);
                                    }
                                }
                            });
                            return costs;
                        }
                    });

                    if (safePath.path.length > 0) {
                        creep.moveByPath(safePath.path);
                    } else {
                        // If no safe path, move to a random position far from turrets
                        const randomPos = new RoomPosition(
                            Math.floor(Math.random() * 50),
                            Math.floor(Math.random() * 50),
                            dangerRoom
                        );
                        creep.moveTo(randomPos);
                    }
                } else {
                    // If no turrets, move to the next room
                    creep.moveTo(new RoomPosition(25, 25, roomsToTraverse[i + 1]));
                }
                return;
            }
        }

        // Step 4: Move to the target room if in the last room to traverse
        if (creep.room.name === roomsToTraverse[roomsToTraverse.length - 1] && creep.room.name !== targetRoom) {
            creep.moveTo(new RoomPosition(25, 25, targetRoom));
            return;
        }

        // Step 5: Perform scouting actions in the target room
        if (creep.room.name === targetRoom) {
            // Add any scouting actions here, e.g., reporting structures, resources, etc.
            console.log(`Scout ${creep.name} is in the target room ${targetRoom}`);
        }
    }
};

module.exports = roleScout;