/*
Copyright 2019 Jonah Snider

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const SentryCommand = require("../../structures/SentryCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class ServerInfoCommand extends SentryCommand {
  constructor(client) {
    super(client, {
      name: "server-info",
      aliases: ["guild-info"],
      group: "util",
      memberName: "server-info",
      description: "Get information about a server.",
      guildOnly: true,
      clientPermissions: ["EMBED_LINKS"],
      throttling: {
        usages: 2,
        duration: 6
      }
    });
  }

  exec(msg) {
    const [bots, humans] = msg.guild.members.partition(member => member.user.bot);
    const humanCount = humans.size;
    const botCount = bots.size;
    const totalCount = humanCount + botCount;

    const embed = new MessageEmbed({
      title: msg.guild.name,
      fields: [
        {
          name: "Members",
          value: `${totalCount} (${botCount} bots, ${humanCount} humans)`
        }
      ]
    });

    return msg.replyEmbed(embed);
  }
};
