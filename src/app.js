const { Client, Intents } = require("discord.js");
const { token } = require("../config.json");
const data = require("../data/450JSON.json");

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

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
    await interaction.reply(
      `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
    );
  }
});
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
client.on("message", (msg) => {
  if (msg.content === "ping") {
    max = 444;
    min = 0;

    var randomNumber = randomInteger(min, max);
    console.log(randomNumber);
    console.log(data[randomNumber]);
    topic = data[randomNumber].topic;
    statement = data[randomNumber].statement;
    web_link = data[randomNumber].link;

    msg.reply(
      ` The Question for today is  from the topic ${topic} \n The Statement is ${statement} \n The link to the problem is ${web_link}`
    );
  }
});
// Login to Discord with your client's token
client.login(token);
