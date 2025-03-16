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

    buildIdMatrix: function(primolab, labs, room) {
        if (!room.memory.idMatrix) {
            const idMatrix = [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ];
            if (!primolab) {
                room.memory.idMatrix = idMatrix;
                return idMatrix;
            }

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
            const lab2_1 = lab0_1 ? getLabAt(lab0_1.pos.x, lab0_1.pos.y + 2) : null;
            idMatrix[2][1] = lab2_1 ? lab2_1.id : null;
            idMatrix[2][2] = lab2_1 ? (getLabAt(lab2_1.pos.x + 1, lab2_1.pos.y) || { id: null }).id : null;

            room.memory.idMatrix = idMatrix;
        }
        return room.memory.idMatrix;
    },

    getResourceId: function(resource, room) {
        const resourceMapping = {
            O: [0, 0],
            Z: [0, 1],
            U: [1, 0],
            K: [1, 2],
            L: [2, 1],
            H: [2, 2]
        };

        const position = resourceMapping[resource];
        if (!position) {
            return null;
        }

        // Assicuriamoci che room.memory esista
        if (!room.memory) {
            room.memory = {};
        }

        const idMatrix = room.memory.idMatrix;
        if (!idMatrix) {
            return null;
        }

        return idMatrix[position[0]][position[1]];
    }
};

module.exports = roleLabManager;