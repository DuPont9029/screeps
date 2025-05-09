const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRangedAttacker = require('role.rangedAttacker');
const roleHealer = require('role.healer');
const roleReloader = require('role.reloader');
const roleClaimer = require('role.claimer');
const roleReserver = require('role.reserver');
const roleSigner = require('role.signer');
const roleSuppliesSender = require('role.suppliesSender');
const roleTombraider = require('role.tombraider');
const roleFixer = require('role.fixer');
const roleDistantUpgrader = require('role.distantUpgrader');
const roleMiner = require('role.miner');
const roleAttacker = require('role.attacker');
const roomAttacker = require('role.roomAttacker');
const roleDrainer = require('role.drainer');
const roleDistantMiner = require('role.distantminer');
const roleRegenerator = require('role.regenerator');
const distantBuilder = require('role.distantBuilder');
const roleLinkReloader = require('role.linkReloader');
const rolestoreLoader = require('role.storeloader');
const roleRefiller = require('role.refiller');
const roleLinkFiller = require('role.linkFiller');
const roleDismantler = require('role.dismantler');
const roleDistantHarvester = require('role.distantHarvester');
const roleLinkUpgrader = require('role.linkUpgrader');
const roleHauler = require('role.hauler');
const roleTerminalLoader = require('role.terminalLoader');
const roleScout = require('role.scout');
const roleDepositMiner = require('role.depositMiner');
const roleLabManager = require('role.labManager');
const roleReactionEnder = require('role.reactionender');



const roleMap = {
    harvester: roleHarvester,
    upgrader: roleUpgrader,
    upgrader_g: roleUpgrader,
    linkUpgrader: roleLinkUpgrader,
    distantUpgrader: roleDistantUpgrader,
    builder: roleBuilder,
    rangedAttacker: roleRangedAttacker,
    fixer: roleFixer,
    reloader: roleReloader,
    claimer: roleClaimer,
    reserver: roleReserver,
    signer: roleSigner,
    suppliesSender: roleSuppliesSender,
    tombraider: roleTombraider,
    healer: roleHealer,
    miner: roleMiner,
    attacker: roleAttacker,
    roomAttacker: roomAttacker,
    drainer: roleDrainer,
    distantMiner: roleDistantMiner,
    regenerator: roleRegenerator,
    distantBuilder: distantBuilder,
    linkReloader: roleLinkReloader,
    storeLoader: rolestoreLoader,
    refiller: roleRefiller,
    upgrader_s: roleUpgrader,
    harvester_s: roleHarvester,
    linkFiller: roleLinkFiller,
    dismantler: roleDismantler,
    distantHarvester: roleDistantHarvester,
    hauler: roleHauler,
    terminalLoader: roleTerminalLoader,
    scout: roleScout,
    depositMiner: roleDepositMiner,
    labManager: roleLabManager,
    reactionEnder: roleReactionEnder
};

module.exports = roleMap;