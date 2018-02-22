// Copyright 2018 Jonah Snider

const { Command } = require('discord.js-commando');
const rules = require('../../rules');
const diceAPI = require('../../providers/diceAPI');

module.exports = class CashOutCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cash-out',
			group: 'economy',
			memberName: 'cash-out',
			description: 'Cash out money from the house.',
			details: 'Only the bot owner(s) may use this command.',
			examples: ['cash-out 500'],
			args: [
				{
					key: 'amount',
					prompt: 'How many dots do you want to remove?',
					type: 'float',
					min: rules.minWager,
					parse: amount => diceAPI.simpleFormat(amount)
				}
			],
			throttling: {
				usages: 2,
				duration: 30
			},
			ownerOnly: true
		});
	}

	async run(msg, { amount }) {
		try {
			msg.channel.startTyping();

			const beforeTransferHouseBalance = await diceAPI.getBalance(this.client.user.id);

			// Amount checking
			if (amount > beforeTransferHouseBalance) {
				return msg.reply(`❌ Your amount must be less than \`${beforeTransferHouseBalance}\` ${rules.currencyPlural}. ${this.client.user} doesn't have that much.`);
			}

			// Round to whole number
			amount = Math.round(amount);

			// Remove dots from the house
			diceAPI.decreaseBalance(this.client.user.id, amount);

			// Add dots to author
			diceAPI.increaseBalance(msg.author.id, amount);

			// React with the success emoji
			msg.react('406965554629574658');
			return null;
		} finally {
			msg.channel.stopTyping();
		}
	}
};
