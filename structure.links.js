const linkAssociations = [
    { from: '66ed30939331332979e53f14', to: '66ed5d56f1409b56d68faeac' },
    { from: '673f68371f9e439eeaffba95', to: '673ff81bd42aeefde252f954' }
    // Aggiungi altre associazioni qui
];

// Funzione per controllare se un link ha raggiunto il threshold di energia
function isFull(link) {
    const threshold = 300; // Definisci il threshold di energia
    return link.energy >= threshold;
}

// Funzione per trasferire energia dal link pieno al link associato
function transferEnergy(fromLink, toLink) {
    if (isFull(fromLink)) {
        const result = fromLink.transferEnergy(toLink);
        if (result === OK) {
            console.log(`Trasferita energia da ${fromLink.id} a ${toLink.id}`);
        } else {
            console.log(`Errore nel trasferimento di energia da ${fromLink.id} a ${toLink.id}: ${result}`);
        }
    }
}
// Esegui il controllo e il trasferimento di energia per ogni associazione
linkAssociations.forEach(association => {
    const fromLink = Game.getObjectById(association.from);
    const toLink = Game.getObjectById(association.to);
    transferEnergy(fromLink, toLink);
});

module.exports = {
    linkAssociations,
    transferEnergy
};