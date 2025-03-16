const labFunctions = require('labfunctions');

const baseMinerals = ['H', 'O', 'U', 'L', 'K', 'Z'];

var roleLabManager = {
    run: function(creep) {
        const labs = creep.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_LAB }
        });

        if (labs.length === 0) {
            console.log("Nessun laboratorio trovato.");
            return;
        }

        const terminal = creep.room.terminal;
        if (!terminal) {
            console.log("Terminale non trovato.");
            return;
        }

        let availableMinerals = [...baseMinerals];

        // Rimuovi i minerali presenti nei laboratori solo se il laboratorio è pieno
        labs.forEach(lab => {
            if (lab.mineralType && lab.store.getFreeCapacity(lab.mineralType) === 0 && availableMinerals.includes(lab.mineralType)) {
                availableMinerals = availableMinerals.filter(mineral => mineral !== lab.mineralType);
            }
        });

        // Rimuovi i minerali non presenti nel terminale
        availableMinerals = availableMinerals.filter(mineral => terminal.store[mineral] > 0);

        if (availableMinerals.length === 0) {
            console.log("Nessun minerale disponibile per il trasferimento.");
            return;
        }

        const selectedMineral = availableMinerals[0];
        const labId = labFunctions.getResourceId(selectedMineral, Game.rooms[creep.room.name]);
        console.log("lab id is:" + labId)

        if (!labId) {
            console.log(`Nessun laboratorio trovato per il minerale ${selectedMineral}.`);
            return;
        }

        const lab = Game.getObjectById(labId);
        if (!lab) {
            console.log(`Laboratorio con ID ${labId} non trovato.`);
            return;
        }

        if (creep.store.getFreeCapacity() > 0) {
            if (creep.withdraw(terminal, selectedMineral) == ERR_NOT_IN_RANGE) {
                creep.moveTo(terminal, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {
            if (creep.transfer(lab, selectedMineral) == ERR_NOT_IN_RANGE) {
                creep.moveTo(lab, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
};

module.exports = roleLabManager;