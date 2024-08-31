function autospawn(number, role, spawnName) {

    var EntityNumber = _.filter(Game.creeps, (creep) => creep.memory.role == role).length; // number of creeps
    console.log('Creeps: ' + EntityNumber); 


    if (role == "harvester" && EntityNumber < number) {
        for (let i = 0; i < number; i++) {
            Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], 'Harvester' + Game.time, { memory: { role: 'harvester' } });
        }
    }
    else {
        console.error('max number of harvester reached');
        
    }
    if (role == "upgrader" && EntityNumber < number) {
        for (let i = 0; i < number; i++) {
            Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], 'Upgrader' + Game.time, { memory: { role: 'upgrader' } });
        }
    }
    else {
        console.error('max number of upgrader reached');
        
    }
    if (role == "builder" && EntityNumber < number) {
        for (let i = 0; i < number; i++) {
            Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], 'Builder' + Game.time, { memory: { role: 'builder' } });
        }
    }
    else {
        console.error('max number of builder reached');
        
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