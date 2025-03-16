StructureLab.prototype.runReactions = function(targetProduct) {
    const reactions = {
        'LO': ['L', 'O'], // Lemergo + Ossigeno = LO
        // Aggiungi altre reazioni qui
    };

    if (!reactions[targetProduct]) {
        console.log(`Reazione per ${targetProduct} non trovata`);
        return;
    }

    const [reactant1, reactant2] = reactions[targetProduct];

    let labs = this.room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_LAB }
    });

    let lab1, lab2, lab3;

    // Trova i laboratori con i reagenti necessari
    for (let lab of labs) {
        if (lab.mineralType === reactant1) {
            lab1 = lab;
        } else if (lab.mineralType === reactant2) {
            lab2 = lab;
        } else if (!lab.mineralType) {
            lab3 = lab;
        }
    }

    if (lab1 && lab2 && lab3) {
        if (lab3.runReaction(lab1, lab2) === ERR_NOT_IN_RANGE) {
            lab3.moveTo(lab1, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    } else {
        console.log(`Non sono stati trovati laboratori adatti per la reazione ${targetProduct}`);
    }
};

module.exports = function(targetProduct) {
    for (let roomName in Game.rooms) {
        let room = Game.rooms[roomName];
        let labs = room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_LAB }
        });

        for (let lab of labs) {
            lab.runReactions(targetProduct);
        }
    }
};