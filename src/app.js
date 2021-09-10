const { Client, Intents } = require("discord.js");
const { type } = require("os");
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
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
client.on("message", (msg) => {
  if (msg.content.toLowerCase().substr(0, 10) === "#dsa give") {
    console.log(msg.content.substr(10));

    if (msg.content.length < 10) {
      max = Object.keys(data).length;
      console.log(max);
      min = 0;

      var randomNumber = randomInteger(min, max);
      console.log(randomNumber);
      console.log(data[randomNumber]);
      topic = data[randomNumber].topic;
      statement = data[randomNumber].statement;
      web_link = data[randomNumber].link;

      msg.reply(
        `The Question for *today* is from the topic ${topic} \nThe Statement is ${statement} \nThe link to the problem is ${web_link}`
      );
    }

    if (msg.content.length > 10) {
      if (msg.content.substr(10, 6) === "-topic") {
        console.log(msg.content.substr(17));
        topic = msg.content.substr(17);
        console.log(topic);
        console.log(Object.keys(data));

        let ans = {};

        for (let i = 0; i < Object.keys(data).length; i++) {
          if (data[i].topic.toLowerCase() === topic.toLowerCase()) {
            ans[i] = data[i];
          }
        }
        max = Object.keys(ans)[Object.keys(ans).length - 1];
        min = Object.keys(ans)[0];
        // console.log(Object.keys(ans).length);
        if (Object.keys(ans).length === 0) {
          msg.reply("No such topic exists");
        } else {
          var randomNumber = randomInteger(min, max);
          console.log(max);
          console.log(min);

          console.log(randomNumber);
          console.log(ans[randomNumber]);
          topic = ans[randomNumber].topic;
          statement = ans[randomNumber].statement;
          web_link = ans[randomNumber].link;

          msg.reply(
            `The Question for *today* is from the topic ${topic} \nThe Statement is ${statement} \nThe link to the problem is ${web_link}`
          );
        }

        // let newJson = data.filter(
        //   (item) => item.topic.toLowerCase() === topic.toLowerCase()
        // );
        // max = Object.keys(newJson).length;
        // min = 0;
        // var randomNumber = randomInteger(min, max);

        // topic = newJson[randomNumber].topic;
        // statement = newJson[randomNumber].statement;
        // web_link = newJson[randomNumber].link;

        // msg.reply(
        //   `The Question for *today* is from the topic ${topic} \nThe Statement is ${statement} \nThe link to the problem is ${web_link}`
        // );
      }
    }
  }
});
// Login to Discord with your client's token
client.login(token);
