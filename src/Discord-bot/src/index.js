require("dotenv").config();
require("path");
var fs = require("fs");
const maplist = require("../../maps/maplist.json");
const {
  Client,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
  Embed,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Reaction],
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let maps = [];
Object.keys(maplist).forEach((key) => {
  maps.push(key);
});
maps.pop();
let msgs = [];
let msgsId = [];
let p1 = "";
let p2 = "";
let p1vetos = [];
let p2vetos = [];
let veto = 5;
let canVeto = false;
let vetosId = "1189995565333872691";

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is ready`);
});

client.on("messageReactionAdd", (react, user) => {
  if (user.bot) return;
  if (!msgsId.includes(react.message.id)) return;
  if (react.emoji.name != "❌" || !canVeto) {
    react.message.reactions.resolve(react).users.remove(user);
    return;
  }
  const url = react.message.embeds[0].image.url;
  const mapname = url.substring(87, url.length - 4);
  if (user.id === p1.value) {
    if (p1vetos.length == veto) {
      react.message.reactions.resolve(react).users.remove(user);
      return;
    }
    p1vetos.push(mapname);
  } else if (user.id === p2.value) {
    if (p2vetos.length == veto) {
      react.message.reactions.resolve(react).users.remove(user);
      return;
    }
    p2vetos.push(mapname);
  } else {
    react.message.reactions.resolve(react).users.remove(user);
  }
});

client.on("messageReactionRemove", (react, user) => {
  if (user.bot) return;
  if (!msgsId.includes(react.message.id)) return;
  if (react.emoji.name != "❌") return;
  const url = react.message.embeds[0].image.url;
  const mapname = url.substring(87, url.length - 4);
  if (user.id === p1.value && p1vetos.includes(mapname)) {
    p1vetos.splice(p1vetos.indexOf(mapname), 1);
  } else if (user.id === p2.value && p2vetos.includes(mapname)) {
    p2vetos.splice(p2vetos.indexOf(mapname), 1);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "vetos") {
    p1 = interaction.options.get("p1");
    p2 = interaction.options.get("p2");
    interaction.reply({
      content: "Got players",
      ephemeral: true,
    });
    msgs = [];
    msgsId = [];
    const chn = interaction.channel;
    let doPing = true;
    await maps.forEach(async (map) => {
      const embed = new EmbedBuilder()
        .setColor(0xff00ff)
        .setTitle(maplist[map][0])
        .setImage(
          `https://raw.githubusercontent.com/Wolfboy248/web-based-tournament/main/maps/images/ch${maplist[map][1]}/${map}.jpg`
        )
        .setAuthor({
          name: `Chapter ${maplist[map][1]} - ${
            maplist.sp[maplist[map][1] - 1]
          }`,
        });
      //.setAuthor({ name: maplist.sp[maplist[map][1]] });
      const msg = await chn.send({ embeds: [embed] });

      msgs.push(msg);
      msgsId.push(msg.id);
      await msg.react("❌");
      if (msgs.length == maps.length) {
        const vetorole = await p1.member.guild.roles.fetch(vetosId);
        p1.member.roles.add(vetorole);
        p2.member.roles.add(vetorole);
        canVeto = true;
        if (doPing) {
          const ping = await chn.send({
            content: `Submit your Vetos!\n<@${p1.user.id}><@${p2.user.id}>`,
          });
          msgs.push(ping);
          doPing = false;
        }
      }
    });
    //console.log(p1.member.guild.roles);
  } else if (interaction.commandName === "end_vetos") {
    canVeto = false;
    const vetos = {
      p1vetos: p1vetos,
      p2vetos: p2vetos,
    };
    fs.writeFileSync("../maps/vetos.json", JSON.stringify(vetos));
    interaction.reply({
      content: "Submitting vetos have ended",
      ephemeral: true,
    });
    msgs[0].channel.bulkDelete(msgs);
    const vetorole = await p1.member.guild.roles.fetch(vetosId);
    p1.member.roles.remove(vetorole);
    p2.member.roles.remove(vetorole);
  }
});

client.login(process.env.TOKEN);
