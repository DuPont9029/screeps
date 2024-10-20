let troopnumber = 1;
const avoidUsername = ['neverquest', 'Duce', 'PersonaComune']; // Define the username to avoid attacking

var roleAttacker = {

    /* @param {Creep} creep */
    run: function(creep) {
        // Check if the creep has taken damage and has a HEAL part
        if (creep.hits < creep.hitsMax && creep.body.some(part => part.type === HEAL)) {
            // Heal the creep if it has taken damage and has a HEAL part
            creep.heal(creep);
            console.log("curato");
        } else { console.log("cure failed") }

        // Patrol position
        var patrolFlag = Game.flags[creep.memory.targetFlag];

        if (patrolFlag) {
            // Count the number of attackers at the patrol position
            var attackersAtPatrol = _.filter(Game.creeps, (c) => c.memory.role == 'attacker' && c.pos.inRangeTo(patrolFlag.pos, 1)).length;

            if (attackersAtPatrol < troopnumber && !creep.memory.readyToAttack) {
                // Move to the patrol position if there are fewer attackers than the defined number
                creep.moveTo(patrolFlag, {
                    visualizePathStyle: {stroke: '#00ff00'},
                    ignoreCreeps: true,
                    reusePath: 50
                });
                return; // Exit the function until there are enough attackers
            } else {
                // Set the creep as ready to attack if there are enough attackers
                creep.memory.readyToAttack = true;
            }
        }

        // Find the closest hostile creep, excluding those from specific usernames
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: (creep) => !avoidUsername.includes(creep.owner.username)
        });

        if (target) {
            // Attack the target if found
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ff0000'}});
            }
        }
    }
};

module.exports = roleAttacker;