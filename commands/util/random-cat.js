// Copyright 2018 Jonah Snider

const { Command } = require('discord.js-commando');
const rp = require('request-promise');
const replaceall = require('replaceall');

module.exports = class RandomCatImageCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'random-cat-image',
			group: 'util',
			memberName: 'random-cat-image',
			description: 'Get a picture of a random cat',
			aliases: ['random-cat', 'cat-image', 'cat'],
			examples: ['cat-image', 'random-cat'],
			throttling: {
				usages: 1,
				duration: 5
			}
		});
	}

	async run(msg) {
		try {
			msg.channel.startTyping();

			const options = {
				uri: 'http://random.cat/meow.php',
				json: true
			};
			const result = await rp(options);

			if (!result.file) {
				return msg.reply('❌ There was an error with the API we use (http://random.cat).');
			}

			return msg.replyEmbed({
				author: {
					name: 'random.cat',
					iconURL: 'http://random.cat/favicon.ico',
					url: 'http://random.cat'
				},
				image: { url: result.file }
			});
		} finally {
			msg.channel.stopTyping();
		}

	}
};
