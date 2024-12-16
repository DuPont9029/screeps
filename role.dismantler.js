const roomsToTraverse = ["W44N52c", 'W45N52c', "W45N51c", "W46N51c", "W46N50c", "W47N50c", "W48N50c", "W49N50c", "W49N51c", "W49N52c", "W49N53c", "W48N53c"]; 

var roleDismantler = {
    run: function(creep) {
        // Step 1: Define the danger room
        const dangerRoom = "W49N52c"; // Replace with your specific danger room

        // Step 2: Move through the flags in sequence
        for (let i = 0; i < roomsToTraverse.length; i++) {
            const flag = Game.flags[roomsToTraverse[i]];
            if (!flag) continue;

            if (creep.pos.roomName !== flag.pos.roomName || !creep.pos.isEqualTo(flag.pos)) {
                creep.moveTo(flag);
                return;
            }

            // Remove the room from the array after visiting it
            roomsToTraverse.splice(i, 1);
            i--; // Adjust the index after removal

            // Step 3: Handle the danger room
            if (creep.room.name === dangerRoom) {
                // Find turrets in the room
                const turrets = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                    filter: (structure) => structure.structureType === STRUCTURE_TOWER
                });

                // Avoid turrets by keeping a distance of at least 10 tiles
                if (turrets.length > 0) {
                    const nextFlag = Game.flags[roomsToTraverse[i + 1]];
                    if (!nextFlag) continue;

                    const safePath = PathFinder.search(creep.pos, { pos: nextFlag.pos, range: 1 }, {
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
                    // If no turrets, move to the next flag
                    const nextFlag = Game.flags[roomsToTraverse[i + 1]];
                    if (nextFlag) {
                        creep.moveTo(nextFlag);
                    }
                }
                return;
            }
        }

        // Step 4: Dismantle the wall with the least hits when reaching the final flag
        if (roomsToTraverse.length === 0) {
            const walls = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType === STRUCTURE_WALL
            });

            if (walls.length > 0) {
                const wallWithLeastHits = walls.reduce((prev, curr) => (prev.hits < curr.hits ? prev : curr));
                if (creep.dismantle(wallWithLeastHits) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(wallWithLeastHits);
                } else if (wallWithLeastHits.hits === 0) {
                    // Step 5: Dismantle the spawn after the wall is destroyed
                    const spawns = creep.room.find(FIND_HOSTILE_SPAWNS);
                    if (spawns.length > 0) {
                        const spawn = spawns[0];
                        if (creep.dismantle(spawn) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(spawn);
                        }
                    } else {
                        console.log("hurra");
                    }
                }
            } else {
                // If no walls are found, dismantle the spawn
                const spawns = creep.room.find(FIND_HOSTILE_SPAWNS);
                if (spawns.length > 0) {
                    const spawn = spawns[0];
                    if (creep.dismantle(spawn) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(spawn);
                    }
                } else {
                    console.log("hurra");
                }
            }
        }
    }
};

module.exports = roleDismantler;