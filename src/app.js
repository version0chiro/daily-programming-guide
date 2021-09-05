const { Client, Intents } = require("discord.js");
const { token } = require("../config.json");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("pong");
  } else if (commandName === "server") {
    await interaction.reply(
      `Server name: ${interaction.guild.name}\n Total members: ${interaction.guild.memberCount}`
    );
  } else if (commandName === "user") {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
  }
});

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});
// Login to Discord with your client's token
client.login(token);
