var roleRefiller = {
    run: function(creep) {
        // Check if the creep is carrying energy
        if (creep.store[RESOURCE_ENERGY] > 0) {
            // Check if the creep has a target extension saved in memory
            if (!creep.memory.targetExtension) {
                // Find a new extension to fill
                const target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                // Save the target extension in memory
                if (target) {
                    creep.memory.targetExtension = target.id;
                }
            }

            // If the creep has a target extension in memory
            if (creep.memory.targetExtension) {
                const target = Game.getObjectById(creep.memory.targetExtension);
                // Check if the target extension is still valid
                if (target && target.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    // Move to the target extension and transfer energy
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } else {
                    // Remove the target extension from memory if it's full or invalid
                    delete creep.memory.targetExtension;
                }
            }
        } else {
            // If the creep is not carrying energy, get energy from the link with the flag in memory
            var flag = Game.flags[creep.memory.targetFlag];
            if (flag) {
                const link = flag.pos.lookFor(LOOK_STRUCTURES).find(s => s.structureType == STRUCTURE_LINK);
                const term = creep.room.find(FIND_STRUCTURES, {
                    filter: s => s.structureType === STRUCTURE_TERMINAL
                })[0];
                if (link && link.store[RESOURCE_ENERGY] > 0) {
                    if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(link, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } else if (term && term.store[RESOURCE_ENERGY] > 0) {
                    if (creep.withdraw(term, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(term, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } else {
                    // Add fallback to get energy from other sources if needed
                    const storage = creep.room.storage;
                    if (storage && storage.store[RESOURCE_ENERGY] > 0) {
                        if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    } else {
                        // If all extensions are full, find a free position near the link and move there
                        if (areAllExtensionsFull(creep.room)) {
                            console.log(`${creep.name} all extensions are full`);
                            const freePos = findFreePositionNearLink(creep.room, link.pos);
                            if (freePos) {
                                creep.moveTo(freePos, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                    }
                }
            }
        }
    }
};

function findFreePositionNearLink(room, linkPos) {
    const terrain = new Room.Terrain(room.name);
    let closestPos = null;
    let closestDistance = Infinity;

    for (let x = linkPos.x - 1; x <= linkPos.x + 1; x++) {
        for (let y = linkPos.y - 1; y <= linkPos.y + 1; y++) {
            if (x === linkPos.x && y === linkPos.y) continue;
            if (terrain.get(x, y) !== TERRAIN_MASK_WALL) {
                const pos = new RoomPosition(x, y, room.name);
                if (!pos.lookFor(LOOK_CREEPS).length) {
                    const distance = linkPos.getRangeTo(pos);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestPos = pos;
                    }
                }
            }
        }
    }

    return closestPos;
}

function areAllExtensionsFull(room) {
    const extensions = room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    });
    return extensions.every(extension => extension.store.getFreeCapacity(RESOURCE_ENERGY) === 0);
}

module.exports = roleRefiller;