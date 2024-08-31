function autospawn(number, role, spawnName) {

    var EntityNumber = _.filter(Game.creeps, (creep) => creep.memory.role == role).length; // number of creeps
    console.log('Creeps: ' + EntityNumber); 

    if (role == "harvester") {
        if (EntityNumber < number) {
            for (let i = 0; i < number; i++) {
                Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], 'Harvester' + Game.time, { memory: { role: 'harvester' } });
            }
        } else {
            console.log('max number of harvester reached');
        }
    } 
    else if (role == "upgrader") {
        if (EntityNumber < number) {
            for (let i = 0; i < number; i++) {
                Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], 'Upgrader' + Game.time, { memory: { role: 'upgrader' } });
            }
        } else {
            console.log('max number of upgrader reached');
        }
    } 
    else if (role == "builder") {
        if (EntityNumber < number) {
            for (let i = 0; i < number; i++) {
                Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], 'Builder' + Game.time, { memory: { role: 'builder' } });
            }
        } else {
            console.log('max number of builder reached');
        }
    }
    else if (role == "rangedAttacker") {
        if (EntityNumber < number) {
            for (let i = 0; i < number - EntityNumber; i++) {
                Game.spawns[spawnName].spawnCreep([RANGED_ATTACK, MOVE], 'RangedAttacker' + Game.time, { memory: { role: 'rangedAttacker' } });
            }
        } else {
            console.log('max number of ranged attackers reached');
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