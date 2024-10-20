const roleProperties = {
    harvester_s: [WORK, CARRY, MOVE],
    harvester: [WORK, CARRY, CARRY, CARRY, MOVE],
    upgrader: [WORK, CARRY, CARRY, MOVE],
    distantUpgrader: [WORK, CARRY, CARRY, MOVE],
    builder: [WORK, CARRY, CARRY, CARRY, MOVE],
    rangedAttacker: [TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, MOVE],
    fixer: [WORK, CARRY, CARRY, MOVE], // Nota: questo potrebbe essere troppo costoso
    healer: [HEAL, MOVE, MOVE],
    reloader: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE],
    claimer: [CLAIM, MOVE],
    reserver: [CLAIM, MOVE],
    signer: [MOVE],
    suppliesSender: [WORK, CARRY, CARRY, MOVE],
    tombraider: [WORK, CARRY, CARRY, MOVE],
    miner:[WORK, CARRY, CARRY, MOVE],
    attacker: [TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE],
    roomAttacker: [CLAIM, MOVE],
};

module.exports = roleProperties;