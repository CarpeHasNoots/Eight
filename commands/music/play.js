const commando = require('discord.js-commando');
const discord = require('discord.js');
const ytdl = require('ytdl-core');
const oneLine = require('common-tags').oneLine;

module.exports = class AddPlayCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'play',
			group: 'music',
			memberName: 'play',
			description: 'I will join the voice channel and play music.',
			details: oneLine`
				I will join the voice channel and play music.
			`,
			examples: ['play'],
			args: [
				{
					key: 'video',
					prompt: 'What would you like me to play? (Youtube Links Only)',
					type: 'string',
					infinite: false
				}
			],
			guildOnly: true
		});
	}

	async run(msg, args) {
		if(msg.member.voiceChannel) {
			msg.member.voiceChannel.join()
				.then(connection => {
					let music = JSON.stringify(args.video);
					let musicFix = music.replace(/\"/g, "");
					msg.reply('I have successfully connected to the channel!');
					const stream = ytdl(musicFix, {filter: 'audioonly'});
					const dispatcher = connection.playStream(stream);
					dispatcher.on('end', () => voiceChannel.leave());
				})
				.catch(console.log);
		} else {
			msg.reply('You need to join a voice channel first!');
		}
	}
}