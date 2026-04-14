// ==UserScript==
// @name         La Cale - Menus en français
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Remplace le jargon pirate des menus par des termes compréhensibles
// @match        https://la-cale.space/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const replacements = {
        // Titres des menus principaux
        'Naviguer':              'Torrents',
        'Équipage':              'Communauté',
        'Économie':              'Points Bonus',

        // Sous-menus de "Naviguer"
        'La Boussole':                              'Parcourir',
        'Basse de données de toutes les cargaisons': 'Base de données de toutes les cargaisons',
        // 'Nouveautés' reste inchangé
        'Toutes Voiles Dehors':  'Les plus partagés',
        'Légendes':              'Les plus téléchargés',
        'Vaisseaux Fantômes':    'En manque de sources',
        'Primes':                'Requêtes',

        // Sous-menus de "Équipage"
        'Le Mess':               'Forums',
        'Pigeonnier':            'Messagerie',
        'Le Trésor':             'Don',
        'Les Confréries':        'Teams Internes',
        "L'État-Major":          'Staff',

        // Sous-menus de "Économie"
        'Marché Noir':           'Marché',
        'Pots Communs':          'Pot Commun',
        // 'Casino' reste inchangé

        // Menu profil (avatar)
        'Mes Cargaisons':        'Mes Uploads',
        'Mes Pillages':          'Mes Téléchargements',
        'Mon Économie':          'Mes Points Bonus',
        'Ma Discipline':         'Hit&Run et Seedtime',
        'Débarquer':             'Déconnexion',
    };

    function applyReplacements(root) {
        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        let node;
        while ((node = walker.nextNode())) {
            const trimmed = node.nodeValue.trim();
            if (Object.prototype.hasOwnProperty.call(replacements, trimmed)) {
                node.nodeValue = node.nodeValue.replace(trimmed, replacements[trimmed]);
            }
        }
    }

    // Application initiale
    applyReplacements(document.body);

    // Ré-application à chaque changement de DOM (site SPA / React)
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const added of mutation.addedNodes) {
                if (added.nodeType === Node.ELEMENT_NODE) {
                    applyReplacements(added);
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
