const commando = require('discord.js-commando');
const discord = require('discord.js');
const oneLine = require('common-tags').oneLine;

module.exports = class AddLeaveCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'leave',
			group: 'music',
			memberName: 'leave',
			description: 'I will leave the voice channel and stop playing music.',
			details: oneLine`
				I will leave the voice channel and stop playing music.
			`,
			examples: ['leave'],
			guildOnly: true
		});
	}

	async run(msg, args) {
		if(msg.guild.me.voiceChannel) {
			msg.guild.me.voiceChannel.leave()
		} else {
			msg.reply('I\'m not in a voice channel.');
		}
	}
}