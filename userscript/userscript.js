// ==UserScript==
// @name         Fetch Alliances and Rooms
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fetch alliances and rooms data and log it to the console
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Configura la shard da cercare
    const shard = 'shard3';

    // Funzione per recuperare le stanze della shard
    async function fetchRooms() {
        const roomsUrl = `https://corsproxy.io/?https://www.leagueofautomatednations.com/map/${shard}/rooms.js`;
        const response = await fetch(roomsUrl);

        if (!response.ok) {
            throw new Error(`Errore nella richiesta delle stanze: ${response.status}`);
        }

        const roomsData = await response.json();
        return roomsData; // Assumiamo che la risposta sia un oggetto con stanze e proprietari
    }

    async function fetchAlliances() {
        try {
            const proxyUrl = `https://corsproxy.io/?https://www.leagueofautomatednations.com/map/${shard}/alliances.js`;

            const response = await fetch(proxyUrl);

            if (!response.ok) {
                throw new Error(`Errore nella richiesta delle alleanze: ${response.status}`);
            }

            const alliancesData = await response.json();
            const roomsData = await fetchRooms();

            const alliancesWithRooms = getAlliancesWithRooms(alliancesData, roomsData);

            console.log(`Alleanze e stanze occupate su ${shard}:`, alliancesWithRooms);
        } catch (error) {
            console.error('Errore nel fetching delle alleanze:', error);
        }
    }

    function getAlliancesWithRooms(alliancesData, roomsData) {
        const alliancesWithRooms = {};
        const roomOccupantsMap = {};

        // Costruire un oggetto mappa per stanze e proprietari
        for (const room in roomsData) {
            const owner = roomsData[room].owner; // Ottieni il proprietario della stanza
            if (owner) {
                roomOccupantsMap[owner] = roomOccupantsMap[owner] || [];
                roomOccupantsMap[owner].push(room);
            }
        }

        for (const allianceName in alliancesData) {
            const alliance = alliancesData[allianceName];
            const roomsForMembers = [];

            // Ricerca delle stanze per ogni membro dell'alleanza
            for (const member of alliance.members) {
                if (roomOccupantsMap[member]) {
                    roomsForMembers.push(...roomOccupantsMap[member]); // Aggiungi le stanze occupate dal membro
                }
            }

            alliancesWithRooms[allianceName] = {
                members: alliance.members,
                rooms: [...new Set(roomsForMembers)] // Usa Set per evitare duplicati
            };
        }

        return alliancesWithRooms;
    }

    // Esegui la funzione per fetchare le alleanze e stamparle in console
    fetchAlliances();
})();