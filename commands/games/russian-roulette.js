// Copyright 2018 Jonah Snider

const { Command } = require('discord.js-commando');

module.exports = class RussianRouletteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'russian-roulette',
      group: 'games',
      memberName: 'russian-roulette',
      description: 'Play a game of Russian roulette.',
      throttling: {
        usages: 1,
        duration: 2
      }
    });
  }

  run(msg) {
    // Round numbers
    const randomNumber = Math.floor(Math.random() * 6);

    if (randomNumber === 0) {
      return msg.reply('💥 *Bang.* You lose.');
    }

    return msg.reply('🔫 *Click.* You survived.');
  }
};
