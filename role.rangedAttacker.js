let troopnumber = 3;

var roleRangedAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // Posizione di pattuglia
        var patrolFlag = Game.flags['Patrol'];

        if (patrolFlag) {
            // Conta il numero di attaccanti nella posizione di pattuglia
            var attackersAtPatrol = _.filter(Game.creeps, (c) => c.memory.role == 'rangedAttacker' && c.pos.inRangeTo(patrolFlag.pos, 1)).length;

            if (attackersAtPatrol < troopnumber && !creep.memory.readyToAttack) {
                // Se ci sono meno di 3 attaccanti e il creep non è pronto per attaccare, muoviti verso la posizione di pattuglia
                creep.moveTo(patrolFlag);
                return; // Esci dalla funzione finché non ci sono abbastanza attaccanti
            } else {
                // Se ci sono abbastanza attaccanti, imposta il creep come pronto per attaccare
                creep.memory.readyToAttack = true;
            }
        }

        // Cerca i nemici nella stanza
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        if(target && creep.memory.readyToAttack) {
            // Se c'è un nemico e il creep è pronto per attaccare, attaccalo
            if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                // Se il nemico non è a portata, muoviti verso di lui
                creep.moveTo(target);
            }
        } else if (!creep.memory.readyToAttack) {
            // Se non ci sono nemici o il creep non è pronto per attaccare, muoviti verso una posizione di pattuglia
            if(patrolFlag) {
                creep.moveTo(patrolFlag);
            }
        }
    }
};

module.exports = roleRangedAttacker;