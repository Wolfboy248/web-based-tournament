const { Client, IntentsBitField, messageLink } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');



const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
})

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online!`);
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        interaction.reply('pong');
    };

    if (interaction.commandName === 'p1veto') {
        const p1map1 = interaction.options.get('p1map1');
        const p1map2 = interaction.options.get('p1map2');
        const p1map3 = interaction.options.get('p1map3');
        const p1map4 = interaction.options.get('p1map4');
        const p1map5 = interaction.options.get('p1map5');

        console.log(p1map1.value);
        console.log(p1map2.value);
        console.log(p1map3.value);
        console.log(p1map4.value);
        console.log(p1map5.value);

        interaction.reply('Thank you for submitting your vetoed maps!');

        // player 1 map data
        let p1MapData = {
            map1: p1map1.value,
            map2: p1map2.value,
            map3: p1map3.value,
            map4: p1map4.value,
            map5: p1map5.value
        }

        const p1VetoData = JSON.stringify(p1MapData);

        // writing the json file
        fs.writeFile("./src/p1vetoes.json", p1VetoData, 'utf-8', err => {
            if (err) {
                return console.log(err);
            } else {
                console.log('///////////////// The file was saved! /////////////////');
                console.log('////// Player 1 has submitted their vetoed maps! //////');
            }
        })
    };

    if (interaction.commandName === 'p2veto') {
        const p2map1 = interaction.options.get('p2map1');
        const p2map2 = interaction.options.get('p2map2');
        const p2map3 = interaction.options.get('p2map3');
        const p2map4 = interaction.options.get('p2map4');
        const p2map5 = interaction.options.get('p2map5');

        console.log(p2map1.value);
        console.log(p2map2.value);
        console.log(p2map3.value);
        console.log(p2map4.value);
        console.log(p2map5.value);

        interaction.reply('Thank you for submitting your vetoed maps!');

        // player 1 map data
        let p2MapData = {
            map1: p2map1.value,
            map2: p2map2.value,
            map3: p2map3.value,
            map4: p2map4.value,
            map5: p2map5.value
        }

        const p2VetoData = JSON.stringify(p2MapData);

        // writing the json file
        fs.writeFile("./src/p2vetoes.json", p2VetoData, 'utf-8', err => {
            if (err) {
                return console.log(err);
            } else {
                console.log('///////////////// The file was saved! /////////////////');
                console.log('////// Player 2 has submitted their vetoed maps! //////');
            }
        })
    };
});

client.login(token);