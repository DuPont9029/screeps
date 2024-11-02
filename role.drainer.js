var roleDrainer = {
    run: function(creep) {
        const targetRoom = 'W45N56'; // Stanza di destinazione
        const safeRoom = 'W45N55'; // Stanza confinante per curarsi

        if (creep.hits < creep.hitsMax) {
            // Se il creep è danneggiato, va nella stanza confinante per curarsi
            if (creep.room.name !== safeRoom) {
                creep.moveTo(new RoomPosition(25, 25, safeRoom));
            } else {
                // Azione di cura, ad esempio, se ha parti di HEAL
                creep.heal(creep);
            }
        } else {
            // Se il creep non è danneggiato, va nella stanza di destinazione
            if (creep.room.name !== targetRoom) {
                creep.moveTo(new RoomPosition(25, 25, targetRoom));
            } else {
                // Azione nella stanza di destinazione
                // Ad esempio, attaccare o eseguire altre azioni
            }
        }
    }
};

module.exports = roleDrainer;