var roleLabManager = {
    run: function(creep) {
        const materials = ['O', 'K', 'L', 'Z', 'U', 'H'];
        const labMatrix = [
            ['O', 'Z', null],
            ['U', null, 'K'],
            [null, 'L', 'H']
        ];

        if (creep.store.getFreeCapacity() > 0) {
            // Gather materials from terminal
            let terminal = creep.room.terminal;
            if (terminal) {
                for (let material of materials) {
                    if (terminal.store[material] > 0) {
                        if (creep.withdraw(terminal, material) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                        return;
                    }
                }
            }
        } else {
            // Distribute materials to labs
            let labs = creep.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_LAB }
            });

            for (let i = 0; i < labMatrix.length; i++) {
                for (let j = 0; j < labMatrix[i].length; j++) {
                    let material = labMatrix[i][j];
                    if (material) {
                        let lab = labs[i * 3 + j];
                        if (lab && lab.store.getFreeCapacity(material) > 0) {
                            if (creep.transfer(lab, material) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(lab, {visualizePathStyle: {stroke: '#ffaa00'}});
                            }
                            return;
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleLabManager;