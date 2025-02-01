const navigator = require('navigator');

const roleScout = {
    run: function(creep, roomsToTraverse) {
        if (!creep.memory.startTime) {
            creep.memory.startTime = Game.time;
        }

        navigator.run(creep, roomsToTraverse);

        if (roomsToTraverse.length === 0) {
            const timeTaken = Game.time - creep.memory.startTime;
            const shardMemory = InterShardMemory.getLocal();
            shardMemory.timeTaken = timeTaken;
            InterShardMemory.setLocal(shardMemory);
            console.log(`Time taken from start to destination: ${timeTaken} ticks`);
        }
    }
};

module.exports = roleScout;