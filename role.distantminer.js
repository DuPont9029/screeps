var roleDistantMiner = {
    run: function(creep) {
        var flag = Game.flags[creep.memory.targetFlag];

        if (!flag) {
            console.log('Flag not found: ' + creep.memory.targetFlag);
            return;
        }

        if (creep.room.name !== flag.pos.roomName) {
            // Move to the target room
            creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}, avoid: this.avoidSourceKeepers()});
        } else {
            if (creep.memory.mining && creep.store.getFreeCapacity() === 0) {
                creep.memory.mining = false;
            }
            if (!creep.memory.mining && creep.store.getUsedCapacity() === 0) {
                creep.memory.mining = true;
            }

            if (creep.memory.mining) {
                var mineral = creep.pos.findClosestByPath(FIND_MINERALS);
                if (mineral && creep.harvest(mineral) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(mineral, {visualizePathStyle: {stroke: '#ffaa00'}, avoid: this.avoidSourceKeepers()});
                }
            } else {
                var lab = Game.getObjectById(creep.memory.labId);
                if (lab && creep.transfer(lab, RESOURCE_MINERAL) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(lab, {visualizePathStyle: {stroke: '#ffffff'}, avoid: this.avoidSourceKeepers()});
                }
            }
        }
    },

    avoidSourceKeepers: function() {
        return {
            filter: (pos) => {
                var sourceKeepers = pos.findInRange(FIND_HOSTILE_CREEPS, 5, {
                    filter: (creep) => creep.owner.username === 'Source Keeper'
                });
                return sourceKeepers.length === 0;
            }
        };
    }
};

module.exports = roleDistantMiner;