const linkAssociations = [
    { from: '66ed5d56f1409b56d68faeac', to: '66ed30939331332979e53f14' } //,
   // { from: 'id_link3', to: 'id_link4' },
    // Aggiungi altre associazioni qui
];

// Funzione per controllare se un link ha raggiunto il threshold di energia
function isFull(link) {
    const threshold = 100; // Definisci il threshold di energia
    return link.energy >= threshold;
}

// Funzione per trasferire energia dal link pieno al link associato
function transferEnergy(fromLink, toLink) {
    if (isFull(fromLink)) {
        const energyToTransfer = fromLink.energy;
        fromLink.energy = 0;
        toLink.energy += energyToTransfer;
        console.log(`Trasferita energia da ${fromLink.id} a ${toLink.id}`);
    }
}

// Esegui il controllo e il trasferimento di energia per ogni associazione
linkAssociations.forEach(association => {
    const fromLink = Game.getObjectById(association.from);
    const toLink = Game.getObjectById(association.to);
    transferEnergy(fromLink, toLink);
});