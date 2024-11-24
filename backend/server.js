const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const usersFile = './users.json';

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const newUser = req.body;

    if (!newUser.email || !newUser.password || !newUser.name) {
        return res.status(400).json({ error: 'Champs requis manquants.' });
    }

    fs.readFile(usersFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur de lecture du fichier.' });
        }

        let users = JSON.parse(data);

        if (users.some(user => user.email === newUser.email)) {
            return res.status(400).json({ error: 'Utilisateur déjà existant.' });
        }

        users.push(newUser);

        fs.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur lors de l\'écriture du fichier.' });
            }
            res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
