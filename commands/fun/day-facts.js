// Copyright 2018 Jonah Snider

const { Command } = require('discord.js-commando');
const rp = require('request-promise');
const winston = require('winston');

module.exports = class DayFactsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'day-facts',
			group: 'fun',
			memberName: 'day-facts',
			description: 'Get a fact about a day',
			details: 'Not specifying the day to lookup will give you a random fact',
			aliases: ['day-fact', 'random-day-facts', 'random-day-fact'],
			examples: ['day-facts', 'day-facts 14'],
			args: [{
				key: 'day',
				prompt: 'What day do you want to get facts for?',
				type: 'integer',
				min: 1,
				max: 31,
				default: 'random'
			}],
			throttling: {
				usages: 2,
				duration: 6
			}
		});
	}

	async run(msg, { day }) {
		try {
			msg.channel.startTyping();

			const options = {
				uri: `http://numbersapi.com/${day}/date`
			};

			const result = await rp(options).catch(error => {
				winston.error('[COMMAND](DATE-FACTS)', error.stack);
				return msg.reply('❌ There was an error with the API we use (http://numbersapi.com)');
			});

			return msg.reply(result);
		} finally {
			msg.channel.stopTyping();
		}
	}
};
