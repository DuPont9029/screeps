let troopnumber = 1;
const avoidUsername = ['neverquest', 'Duce']; // Define the username to avoid attacking
const navigator = require('navigator'); // Import the navigator module

var roleAttacker = {
    /* @param {Creep} creep */
    run: function(creep) {
        // Posizione di pattuglia
        var patrolFlag = Game.flags['PATROL'];

        if (patrolFlag && !creep.memory.readyToAttack) {
            // Usa il navigator per raggiungere la posizione di pattuglia
            console.log(`${creep.name} is moving to patrol position...`);
            creep.moveTo(patrolFlag, { visualizePathStyle: { stroke: '#ffffff' } });
            
            
            if (patrolFlag.room && creep.room.name == patrolFlag.room.name) {
    // Conta il numero di attaccanti nella posizione di pattuglia
    var attackersAtPatrol = _.filter(Game.creeps, (c) => 
        c.memory.role == 'rangedAttacker' || c.memory.role == 'attacker' && c.pos.inRangeTo(patrolFlag.pos, 1)
    ).length;

    console.log(`Attackers at patrol: ${attackersAtPatrol}`);
    
    if (attackersAtPatrol >= troopnumber) {
        // Se ci sono abbastanza attaccanti, imposta il creep come pronto per attaccare
        creep.memory.readyToAttack = true;
        console.log(`${creep.name} is ready to attack.`);
    }
}
            return; // Continua a muoversi verso la posizione di pattuglia
        }

        // Cerca i nemici nella stanza, escludendo quelli dell'utente 'neverquest' e 'Duce'
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: (creep) => !avoidUsername.includes(creep.owner.username)
        });

        if (!target) {
            // Cerca strutture ostili se non ci sono creep nemici
            target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                filter: (structure) => structure.structureType === STRUCTURE_INVADER_CORE || structure.structureType === STRUCTURE_POWER_BANK
            });
        }

        if (target && creep.memory.readyToAttack) {
            // Se c'è un nemico e il creep è pronto per attaccare, attaccalo
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                // Muoviti verso il bersaglio senza usare navigator
                console.log(`${creep.name} is attacking target at ${target.pos}`);
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ff0000' } });
            }
        } else if (!target) {
            console.log(`${creep.name} found no targets.`);
        }
    }
};

module.exports = roleAttacker;