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
const attacker  = require('role.properties');
const roomAttacker = require('role.roomAttacker');

const roleMap = {
    harvester: roleHarvester,
    upgrader: roleUpgrader,
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
};

module.exports = roleMap;