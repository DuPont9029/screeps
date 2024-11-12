var roleLinkReloader = {
    run: function(creep) {
        // Trova la flag
        var flag = Game.flags[creep.memory.targetFlag];
        if (!flag) {
            console.log('Flag non trovata!');
            return;
        }

        // Trova il link alla flag
        var link = flag.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_LINK
        });

        // Trova la torretta più vicina
        var tower = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });

        // Se il creep non ha energia, prendi energia dal link
        if (creep.store[RESOURCE_ENERGY] == 0) {
            if (link && link.store[RESOURCE_ENERGY] > 0) {
                if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(link);
                }
            } else {
                creep.moveTo(flag);
            }
        } else {
            // Se il creep ha energia, consegnala alla torretta più vicina
            if (tower) {
                if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower);
                }
            } else {
                creep.moveTo(flag);
            }
        }
    }
};

module.exports = roleLinkReloader;