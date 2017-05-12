const commando = require('discord.js-commando');
const discord = require('discord.js');
const oneLine = require('common-tags').oneLine;

module.exports = class AddBallCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'wiki',
			group: 'fun',
			memberName: 'wiki',
			description: 'Search something on the wiki',
			details: oneLine`
				Search something on the wiki
			`,
			examples: ['wiki Donald Trump'],
			args: [
				{
					key: 'question',
					prompt: 'What would you like to search for?',
					type: 'string',
					infinite: false
				}
			]
		});
	}

	async run(msg, args) {
		let wiki = JSON.stringify(args.question);
		let wikiFix = wiki.replace(/\"/g, "");
		msg.reply("https://en.wikipedia.org/wiki/" + wikiFix.replace(/ /g,"_"));
	}
}