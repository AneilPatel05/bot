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
			examples: ['invite']
		});
	}

	run(msg) {
		return msg.reply(`👋 https://discord.now.sh/${this.client.user.id}`);
	}
};
