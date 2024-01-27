require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "vetos",
    description: "test",
    options: [
      {
        name: "p1",
        description: "p1",
        required: true,
        type: ApplicationCommandOptionType.Mentionable,
      },
      {
        name: "p2",
        description: "p2",
        required: true,
        type: ApplicationCommandOptionType.Mentionable,
      },
    ],
  },
  {
    name: "end_vetos",
    description: "end the vetos",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
(async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands,
      }
    );
    console.log("Slash commands registered");
  } catch (error) {
    console.log(`There was an error : ${error}`);
  }
})();
