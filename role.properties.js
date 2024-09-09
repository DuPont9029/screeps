const roleProperties = {
    harvester: [WORK, CARRY, CARRY, MOVE],
    upgrader: [WORK, CARRY, CARRY, MOVE],
    builder: [WORK, CARRY, CARRY, CARRY, MOVE],
    rangedAttacker: [TOUGH, TOUGH, RANGED_ATTACK, MOVE],
    healer: [WORK, CARRY, CARRY, MOVE], // Nota: questo potrebbe essere troppo costoso
    reloader: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE],
    claimer: [CLAIM, MOVE],
    reserver: [CLAIM, MOVE],
    signer: [CLAIM, MOVE]
};

module.exports = roleProperties;