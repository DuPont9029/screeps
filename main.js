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
   

    autospawn(1, "refiller", "Spawn1", "fillLink");
    autospawn(1, "linkFiller", "Spawn1");
    autospawn(1, "upgrader_g", "Spawn1");
    autospawn(1, "reloader", "Spawn1");
    autospawn(1, "miner", "Spawn1");
    autospawn(1, "fixer", "Spawn1");
    autospawn(1, "builder", "Spawn1");
    autospawn(3, "terminalLoader", "Spawn1");
    autospawn(4, "linkUpgrader", "Spawn1", "fillink");

    autospawn(6, "upgrader_g", "Spawn2");
    autospawn(1, "reloader", "Spawn2");
    autospawn(1, "refiller", "Spawn2", "room2receiver");
    autospawn(2, "builder", "Spawn2");
    autospawn(3, "linkFiller", "Spawn2");
    autospawn(3, "terminalLoader", "Spawn2");

    
    
    autospawn(4, "linkUpgrader", "Spawn3", "room3receiver");
    autospawn(1, "refiller", "Spawn3", "room3receiver");
    autospawn(3, "linkFiller", "Spawn3");
    autospawn(2, "fixer", "Spawn3");


    autospawn(1, "refiller", "Spawn4", "room4receiver");
    autospawn(1, "linkFiller", "Spawn4");
    autospawn(3, "upgrader_g", "Spawn4");
    autospawn(4, "reloader", "Spawn4");
    autospawn(1, "harvester", "Spawn4");
    autospawn(2, "fixer", "Spawn4");
    
    
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
