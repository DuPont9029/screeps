var roleHauler = {
    run: function(creep) {

        const homeFlag = Game.flags['DuPont9029'];
        const harvestFlag = Game.flags['harvestFlag2'];

        // Se il creep è pieno, torna alla stanza di origine
        if (creep.store.getFreeCapacity() === 0) {
            if (!homeFlag) {
                console.log('HomeFlag DuPont9029 non trovata');
                return;
            }

            console.log(`Creep ${creep.name} nella stanza ${creep.room.name}, HomeFlag nella stanza ${homeFlag.room ? homeFlag.room.name : 'undefined'}`);

            if (creep.room.name !== homeFlag.room.name) {
                console.log(`Creep ${creep.name} si sta muovendo verso HomeFlag DuPont9029`);
                creep.moveTo(homeFlag);
            } else {
                const terminal = creep.room.terminal;
                if (terminal) {
                    console.log(`Creep ${creep.name} si sta muovendo verso il terminale`);
                    if (creep.transfer(terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(terminal);
                    }
                }
            }
            return; // Assicurati che il creep non esegua altro codice se è pieno
        }

        // Trova la harvest flag
        if (!harvestFlag) {
            console.log('HarvestFlag non trovata');
            return;
        }

        console.log(`Creep ${creep.name} nella stanza ${creep.room.name}, HarvestFlag nella stanza ${harvestFlag.room ? harvestFlag.room.name : 'undefined'}`);

        // Se il creep non è nella stanza della harvest flag, muoviti lì
        if (!harvestFlag.room || creep.room.name !== harvestFlag.room.name) {
            console.log(`Creep ${creep.name} si sta muovendo verso HarvestFlag`);
            creep.moveTo(harvestFlag);
            return;
        }

        // Trova i container nella stanza della harvest flag
        const containers = harvestFlag.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: (structure) => structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0
        });

        if (containers.length > 0) {
            // Se il container è pieno, prendi l'energia
            console.log(`Creep ${creep.name} ha trovato un container pieno`);
            if (creep.withdraw(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0]);
            }
        } else {
            // Se non ci sono container pieni, aspetta al centro della stanza
            console.log(`Creep ${creep.name} non ha trovato container pieni, si muove al centro della stanza`);
            const centerPos = new RoomPosition(25, 25, creep.room.name);
            creep.moveTo(centerPos);
        }
    }
};

module.exports = roleHauler;