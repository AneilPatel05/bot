// Copyright 2018 Jonah Snider

const { Command } = require('discord.js-commando');
const rules = require('../../rules');

module.exports = class InviteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			group: 'util',
			memberName: 'invite',
			description: `An invite link for <@${rules.houseID}>`,
			throttling: {
				usages: 1,
				duration: 3
			}
		});
	}

	run(msg) {
		return msg.reply(`👋 https://discord.now.sh/${this.client.user.id}?p8`);
	}
};
