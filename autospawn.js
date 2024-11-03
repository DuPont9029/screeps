const roleProperties = require('role.properties');

function autospawn(number, role, spawnName, targetFlag, signMessage, labId) {
    const spawn = Game.spawns[spawnName];
    if (!spawn) {
        console.log('Spawner not found: ' + spawnName);
        return;
    }

    const roomName = spawn.room.name;
    var EntityNumber = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.room.name == roomName).length; // numero di creeps nella stanza specifica
    console.log('Creeps in room ' + roomName + ': ' + EntityNumber); 

    if (roleProperties[role]) {
        if (EntityNumber < number) {
            for (let i = 0; i < number - EntityNumber; i++) {
                let newName = role.charAt(0).toUpperCase() + role.slice(1) + '-' + Game.time;
                spawn.spawnCreep(roleProperties[role], newName, { 
                    memory: { 
                        role: role,
                        targetFlag: targetFlag, // Add target flag to memory
                        signMessage: signMessage, // Add sign message to memory
                        labId: labId
                    } 
                });
            }
        } else {
            console.log('max number of ' + role + ' reached in room ' + roomName);
        }
    } else {
        console.log('Role not recognized: ' + role);
    }
}

module.exports = autospawn;