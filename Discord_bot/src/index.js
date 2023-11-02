const { Client, IntentsBitField, messageLink, EmbedBuilder, Embed } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const { channel } = require('diagnostics_channel');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,
    ],
})

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online!`);
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        interaction.reply(`Pong! Server responded in ${client.ws.ping}ms`);

        console.log(`${client.ws.ping}ms`)
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

        // returning the values in an embed
        const p1Embed = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle('Thank you for submitting your vetoed maps!')
        .setAuthor({ name: 'Player 1 vetoes' })
        .addFields(
            { name: 'First map', value: p1map1.value },
            { name: 'Second map', value: p1map2.value },
            { name: 'Third map', value: p1map3.value },
            { name: 'Fourth map', value: p1map4.value },
            { name: 'Fifth map', value: p1map5.value },
        )
        .setImage('https://i.imgur.com/VcVncbd.jpg')

        interaction.reply({ embeds: [p1Embed] });
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

        // returning the values in an embed
        const p2Embed = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle('Thank you for submitting your vetoed maps!')
        .setAuthor({ name: 'Player 2 vetoes' })
        .addFields(
            { name: 'First map', value: p2map1.value },
            { name: 'Second map', value: p2map2.value },
            { name: 'Third map', value: p2map3.value },
            { name: 'Fourth map', value: p2map4.value },
            { name: 'Fifth map', value: p2map5.value },
        )
        .setImage('https://i.imgur.com/j3niOwu.gif')

        interaction.reply({ embeds: [p2Embed] });
    };

    if (interaction.commandName === 'testinghaha') {
        const testEmbed = new EmbedBuilder()
        .setColor(0xFF00FF)
        .setTitle('Portal Gun')
        .setAuthor({ name: 'Chapter 1' })
        .setImage('https://i.imgur.com/8iMNzgU.jpg')

        const test2Embed = new EmbedBuilder()
        .setColor(0xFF00FF)
        .setTitle('Smooth Jazz')
        .setAuthor({ name: 'Chapter 1' })
        .setImage('https://i.imgur.com/8iMNzgU.jpg')

        interaction.reply('.')

        interaction.channel.send({ embeds: [testEmbed] });
        interaction.channel.send({ embeds: [test2Embed] });
        interaction.react
    }
});

client.login(token);