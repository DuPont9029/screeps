var roleStoreLoader = {
    run: function(creep) {
        const storage = creep.room.storage;
        const link = Game.getObjectById('LINK_ID'); // Sostituisci 'LINK_ID' con l'ID del link desiderato

        if (!storage || !link) {
            console.log('Storage or Link not found');
            return;
        }

        if (creep.store.getFreeCapacity() > 0) {
            // Se il creep ha capacità libera, prende energia dallo storage
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            // Se il creep è pieno, trasferisce energia al link
            if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleStoreLoader;