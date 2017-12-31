const {
    Command
} = require("discord.js-commando");
const rules = require("../../rules");
const diceAPI = require("../../diceAPI");

module.exports = class TransferDots extends Command {
    constructor(client) {
        super(client, {
            name: "transfer",
            group: "economy",
            memberName: "transfer",
            description: "Tranfser dots to another user",
            aliases: ["send", "pay"],
            examples: ["transfer 500 @Dice"],
            args: [{
                key: "amount",
                prompt: "How many dots do you want to transfer?",
                type: "string"
            }, {
                key: "user",
                prompt: "Who do you want to transfer dots to?",
                type: "user"
            }],
            throttling: {
                usages: 1,
                duration: 30
            }
        });
    }

    async run(msg, {
        user,
        amount
    }) {
        // Amount checking
        if (amount < rules["minWager"]) {
            return msg.reply(`❌ Your amount must be at least \`${rules["minWager"]}\` ${rules["currencyPlural"]}.`);
        } else if (amount > await diceAPI.getBalance(msg.author.id)) {
            return msg.reply(`❌ You need to have at least \`${amount}\` ${rules["currencyPlural"]}. Your balance is \`${await diceAPI.getBalance(msg.author.id)}\`.`);
        } else if (isNaN(amount)) {
            return msg.reply(`❌ \`${amount}\` is not a valid number.`);
        }

        // No sending money to yourself
        if (msg.author.id === user.id) {
            return msg.reply("❌ You can't send money to yourself.");
        }

        // No sending money to bots
        if (user.bot === true && user.id !== rules["houseID"]) {
            return msg.reply("❌ You can't send dots to bots.");
        }

        // Format
        amount = diceAPI.simpleStringFormat(amount);

        // Remove dots from sender
        await diceAPI.decreaseBalance(msg.author.id, amount);

        // Add dots to receiver
        await diceAPI.increaseBalance(user.id, amount);

        // Tell the sender
        return msg.reply(`📤 Transferred \`${amount}\` dots to <@${user.id}>. You now have a balance of \`${await diceAPI.getBalance(msg.author.id)}\` dots.`);
    }
};