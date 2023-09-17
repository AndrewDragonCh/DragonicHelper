const tmi = require('tmi.js');
require('dotenv').config()

const client = new tmi.Client({
	connection: {
		reconnect: true,
		secure: true
	},
  options: {
    clientId: process.env.clientId,
  },
	identity: {
		username: process.env.botUsername,
		password: process.env.botPassword
	},
	channels: [ 'AndrewDragonCh' ]
});

client.on("connecting", (address, port) => {
  console.log(`Connecting to ${address}:${port}`)
});

client.connect()
  .then((data) => {
    console.log(`Connected to ${data[0]}:${data[1]}`)
  }).catch((err) => {
    console.log(`Failed to connect. ${err}`)
  });

client.on('message', (channel, tags, message, self) => {
  if(self || !message.startsWith('!')) return;
  const args = message.slice(1).split(' ');
  const command = args.shift().toLowerCase();

  if(command === 'ping') {
    client.ping()
      .then((data) => {
        client.say(channel, `Ping: ${data*1000}ms`)
        console.log(`Ping command succeeded.`)
      }).catch((err) => {
        console.log(`Failed to execute ping command. ${err}`)
      });
  }
  if(command === 'specs' || command === 'pc') {
    client.say(channel, `@${tags.username} https://pcpartpicker.com/user/AndrewDragonCh/saved/QR24gs`)
      .then(() => {
        console.log(`Specs command succeeded.`)
      }).catch((err) => {
        console.log(`Specs command failed. ${err}`)
      });
  }
  if(command === 'headphones' || command === 'headset') {
    client.say(channel, `@${tags.username} Razer Nari Essentials or Apple AirPods Pro 2`)
      .then(() => {
        console.log(`Headphones command succeeded.`)
      }).catch((err) => {
        console.log(`Headphones command failed. ${err}`)
      });
  }
  if(command === 'mouse') {
    client.say(channel, `@${tags.username} Razer Viper V2 Pro`)
      .then(() => {
        console.log(`Mouse command succeeded.`)
      }).catch((err) => {
        console.log(`Mouse command failed. ${err}`)
      });
  }
  if(command === 'keyboard' || command === 'kb') {
    client.say(channel, `@${tags.username} Corsair K65 Mini in White.`)
      .then(() => {
        console.log(`Keyboard command succeeded.`)
      }).catch((err) => {
        console.log(`Keyboard command failed. ${err}`)
      });
  }
  if(command === 'monitor') {
    client.say(channel, `@${tags.username} Main is an Acer XF273 1080p 165hz. Second and third are both 1080p 60hz.`)
      .then(() => {
        console.log(`Monitor command succeeded.`)
      }).catch((err) => {
        console.log(`Monitor command failed. ${err}`)
      });
  }
  if(command === 'mousepad') {
    client.say(channel, `@${tags.username} HyperX Extended Mousepad`)
      .then(() => {
        console.log(`Mousepad command succeeded.`)
      }).catch((err) => {
        console.log(`Mousepad command failed. ${err}`)
      });
  }
  if(command === 'help') {
    client.say(channel, `@${tags.username} I need to remake this...`)
      .then(() => {
        console.log(`Help command succeeded.`)
      }).catch((err) => {
        console.log(`Help command failed. ${err}`)
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