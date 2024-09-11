let structurehits = 15000000;
const avoidUsername = ['neverquest', 'duce']; // Define the username to avoid attacking

var structureTower = {
    run: function (roomName) {
        var hostiles = roomName.find(FIND_HOSTILE_CREEPS);
        var today = new Date();
        today.setHours(today.getHours() + 2);

        if (hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${hostiles[0].room} - ${today.toLocaleString()} - ${Game.time}`);
        }

        var towers = roomName.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
        if (towers.length > 0) {
            for (let i = 0; i < towers.length; i++) {
                let tower = towers[i];
                if (tower.energy > 500 && roomName.energyAvailable > 500 && hostiles.length === 0) {
                    var initialDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits < structure.hitsMax && (structure.structureType !== STRUCTURE_WALL || structure.hits < structurehits)
                    });

                    if (initialDamagedStructure) {
                        tower.repair(initialDamagedStructure);
                    }
                } else if (tower.energy > 200 && hostiles.length === 0) {
                    var closestDamaged = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits < structure.hitsMax && (structure.structureType !== STRUCTURE_WALL || structure.hits < structurehits)
                    });
                    if (closestDamaged) {
                        tower.repair(closestDamaged);
                    }
                }

                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                    filter: (creep) => !avoidUsername.includes(creep.owner.username)
                });
                if (closestHostile) {
                    tower.attack(closestHostile);
                }
            }
        }
    }
};

module.exports = structureTower;