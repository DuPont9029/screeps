const roleProperties = require('role.properties');

function autospawn(number, role, spawnName) {
    var EntityNumber = _.filter(Game.creeps, (creep) => creep.memory.role == role).length; // numero di creeps
    console.log('Creeps: ' + EntityNumber); 

    if (roleProperties[role]) {
        if (EntityNumber < number) {
            for (let i = 0; i < number - EntityNumber; i++) {
                Game.spawns[spawnName].spawnCreep(roleProperties[role], role.charAt(0).toUpperCase() + role.slice(1) + Game.time, { memory: { role: role } });
            }
        } else {
            console.log('max number of ' + role + ' reached');
        }
    } else {
        console.log('Role not recognized: ' + role);
    }
}

module.exports = autospawn;