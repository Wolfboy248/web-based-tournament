const { REST, Routes, ApplicationCommandOptionType, ApplicationRoleConnectionMetadata } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    {
        name: 'ping',
        description: 'Replies with pong!',
    },

    {
        name: 'p1veto',
        description: 'Enter the vetoes for player 1!',
        options: [
            {
                name: 'p1map1',
                description: "Enter the vetoes for player 1! Please type out the map name WITHOUT spelling mistakes.",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'p1map2',
                description: "Player 1's second map choice to be vetoed!",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'p1map3',
                description: "Player 1's third map choice to be vetoed!",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'p1map4',
                description: "Player 1's fourth map choice to be vetoed!",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'p1map5',
                description: "Player 1's fifth map choice to be vetoed!",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },

    {
        name: 'p2veto',
        description: 'Enter the vetoes for player 2! Please type out the map name WITHOUT spelling mistakes.',
        options: [
            {
                name: 'p2map1',
                description: "Player 2's first map choice to be vetoed!",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'p2map2',
                description: "Player 2's second map choice to be vetoed!",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'p2map3',
                description: "Player 2's third map choice to be vetoed!",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'p2map4',
                description: "Player 2's fourth map choice to be vetoed!",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'p2map5',
                description: "Player 2's fifth map choice to be vetoed!",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },

    {
        name: 'testinghaha',
        description: 'this is a test',
    },
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {

        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        )

        console.log('Slash commands were registered successfully');

    } catch (error) {
        console.log(`There was an error: ${error}`)
    }
})();