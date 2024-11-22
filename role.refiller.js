var roleRefiller = {
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

        // Se il creep non ha energia, prendi energia dal link
        if (creep.store[RESOURCE_ENERGY] == 0) {
            if (link && link.store[RESOURCE_ENERGY] > 0) {
                if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(link, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            // Trova tutte le estensioni che hanno bisogno di energia
            var extensions = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType == STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });

            // Ordina le estensioni per distanza
            extensions.sort((a, b) => creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b));

            // Riempie le estensioni
            if (extensions.length > 0) {
                if (creep.transfer(extensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(extensions[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleRefiller;