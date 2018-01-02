const {
    Command
} = require("discord.js-commando");
const {
    RichEmbed
} = require('discord.js');
const diceAPI = require("../../diceAPI");
const rules = require("../../rules");
const winston = require("winston");

module.exports = class LeaderboardCommand extends Command {
    constructor(client) {
        super(client, {
            name: "leaderboard",
            group: "util",
            memberName: "leaderboard",
            description: `Generates an invite link for <@${rules["houseID"]}>`,
            aliases: ["top-10", "top-ten", "chart", "top"],
            examples: ["leaderboard"],
        });
    }

    async run(msg) {
        winston.level = "debug";

        const leaderboardArray = await diceAPI.leaderboard();

        winston.verbose(`Contents of leaderboard array: ${leaderboardArray}`);
        winston.verbose(`Leaderboard array length: ${leaderboardArray.length}`);

        // Check if there are enough users to populate the embed
        if (leaderboardArray.length < 10) {
            return msg.reply("❌ There are less than 10 users total.");
        }

        let index = 0;

        for (let index = 0; index < leaderboardArray.length; index++) {
            winston.debug(`#${index + 1} ---------------------`);
            winston.debug(`Name #${index + 1}: ${this.client.users.get(leaderboardArray[index]["id"]).tag}`);
            winston.debug(`Balance #${index + 1}: ${leaderboardArray[index]["balance"]} ${rules["currencyPlural"]}`);
        }

        return msg.reply({
            embed: {
                "title": "Top 10 Leaderboard",
                "fields": [{
                        "name": this.client.users.get(leaderboardArray[0]["id"]).tag,
                        "value": `${leaderboardArray[0]["balance"]} ${rules["currencyPlural"]}`
                    },
                    {
                        "name": this.client.users.get(leaderboardArray[1]["id"]).tag,
                        "value": `${leaderboardArray[1]["balance"]} ${rules["currencyPlural"]}`
                    },
                    {
                        "name": this.client.users.get(leaderboardArray[2]["id"]).tag,
                        "value": `${leaderboardArray[2]["balance"]} ${rules["currencyPlural"]}`
                    },
                    {
                        "name": this.client.users.get(leaderboardArray[3]["id"]).tag,
                        "value": `${leaderboardArray[3]["balance"]} ${rules["currencyPlural"]}`
                    },
                    {
                        "name": this.client.users.get(leaderboardArray[4]["id"]).tag,
                        "value": `${leaderboardArray[4]["balance"]} ${rules["currencyPlural"]}`
                    },
                    {
                        "name": this.client.users.get(leaderboardArray[5]["id"]).tag,
                        "value": `${leaderboardArray[5]["balance"]} ${rules["currencyPlural"]}`
                    },
                    {
                        "name": this.client.users.get(leaderboardArray[6]["id"]).tag,
                        "value": `${leaderboardArray[6]["balance"]} ${rules["currencyPlural"]}`
                    },
                    {
                        "name": this.client.users.get(leaderboardArray[7]["id"]).tag,
                        "value": `${leaderboardArray[7]["balance"]} ${rules["currencyPlural"]}`
                    },
                    {
                        "name": this.client.users.get(leaderboardArray[8]["id"]).tag,
                        "value": `${leaderboardArray[8]["balance"]} ${rules["currencyPlural"]}`
                    },
                    {
                        "name": this.client.users.get(leaderboardArray[9]["id"]).tag,
                        "value": `${leaderboardArray[9]["balance"]} ${rules["currencyPlural"]}`
                    }
                ]
            }
        });
    }
};