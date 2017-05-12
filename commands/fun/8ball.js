const commando = require('discord.js-commando');
const discord = require('discord.js');
const oneLine = require('common-tags').oneLine;

module.exports = class AddBallCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'ball',
			group: 'fun',
			memberName: 'ball',
			description: 'Ask a question and recieve an answer.',
			details: oneLine`
				The magic 8 ball will answer any and all questions with it\'s legendary furture prediction abilities.
				Just ask it a question and you shall recieve an answer.
			`,
			examples: ['ball Will I marry _____'],
			args: [
				{
					key: 'question',
					prompt: 'What would you like to ask the magic 8 ball?',
					type: 'string',
					infinite: false
				}
			]
		});
	}

	async run(msg, args) {
		const ball = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "As I see it, yes", 
		"Most likely", "Outlook good", "Yes", "Signs point to yes", "Don't count on it", 
		"My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];
        
        var ballRan = ball[Math.floor(Math.random()*ball.length)];

        let que = JSON.stringify(args.question);

        let queFix = que.replace(/\"/g, "");
        
        const qdata = new discord.RichEmbed()
          .setTitle('🎱 The Magic 8 Ball')
          .addField('Question', queFix)
          .addField('Answer', ballRan)
          .setFooter('Eight (The Commando Bot)');

        msg.channel.send({embed: qdata});
	}
}