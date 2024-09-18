const roleProperties = require('role.properties');

function autospawn(number, role, spawnName, targetFlag, signMessage) {
    var EntityNumber = _.filter(Game.creeps, (creep) => creep.memory.role == role).length; // numero di creeps
    console.log('Creeps: ' + EntityNumber); 

    if (roleProperties[role]) {
        if (EntityNumber < number) {
            for (let i = 0; i < number - EntityNumber; i++) {
                let newName = role.charAt(0).toUpperCase() + role.slice(1) + Game.time;
                Game.spawns[spawnName].spawnCreep(roleProperties[role], newName, { 
                    memory: { 
                        role: role,
                        targetFlag: targetFlag, // Add target flag to memory
                        signMessage: signMessage, // Add sign message to memory
                    } 
                });
            }
        } else {
            console.log('max number of ' + role + ' reached');
        }
    } else {
        console.log('Role not recognized: ' + role);
    }
}

module.exports = autospawn;