var roleRangedAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // Cerca i nemici nella stanza
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        if(target) {
            // Se c'è un nemico, attaccalo
            if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                // Se il nemico non è a portata, muoviti verso di lui
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ff0000'}});
            }
        } else {
            // Se non ci sono nemici, muoviti verso una posizione di pattuglia
            var patrolFlag = Game.flags['Patrol'];
            if(patrolFlag) {
                creep.moveTo(patrolFlag, {visualizePathStyle: {stroke: '#00ff00'}});
            }
        }
    }
};

module.exports = roleRangedAttacker;