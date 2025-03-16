
const labFunctions = require('labfunctions');

const baseMinerals = ['H', 'O', 'U', 'L', 'K', 'Z', 'X'];

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
        const labId = labFunctions.getResourceId(selectedMineral);

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





/*
const roleLabManager = {
    idMatrix: null,

    getPrimolab: function(labs) {
        if (labs.length === 0) return null;
        let primolab = labs[0];
        for (const lab of labs) {
            if (lab.pos.x < primolab.pos.x || (lab.pos.x === primolab.pos.x && lab.pos.y < primolab.pos.y)) {
                primolab = lab;
            }
        }
        return primolab;
    },

    buildIdMatrix: function(primolab, labs) {
        if (!room.memory.idMatrix) {
            const idMatrix = [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ];
            if (!primolab) return idMatrix;

            const labsByPos = {};
            labs.forEach(lab => {
                const key = `${lab.pos.x},${lab.pos.y}`;
                labsByPos[key] = lab;
            });

            const getLabAt = (x, y) => labsByPos[`${x},${y}`] || null;
            const px = primolab.pos.x;
            const py = primolab.pos.y;

            // Prima riga
            idMatrix[0][0] = primolab.id;
            const lab0_1 = getLabAt(px + 1, py);
            idMatrix[0][1] = lab0_1 ? lab0_1.id : null;
            idMatrix[0][2] = null;

            // Seconda riga
            const lab1_0 = getLabAt(px, py + 1);
            idMatrix[1][0] = lab1_0 ? lab1_0.id : null;
            idMatrix[1][1] = null;
            idMatrix[1][2] = lab1_0 ? (getLabAt(lab1_0.pos.x + 2, lab1_0.pos.y) || { id: null }).id : null;

            // Terza riga
            idMatrix[2][0] = null;
            const lab2_1 = lab0_1 ? getLabAt(lab0_1.pos.x, lab0_1.pos.y + 2) : null;
            idMatrix[2][1] = lab2_1 ? lab2_1.id : null;
            idMatrix[2][2] = lab2_1 ? (getLabAt(lab2_1.pos.x + 1, lab2_1.pos.y) || { id: null }).id : null;

            creep.room.memory.idMatrix = idMatrix;
        }
        return room.memory.idMatrix;
    },


    run: function(creep) {
        const labs = creep.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_LAB }
        });

        if (labs.length === 0) {
            console.log("Nessun laboratorio trovato.");
            return;
        }

        const primolab = this.getPrimolab(labs);
        if (!primolab) {
            console.log("Primolab non trovato.");
            return;
        }

        this.idMatrix = this.buildIdMatrix(primolab, labs);

        console.log("Matrice degli ID dei laboratori:");
        this.idMatrix.forEach((row, i) => {
            console.log(`Riga ${i}:`, JSON.stringify(row));
        });
    }
};
*/







module.exports = roleLabManager;