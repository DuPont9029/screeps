var roleDistantHarvester = {
    run: function(creep) {
        // Step 1: Check for target flag
        var targetFlag = Game.flags['harvestFlag'];
        if (!targetFlag) {
            console.log('No target flag found');
            return;
        }

        // Step 2: Move to target room if not already there
        if (creep.room.name !== targetFlag.pos.roomName) {
            console.log(`${creep.name} moving to target flag`);
            creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#ffaa00'}});
            return;
        }

        // Move towards the center of the room if near the border
        if (creep.pos.x === 0 || creep.pos.x === 49 || creep.pos.y === 0 || creep.pos.y === 49) {
            console.log(`${creep.name} moving to center of the room`);
            creep.moveTo(25, 25);
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
            console.log(`${creep.name} no container found near source, checking for construction sites`);
            // Step 5: Build container if none exists
            var constructionSites = source.pos.findInRange(FIND_CONSTRUCTION_SITES, 1, {
                filter: (site) => site.structureType === STRUCTURE_CONTAINER
            });

            if (constructionSites.length === 0) {
                console.log(`${creep.name} no construction site found, creating one`);
                // Find a free spot around the source to place the container
                var positions = [
                    {x: source.pos.x - 1, y: source.pos.y},
                    {x: source.pos.x + 1, y: source.pos.y},
                    {x: source.pos.x, y: source.pos.y - 1},
                    {x: source.pos.x, y: source.pos.y + 1},
                    {x: source.pos.x - 1, y: source.pos.y - 1},
                    {x: source.pos.x + 1, y: source.pos.y + 1},
                    {x: source.pos.x - 1, y: source.pos.y + 1},
                    {x: source.pos.x + 1, y: source.pos.y - 1}
                ];

                for (var pos of positions) {
                    var terrain = creep.room.getTerrain().get(pos.x, pos.y);
                    if (terrain !== TERRAIN_MASK_WALL) {
                        creep.room.createConstructionSite(pos.x, pos.y, STRUCTURE_CONTAINER);
                        break;
                    }
                }
            } else {
                if (creep.store[RESOURCE_ENERGY] === 0) {
                    console.log(`${creep.name} harvesting energy`);
                    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } else {
                    var constructionSite = constructionSites[0];
                    console.log(`${creep.name} building construction site`);
                    if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        } else {
            // Step 6: Check for other sources without containers
            console.log(`${creep.name} container found, checking other sources`);
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
                        console.log(`${creep.name} creating construction site for other source`);
                        // Find a free spot around the other source to place the container
                        var otherPositions = [
                            {x: otherSource.pos.x - 1, y: otherSource.pos.y},
                            {x: otherSource.pos.x + 1, y: otherSource.pos.y},
                            {x: otherSource.pos.x, y: otherSource.pos.y - 1},
                            {x: otherSource.pos.x, y: otherSource.pos.y + 1},
                            {x: otherSource.pos.x - 1, y: otherSource.pos.y - 1},
                            {x: otherSource.pos.x + 1, y: otherSource.pos.y + 1},
                            {x: otherSource.pos.x - 1, y: otherSource.pos.y + 1},
                            {x: otherSource.pos.x + 1, y: otherSource.pos.y - 1}
                        ];

                        for (var otherPos of otherPositions) {
                            var otherTerrain = creep.room.getTerrain().get(otherPos.x, otherPos.y);
                            if (otherTerrain !== TERRAIN_MASK_WALL) {
                                creep.room.createConstructionSite(otherPos.x, otherPos.y, STRUCTURE_CONTAINER);
                                break;
                            }
                        }
                    }
                }
            }

            // Step 7: Mine and deposit energy in container
            var container = containers[0];
            if (creep.store.getFreeCapacity() > 0) {
                console.log(`${creep.name} harvesting energy`);
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                if (container.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    console.log(`${creep.name} transferring energy to container`);
                    if (creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    console.log(`${creep.name} container full, repairing container`);
                    if (creep.repair(container) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
};

module.exports = roleDistantHarvester;