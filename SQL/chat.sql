CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender INTEGER,
    recipient INTEGER NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stat TEXT DEFAULT "requested",

    CHECK (stat IN ("requested", "sent", "received", "seen")),
    FOREIGN KEY (sender) REFERENCES players(player_id) ON DELETE CASCADE,
    FOREIGN KEY (recipient) REFERENCES players(player_id) ON DELETE CASCADE
);

-- mock data

INSERT OR IGNORE INTO messages (sender, recipient, content) VALUES
(1, 2, "Salut Tarik, t’as avancé sur les tests auto ?"),
(2, 1, "Oui, j’ai terminé le scénario login. Je t’envoie ça."),
(3, 4, "Salut Mustafa, tu peux checker les logs du serveur ?"),
(4, 3, "Je suis dessus, je te fais un retour dans 10 min."),
(2, 3, "Tu peux ajouter une règle firewall pour Jenkins ?"),
(4, 1, "Bonne nouvelle, le déploiement est passé sans erreur."),
(3, 2, "Je viens de redémarrer le service nginx, c’est bon maintenant.");
