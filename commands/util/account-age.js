/*
Copyright 2018 Jonah Snider

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

const moment = require('moment');
const { Command } = require('discord.js-commando');

module.exports = class AccountAgeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'account-age',
      group: 'util',
      memberName: 'account-age',
      description: 'Check when an account was created.',
      aliases: ['age', 'account-created'],
      examples: ['account-age', 'account-age @Dice'],
      args: [{
        key: 'user',
        prompt: 'Who do you want to check?',
        type: 'user',
        default: ''
      }],
      throttling: {
        usages: 2,
        duration: 4
      }
    });
  }

  run(msg, { user }) {
    const target = user || msg.author;
    // eslint-disable-next-line max-len
    return msg.reply(`⏰ ${moment.duration(msg.createdAt - target.createdAt).humanize()} old. Created on ${target.createdAt}`);
  }
};
