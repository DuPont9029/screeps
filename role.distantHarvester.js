var roleDistantHarvester = {
    run: function(creep) {
        // Step 1: Check for target flag
        var targetFlag = Game.flags['HarvestFlag'];
        if (!targetFlag) {
            console.log('No target flag found');
            return;
        }

        // Step 2: Move to target room if not already there
        if (creep.room.name !== targetFlag.pos.roomName) {
            creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#ffaa00'}});
            return;
        }

        // Step 3: Find the energy source
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (!source) {
            console.log('No source found');
            return;
        }

        // Step 4: Check for container near the source
        var containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: (structure) => structure.structureType === STRUCTURE_CONTAINER
        });

        if (containers.length === 0) {
            // Step 5: Build container if none exists
            var constructionSites = source.pos.findInRange(FIND_CONSTRUCTION_SITES, 1, {
                filter: (site) => site.structureType === STRUCTURE_CONTAINER
            });

            if (constructionSites.length === 0) {
                creep.room.createConstructionSite(source.pos.x, source.pos.y + 1, STRUCTURE_CONTAINER);
            } else {
                if (creep.store[RESOURCE_ENERGY] === 0) {
                    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } else {
                    var constructionSite = constructionSites[0];
                    if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        } else {
            // Step 6: Check for other sources without containers
            var otherSources = creep.room.find(FIND_SOURCES, {
                filter: (s) => s.id !== source.id
            });

            for (var otherSource of otherSources) {
                var otherContainers = otherSource.pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: (structure) => structure.structureType === STRUCTURE_CONTAINER
                });

                if (otherContainers.length === 0) {
                    var otherConstructionSites = otherSource.pos.findInRange(FIND_CONSTRUCTION_SITES, 1, {
                        filter: (site) => site.structureType === STRUCTURE_CONTAINER
                    });

                    if (otherConstructionSites.length === 0) {
                        creep.room.createConstructionSite(otherSource.pos.x, otherSource.pos.y + 1, STRUCTURE_CONTAINER);
                    }
                }
            }

            // Step 7: Mine and deposit energy in container
            var container = containers[0];
            if (creep.store.getFreeCapacity() > 0) {
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                if (creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleDistantHarvester;