var roleHealer = {
    // Tipi di creep da curare
    typesToHeal: ['rangedAttacker'],

    run: function(creep) {
        // Numero di healer che devono supportare un singolo target
        const supportCount = 2;

        // Se il creep non ha un target, cerca un target del tipo specificato in typesToHeal
        if (!creep.memory.target) {
            const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (c) => roleHealer.typesToHeal.includes(c.memory.role) && 
                               (!c.memory.supportCount || c.memory.supportCount < supportCount)
            });
            if (target) {
                creep.memory.target = target.id;
                if (!target.memory.supportCount) {
                    target.memory.supportCount = 0;
                }
                target.memory.supportCount++;
            }
        }

        // Se il creep ha un target, seguilo e curalo
        if (creep.memory.target) {
            const target = Game.getObjectById(creep.memory.target);
            if (target) {
                // Se il target è in una stanza diversa, muoviti verso l'uscita
                if (creep.room.name !== target.room.name) {
                    const exitDir = creep.room.findExitTo(target.room.name);
                    const exit = creep.pos.findClosestByRange(exitDir);
                    creep.moveTo(exit, { visualizePathStyle: { stroke: '#ffaa00' } });
                } else {
                    // Se il target è ferito, curalo
                    if (target.hits < target.hitsMax) {
                        if (creep.pos.inRangeTo(target, 3)) {
                            creep.rangedHeal(target);
                        } else {
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#00ff00' } });
                        }
                    } else {
                        // Se il target non è ferito, seguilo
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#00ff00' } });
                    }
                }
            } else {
                // Se il target non esiste più, rimuovilo dalla memoria
                delete creep.memory.target;
            }
        }
    }
};

module.exports = roleHealer;