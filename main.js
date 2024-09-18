var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRangedAttacker = require('role.rangedAttacker');
var roleHealer = require('role.fixer');
var autospawn = require('autospawn');
var generatePixels = require('generatePixels');
var tower = require('structure.tower');
var roleReloader = require('role.reloader');
var roleClaimer = require('role.claimer');
var roleReserver = require('role.reserver');
var roleSigner = require('role.signer');
var roleSuppliesSender = require('role.suppliesSender');
var roleTombraider = require('role.tombraider');
const roleFixer = require('./role.fixer');



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

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'rangedAttacker') {
            roleRangedAttacker.run(creep);
        }
        if(creep.memory.role == 'fixer') {
            roleFixer.run(creep);
        }
        if(creep.memory.role == 'reloader') {
            roleReloader.run(creep);
        }
        if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        if(creep.memory.role == 'reserver') {
            roleReserver.run(creep);
        }
        if(creep.memory.role == 'signer') {
            roleSigner.run(creep);
        }
        if(creep.memory.role == 'suppliesSender') {
            roleSuppliesSender.run(creep);
        }
        if(creep.memory.role == 'tombraider') {
            roleTombraider.run(creep);
        }
    }
}
