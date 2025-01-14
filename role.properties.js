const roleProperties = {
    harvester_s: [WORK, CARRY, MOVE],
    harvester: [WORK, CARRY, CARRY, CARRY, MOVE],
    upgrader: [WORK, CARRY, CARRY, MOVE],
    upgrader_s: [WORK, CARRY, MOVE],
    upgrader_g: [WORK, WORK, CARRY, CARRY, MOVE],
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
    drainer: [TOUGH, TOUGH,  HEAL, HEAL, MOVE, MOVE],
    distantMiner: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
    regenerator: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE],
    distantBuilder: [WORK, CARRY, CARRY, CARRY, MOVE],
    linkReloader: [CARRY, CARRY, MOVE],
    storeLoader: [WORK, CARRY, CARRY, CARRY, MOVE],
    refiller: [CARRY, CARRY, CARRY, CARRY, MOVE],
    linkFiller: [WORK, WORK, CARRY, CARRY, MOVE],
    dismantler: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
    distantHarvester: [WORK, WORK, WORK, CARRY, MOVE]
};

module.exports = roleProperties;