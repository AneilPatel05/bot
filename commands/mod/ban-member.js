// Copyright 2018 Jonah Snider

const { Command } = require('discord.js-commando');

module.exports = class BanMemberCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ban-member',
			aliases: ['ban-user', 'ban'],
			group: 'mod',
			memberName: 'ban-member',
			description: 'Ban a server member',
			examples: ['ban Zoop', 'ban Zoop 7 Spamming messages'],
			clientPermissions: ['BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS'],
			guildOnly: true,
			throttling: {
				usages: 3,
				duration: 6
			},
			args: [{
				key: 'member',
				prompt: 'Which member do you want to ban?',
				type: 'member',
				label: 'server member'
			}, {
				key: 'days',
				prompt: 'How many days of messages do you want to delete?',
				type: 'integer',
				label: 'days of messages to delete',
				default: 0,
				min: 0
			}, {
				key: 'reason',
				prompt: 'What is the reason for banning this member?',
				type: 'string',
				label: 'reason for ban',
				default: '',
				validate: reason => {
					if (reason.length > 400) {
						return `Your reason was ${reason.length} characters long. Please limit your reason to 400 characters.`;
					} else {
						return true;
					}
				}
			}]
		});
	}

	async run(msg, { member, days, reason }) {
		try {
			msg.channel.startTyping();
			if (reason) {
				reason = `${reason} - Requested by ${msg.author.tag}`;
			} else {
				reason = `Requested by ${msg.author.tag}`;
			}

			if (member.bannable) {
				// Member can be banned, and days specified
				await member.ban({ reason: reason, days: days });
				// React with the success emoji
				msg.react('406965554629574658');
				return null;
			} else {
				return msg.reply('❌ I can\'t ban that member');
			}
		} finally {
			msg.channel.stopTyping();
		}
	}
};
