var roleDrainer = {
    run: function(creep) {
        const targetFlag = Game.flags['TargetRoomFlag']; // Bandiera per la stanza di destinazione
        const safeFlag = Game.flags['SafeRoomFlag']; // Bandiera per la stanza sicura

        if (!targetFlag || !safeFlag) {
            console.log('Flags not found');
            return;
        }

        if (creep.hits < creep.hitsMax) {
            // Se il creep è danneggiato, va nella stanza sicura per curarsi
            if (creep.room.name !== safeFlag.pos.roomName) {
                creep.moveTo(safeFlag, {visualizePathStyle: {stroke: '#ffaa00'}});
            } else {
                // Azione di cura, ad esempio, se ha parti di HEAL
                creep.heal(creep);
            }
        } else {
            // Se il creep non è danneggiato, va nella stanza di destinazione
            if (creep.room.name !== targetFlag.pos.roomName) {
                creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                // Azione nella stanza di destinazione
                // Ad esempio, attaccare o eseguire altre azioni
            }
        }
    }
};

module.exports = roleDrainer;