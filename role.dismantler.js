var roleDismantler = {
    run: function(creep) {
        // Step 1: Move to predefined room
        const targetFlag = Game.flags['TargetRoom'];
        if (creep.room.name !== targetFlag.pos.roomName) {
            creep.moveTo(targetFlag);
            return;
        }

        // Step 2: Calculate path to enemy spawn
        const enemySpawn = creep.room.find(FIND_HOSTILE_SPAWNS)[0];
        if (!enemySpawn) {
            return;
        }

        // Step 3: Check for walls between creep and spawn
        const path = creep.pos.findPathTo(enemySpawn);
        for (let i = 0; i < path.length; i++) {
            const pos = new RoomPosition(path[i].x, path[i].y, creep.room.name);
            const walls = pos.lookFor(LOOK_STRUCTURES).filter(s => s.structureType === STRUCTURE_WALL);
            if (walls.length > 0) {
                // Step 4: Find the wall with the least hits
                let targetWall = walls[0];
                for (let wall of walls) {
                    if (wall.hits < targetWall.hits) {
                        targetWall = wall;
                    }
                }
                // Step 5: Dismantle the wall
                if (creep.dismantle(targetWall) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetWall);
                }
                return;
            }
        }

        // Step 6: Move to spawn and dismantle it
        if (creep.dismantle(enemySpawn) === ERR_NOT_IN_RANGE) {
            creep.moveTo(enemySpawn);
        }
    }
};

module.exports = roleDismantler;