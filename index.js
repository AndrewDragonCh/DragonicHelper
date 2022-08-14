const tmi = require('tmi.js');
const { botUsername, botPassword } = require('./config.json')

const client = new tmi.Client({
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: botUsername,
		password: botPassword
	},
	channels: [ 'AndrewDragonCh' ]
});

client.on("connecting", (address, port) => {
  console.log(`${address}:${port}`)
});

client.connect()
  .then((data) => {
    console.log(`Connected to ${data} successfully!`)
  }).catch((err) => {
    console.log(`Failed to connect. ${err}`)
  });

client.on('message', (channel, tags, message, self) => {if(
  self || !message.startsWith('!')) return;
  const args = message.slice(1).split(' ');
  const command = args.shift().toLowerCase();

	if(command === 'restream') {
		client.say(channel, `I'll be streaming on both YouTube and Twitch for a few weeks to see if I like Twitch. This doesn't mean I won't use YouTube, just may stream on Twitch instead.`)
      .then(() => {
        console.log(`Restream command succeeded.`)
      }).catch((err) => {
        console.log(`Restream command failed. ${err}`)
      });
	}
  if(command === 'ping') {
    client.ping()
      .then((data) => {
        client.say(channel, `Ping: ${data*1000}ms`)
      }).catch((err) => {
        console.log(`Failed to execute ping command. ${err}`)
      });
  }
});

client.on("clearchat", (channel) => {
  client.say(channel, `Chat has been cleared. Naughty chat.`)
    .then(() => {
      console.log(`Chat has been cleared and notified.`)
    }).catch((err) => {
      console.log(`Chat has been cleared but not notified. ${err}`)
    });
});

client.on("raided", (channel, username, viewers) => {
  client.say(channel, `Thanks @${username} for the ${viewers} viewer raid! Hope you had a good stream!`)
    .then((data) => {
      console.log(`Successfully thanked ${username} for raiding with ${viewers}. ${data}`)
    }).catch((err) => {
      console.log(`Failed to thank ${username} for raiding with ${viewers}. ${err}`)
    });
});

client.on("slowmode", (channel, enabled, length) => {
  if(enabled === true) {
    client.say(channel, `Slow mode has been set to ${length} seconds. Be good chat!`)
      .then(() => {
        console.log(`Slow mode has been set to ${length} seconds and chat notified.`)
      }).catch((err) => {
        console.log(`Slow mode has been set to ${length} seconds but chat was not notified. ${err}`)
      });
  } else if(enabled === false) {
    client.say(channel, `Slow mode has been disabled. Be good chat!`)
      .then(() => {
        console.log(`Slow mode has been disabled and chat notified.`)
      }).catch((err) => {
        console.log(`Slow mode has been disabled but chat was not notified. ${err}`)
      });
  } else {
    client.say(channel, `Slow mode has either been enabled or disabled, but I'm not sure which one...`)
      .then(() => {
        console.log(`Slow mode has either been enabled or disabled and chat notified.`)
      }).catch((err) => {
        console.log(`Slow mode has either been enabled or disabled but chat was not notified. ${err}`)
      });
  }
});

client.on("subscription", (channel, username, method, message, userstate) => {
  client.say(channel, `Thanks @${username} for subscribing!`)
    .then((data) => {
      console.log(`Successfully thanked ${username} for subbing. ${data}`)
    }).catch((err) => {
      console.log(`Failed to thank ${username} for subbing. ${err}`)
    });
});

client.on("whisper", (from, userstate, message, self) => {
  if (self) return;

  client.whisper(from, `I don't listen to whisperers. If you want me, speak in chat.`)
    .then((data) => {
      console.log(`Harassed a whisperer.`)
    }).catch((err) => {
      console.log(`Whisperer got away... ${err}`)
    });
});

client.on("ping", () => {
  client.ping()
    .then((data) => {
      console.log(`Successfully responded to Twitch Ping. ${data*1000}`)
    }).catch((err) => {
      console.log(`Failed to respond to Twitch Ping. ${err}`)
    });
});