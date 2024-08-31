function autospawn(number, role, spawnName) {
    if (role == "harvester") {
        for (let i = 0; i < number; i++) {
            Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], 'Harvester' + Game.time, { memory: { role: 'harvester' } });
        }
    }
    if (role == "upgrader") {
        for (let i = 0; i < number; i++) {
            Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], 'Upgrader' + Game.time, { memory: { role: 'upgrader' } });
        }
    }
    if (role == "builder") {
        for (let i = 0; i < number; i++) {
            Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], 'Builder' + Game.time, { memory: { role: 'builder' } });
        }
    }

    if (Game.spawns[spawnName].spawning) {
        var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
        Game.spawns[spawnName].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawnName].pos.x + 1,
            Game.spawns[spawnName].pos.y,
            { align: 'left', opacity: 0.8 });
    }
}

module.exports = {
    autospawn
}