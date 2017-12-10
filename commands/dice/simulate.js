const {
    Command
} = require("discord.js-commando");
const rules = require("../../rules");
const diceAPI = require("../../diceAPI");

module.exports = class SimulateGameCommand extends Command {
    constructor(client) {
        super(client, {
            name: "simulate",
            group: "dice",
            memberName: "simulate",
            description: "Simulate a game of dice",
            aliases: ["practice", "practice-game", "sim", "simulate-game", "sim-game", "simulate-dice", "sim-dice"],
            examples: ["simulate 250 4"],
            args: [{
                key: "wager",
                prompt: "How much do you want to wager?",
                type: "string",
                validate: wager => {
                    if (wager < rules["minWager"]) {
                        return `❌ Your wager must be at least \`${rules["minWager"]}\` ${rules[currencyPlural]}.`;
                    }
                    return true;
                },
                // Convert string to number and round it
                parse: wagerString => Math.round(parseInt(wagerString))
            }, {
                key: "multiplier",
                prompt: "How much do you want to multiply your wager by?",
                type: "string",
                validate: multiplier => {
                    if (multiplier < parseInt(rules["minMultiplier"].toFixed(2))) {
                        return `❌ Your target multiplier must be at least \`${rules["minMultiplier"]}\`.`;
                    } else if (multiplier > parseInt(rules["maxMultiplier"].toFixed(2))) {
                        return `❌ Your target multiplier must be less than \`${rules["maxMultiplier"]}\`.`;
                    }
                    return true;
                },
                /* Round multiplier to second decimal place
                Convert multiplier string to int, and convert toFixed string into int */
                parse: multiplierString => parseInt(parseInt(multiplierString).toFixed(2))
            }],
            throttling: {
                usages: 1,
                duration: 1
            },

        });
    }

    run(msg, {
        wager,
        multiplier
    }) {
        // Round multiplier to second decimal place
        // Convert multiplier string to int, and convert toFixed string into int
        multiplier = parseInt(parseInt(multiplier).toFixed(2));

        // Round wager to whole number
        wager = Math.round(parseInt(wager));

        /*// Multiplier checking
        if (multiplier < parseInt(rules["minMultiplier"].toFixed(2))) {
            return msg.reply(`❌ Your target multiplier must be at least \`${rules["minMultiplier"]}\`.`);
        } else if (multiplier > parseInt(rules["maxMultiplier"].toFixed(2))) {
            return msg.reply(`❌ Your target multiplier must be less than \`${rules["maxMultiplier"]}\`.`);
        }

        // Wager checking
        if (wager < rules["minWager"]) {
            return msg.reply(`❌ Your wager must be at least \`${rules["minWager"]}\` dots.`);
        }*/

        // Round numbers to second decimal place
        let randomNumber = parseInt((Math.random() * 100).toFixed(2));
        // Get boolean if the random number is less than the multiplier
        let success = (randomNumber < diceAPI.winPercentage(multiplier));

        // Variables for later use in embed
        let color;
        let result;

        if (success === false) {
            // Red color and loss message
            color = 0xf44334;
            result = `You would have lost \`${wager}\` dots.`;
        } else {
            // Green color and win message
            color = 0x4caf50;
            result = `Your profit would have been \`${(wager * multiplier) - wager}\` dots!`;
        }

        msg.channel.send({
            embed: {
                "title": `__**${wager} 🇽 ${multiplier}**__`,
                "color": color,
                "fields": [{
                    "name": "🎲 Result",
                    "value": result
                }, {
                    "name": "🔢 Random Number Result",
                    "value": `${randomNumber}`,
                    "inline": true
                },
                {
                    "name": "📊 Win Chance",
                    "value": `${diceAPI.winPercentage(multiplier)}%`,
                    "inline": true
                },
                {
                    "name": "💵 Wager",
                    "value": `${wager}`,
                    "inline": true
                },
                {
                    "name": "🇽 Multiplier",
                    "value": `${multiplier}`,
                    "inline": true
                }
                ]
            }
        });
    }
};