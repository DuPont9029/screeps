var autospawn = require('autospawn');
var generatePixels = require('generatePixels');
var tower = require('structure.tower');
var roleMap = require('rolemap');
var manageTerminal = require('structure.terminal'); 




function hasTombstones(room) {
    return room.find(FIND_TOMBSTONES, {
        filter: (tomb) => tomb.store.getUsedCapacity() > 0
    }).length > 0;
}


module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    generatePixels(false, true);
    autospawn(2, "harvester", "Spawn1");
    autospawn(3, "upgrader", "Spawn1");
    autospawn(2, "builder", "Spawn1", "ROOM2");
    autospawn(1, "reloader", "Spawn1");
    autospawn(1, "distantUpgrader", "Spawn1", "ROOM2");


if (hasTombstones(Game.spawns['Spawn1'].room)) {
    autospawn(1, "tombraider", "Spawn1");
}

    manageTerminal('DuPont9029', false, true); // true = send, false = receive

    for (let rooms in Game.rooms) {

        let room = Game.rooms[rooms];
        tower.run(room);
    }

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        const role = creep.memory.role;
        if (roleMap[role]) {
            roleMap[role].run(creep);
        }
    }
}
