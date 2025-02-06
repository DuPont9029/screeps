const navigator = require('navigator');

var roleQuad = {
    run: function(creep) {
        if (!creep.memory.roomsToTraverse) {
            creep.memory.roomsToTraverse = ['W44N51c', 'W44N50c', 'W43N50c', 'W42N50c', 'W41N50c', 'W40N50c', 'W40N51c', 'W40N52c', 'W41N53c', 'W41N54c', 'PREPARE'];
        }

        const reachedPreparationRoom = navigator.run(creep, creep.memory.roomsToTraverse);

        if (reachedPreparationRoom) {
            // Identifica i membri del quad
            if (!creep.memory.isQuadFormed) {
                const quadMembers = _.filter(Game.creeps, (c) => c.memory.role === 'quad' && !c.memory.quadAssigned);
                if (quadMembers.length >= 4) {
                    quadMembers.slice(0, 4).forEach((member, index) => {
                        member.memory.quadAssigned = true;
                        member.memory.quadIndex = index;
                        member.memory.quadLeader = creep.name;
                    });
                    creep.memory.isQuadFormed = true;
                    console.log(`Creep ${creep.name} has formed a quad with members: ${quadMembers.slice(0, 4).map(m => m.name).join(', ')}`);
                } else {
                    console.log('Not enough quad members available to form a quad.');
                    return;
                }
            }

            // Procedi alla stanza di attacco come quad
            const attackFlag = Game.flags['ATTACK'];
            if (attackFlag) {
                if (creep.room.name !== attackFlag.pos.roomName) {
                    // Movimento del quad verso la stanza di attacco
                    const quadMembers = _.filter(Game.creeps, (c) => c.memory.quadLeader === creep.name);

                    quadMembers.forEach(member => {
                        if (member) {
                            member.moveTo(attackFlag, {visualizePathStyle: {stroke: '#ff0000'}});
                        }
                    });
                } else {
                    // Azioni di attacco nella stanza di attacco
                    const quadMembers = _.filter(Game.creeps, (c) => c.memory.quadLeader === creep.name);

                    let target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                        filter: (structure) => structure.structureType === STRUCTURE_RAMPART && structure.pos.findInRange(FIND_HOSTILE_STRUCTURES, 0, {
                            filter: (s) => s.structureType === STRUCTURE_TOWER
                        }).length > 0
                    });

                    if (!target) {
                        target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                            filter: (structure) => structure.structureType === STRUCTURE_TOWER
                        });
                    }

                    if (!target) {
                        target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                            filter: (structure) => structure.structureType === STRUCTURE_INVADER_CORE
                        });
                    }

                    if (target) {
                        quadMembers.forEach(member => {
                            if (member && member.getActiveBodyparts(ATTACK) > 0) {
                                if (member.attack(target) == ERR_NOT_IN_RANGE) {
                                    member.moveTo(target, {visualizePathStyle: {stroke: '#ff0000'}});
                                }
                            }
                        });
                    }

                    // Guarigione del quad
                    quadMembers.forEach(member => {
                        if (member.getActiveBodyparts(HEAL) > 0) {
                            const damagedMember = member.pos.findClosestByRange(quadMembers, {
                                filter: (quadMember) => quadMember.hits < quadMember.hitsMax
                            });
                            if (damagedMember) {
                                if (member.heal(damagedMember) === ERR_NOT_IN_RANGE) {
                                    member.moveTo(damagedMember, {visualizePathStyle: {stroke: '#00ff00'}});
                                }
                            }
                        }
                    });
                }
            } else {
                console.log('ATTACK flag not found');
            }
        }
    }
};

module.exports = roleQuad;