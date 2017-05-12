const Commando = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path');
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');
var addPoints = false;

const client = new Commando.Client({
	owner: '186493565445079040',
	commandPrefix: '8',
	invite: 'https://discord.gg/Hz2Q9J2'
});

client
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log)
	.on('ready', () => {
		console.log(`Eight is up and running as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
		client.user.setGame('@Eight help');
	})
	.on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnecting', () => { console.warn('Reconnecting!'); })
	.on('commandError', (cmd, err) => {
		if(err instanceof Commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		console.log(oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	});


client.setProvider(
	sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.registry
	.registerGroups([
		['math', 'Math'],
		['fun', 'Fun'],
		['music', 'Music'],
		['admin', 'Admin']
	])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));

	client.login('<SUPER SECRET TOKEN>');
