// Copyright 2018 Jonah Snider

const { Command } = require('discord.js-commando');

module.exports = class GetSelfRolesCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'get-self-roles',
			aliases: ['self-role-get', 'self-roles-get', 'get-self-role'],
			group: 'util',
			memberName: 'get-self-roles',
			description: 'Get a self-assigned role from this server',
			examples: ['get-self-roles @PUBG', 'get-self-roles Artists'],
			clientPermissions: ['MANAGE_ROLES'],
			guildOnly: true,
			args: [{
				key: 'role',
				prompt: 'What role do you want to get?',
				type: 'role'
			}],
			throttling: {
				usages: 2,
				duration: 4
			}
		});
	}

	async run(msg, { role }) {
		try {
			msg.channel.startTyping();

			// Get all of this guild's selfroles
			const selfRoles = await this.client.provider.get(msg.guild, 'selfRoles', []);

			// Check if the role isn't a self role
			if (!selfRoles.includes(role.id)) {
				return msg.reply('❌ That role isn\'t a self role.');
			}

			if (msg.member.roles.has(role.id)) {
				return msg.reply('❌ You already have that role.');
			}

			await msg.member.roles.add(role.id, 'Selfrole');
			return msg.reply(`Gave you the '${role.name}' role.`);
		} finally {
			msg.channel.stopTyping();
		}
	}
};
