const roleReactionEnder = {
    run: function(creep) {
        const room = creep.room;
        const terminal = room.terminal;

        if (!terminal) {
            console.log(`Terminale non trovato nella stanza ${room.name}`);
            return;
        }

        // Specifica la risorsa da prelevare
        const targetMineral = 'LO'; // Cambia questo valore con la risorsa desiderata

        // Trova tutti i laboratori nella stanza
        const labs = room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_LAB }
        });

        for (let lab of labs) {
            // Filtra i laboratori che contengono la risorsa specificata
            if (lab.mineralType === targetMineral && lab.mineralAmount > 0) {
                if (creep.store.getFreeCapacity() > 0) {
                    // Preleva il prodotto dal laboratorio
                    if (creep.withdraw(lab, lab.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(lab, { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                } else {
                    // Deposita il prodotto nel terminale
                    if (creep.transfer(terminal, Object.keys(creep.store)[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(terminal, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
        }
    }
};

module.exports = roleReactionEnder;