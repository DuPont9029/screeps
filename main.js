var autospawn = require('autospawn');
var generatePixels = require('generatePixels');
var tower = require('structure.tower');
var roleMap = require('rolemap');
var terminalManager = require('structure.terminal');
const { linkAssociations, transferEnergy } = require('structure.links');



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
    autospawn(3, "harvester", "Spawn1");
    autospawn(4, "upgrader", "Spawn1");
    autospawn(1, "reloader", "Spawn1");
    autospawn(1, "miner", "Spawn1");
    autospawn(1, "builder", "Spawn1");
    autospawn(1, "linkReloader", "Spawn1", "Link1")
    autospawn(1, "storeLoader", "Spawn1", "Link2")
   
    autospawn(3, "harvester", "Spawn2");
    autospawn(1, "upgrader", "Spawn2");
    autospawn(1, "reloader", "Spawn2");


if (hasTombstones(Game.spawns['Spawn1'].room)) {
    autospawn(1, "tombraider", "Spawn1");
}

    if (Game.time % 100 === 0) {
        terminalManager.buy('DuPont9029', false, true); // true = send, false = receive
    }
    
    if (Game.time % 30 === 0) {
        linkAssociations.forEach(association => {
            const fromLink = Game.getObjectById(association.from);
            const toLink = Game.getObjectById(association.to);
            transferEnergy(fromLink, toLink);
        });
    }
    
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
