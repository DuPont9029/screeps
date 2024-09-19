let troopnumber = 1;
const avoidUsername = ['neverquest', 'Duce']; // Define the username to avoid attacking

var roleRangedAttacker = {

    
    /* @param {Creep} creep */
    run: function(creep) {
    // Posizione di pattuglia
    var patrolFlag = Game.flags[creep.memory.targetFlag];

    if (patrolFlag) {
        // Conta il numero di attaccanti nella posizione di pattuglia
        var attackersAtPatrol = _.filter(Game.creeps, (c) => c.memory.role == 'rangedAttacker' && c.pos.inRangeTo(patrolFlag.pos, 1)).length;

        if (attackersAtPatrol < troopnumber && !creep.memory.readyToAttack) {
            // Se ci sono meno di 3 attaccanti e il creep non è pronto per attaccare, muoviti verso la posizione di pattuglia
            creep.moveTo(patrolFlag, {
                visualizePathStyle: {stroke: '#00ff00'},
                ignoreCreeps: true,
                reusePath: 50
            });
            return; // Esci dalla funzione finché non ci sono abbastanza attaccanti
        } else {
            // Se ci sono abbastanza attaccanti, imposta il creep come pronto per attaccare
            creep.memory.readyToAttack = true;
        }
    }

    // Cerca i nemici nella stanza, escludendo quelli dell'utente 'neverquest'
    var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
        filter: (creep) => !avoidUsername.includes(creep.owner.username)
    });
    
    if (!target) {
            target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                filter: (structure) => structure.structureType === STRUCTURE_INVADER_CORE
            });
        }


    if (target && creep.memory.readyToAttack) {
        // Se c'è un nemico e il creep è pronto per attaccare, attaccalo
        if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ff0000'}});
        }
    }
}
};

module.exports = roleRangedAttacker;