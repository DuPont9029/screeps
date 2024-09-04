var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRangedAttacker = require('role.rangedAttacker');
var roleHealer = require('role.healer');
var { autospawn } = require('autospawn');
var generatePixels = require('generatePixels');
var tower = require('structure.tower');
var roleReloader = require('role.reloader');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    generatePixels(false, true);
    autospawn(2, "harvester", "Spawn1");
    /*
        autospawn(2, "upgrader", "Spawn1");
        autospawn(2, "builder", "Spawn1");
    */


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
        if(creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
        if(creep.memory.role == 'reloader') {
            roleReloader.run(creep);
        }
    }
}