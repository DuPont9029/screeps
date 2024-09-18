var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRangedAttacker = require('role.rangedAttacker');
var roleHealer = require('role.healer');
var autospawn = require('autospawn');
var generatePixels = require('generatePixels');
var tower = require('structure.tower');
var roleReloader = require('role.reloader');
var roleClaimer = require('role.claimer');
var roleReserver = require('role.reserver');
var roleSigner = require('role.signer');
var roleSuppliesSender = require('role.suppliesSender');
var roleTombraider = require('role.tombraider');
var roleFixer = require('role.fixer');
var roleMap = require('rolemap');



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
//    /*
    autospawn(4, "upgrader", "Spawn1");
    autospawn(2, "builder", "Spawn1");
    autospawn(1, "reloader", "Spawn1");
//    */

if (hasTombstones(Game.spawns['Spawn1'].room)) {
    autospawn(1, "tombraider", "Spawn1");
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
