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
  console.log(`${address}:${port}`)
});

client.connect()
  .then((data) => {
    console.log(`Connected to ${data} successfully!`)
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
        client.say(channel, `Ping: ${data*1000}ms`).then(() => {
          console.log(`Ping command succeeded.`)
        }).catch((err) => {
          console.log(`Ping command failed. ${err}`)
        });
      }).catch((err) => {
        console.log(`Failed to execute ping command. ${err}`)
      });
  }
  if(command === 'specs' || command === 'pc') {
    client.say(channel, `Find my specs at https://pcpartpicker.com/user/AndrewDragonCh/saved/dFDNzy`)
      .then(() => {
        console.log(`Specs command succeeded.`)
      }).catch((err) => {
        console.log(`Specs command failed. ${err}`)
      });
  }
  if(command === 'headphones' || command === 'headset') {
    client.say(channel, `I use Razer Nari Essentials. Find it at https://www.amazon.com/dp/B07HZ5N8QT`)
      .then(() => {
        console.log(`Headphones command succeeded.`)
      }).catch((err) => {
        console.log(`Headphones command failed. ${err}`)
      });
  }
  if(command === 'mouse') {
    client.say(channel, `I use a Glorious Model O. Find them at https://www.amazon.com/dp/B07MGDRBBF`)
      .then(() => {
        console.log(`Mouse command succeeded.`)
      }).catch((err) => {
        console.log(`Mouse command failed. ${err}`)
      });
  }
  if(command === 'keyboard' || command === 'kb') {
    client.say(channel, `I use the Corsair K70 MK.2 SE. Find them at https://www.amazon.com/dp/B07D5S24BP`)
      .then(() => {
        console.log(`Keyboard command succeeded.`)
      }).catch((err) => {
        console.log(`Keyboard command failed. ${err}`)
      });
  }
  if(command === 'monitor') {
    client.say(channel, `My main monitor a generic 1080p60 monitor from Acer. To the left of it, I have a second Dell 1080p60 monitor. I also use a 8" Tablet as a third display.`)
      .then(() => {
        console.log(`Monitor command succeeded.`)
      }).catch((err) => {
        console.log(`Monitor command failed. ${err}`)
      });
  }
  if(command === 'mousepad') {
    client.say(channel, `I use a SteelSeries QcK Prism. Find them at https://www.amazon.com/dp/B07JQ2TK86`)
      .then(() => {
        console.log(`Mousepad command succeeded.`)
      }).catch((err) => {
        console.log(`Mousepad command failed. ${err}`)
      });
  }
  if(command === 'help') {
    client.say(channel, `https://docs.andrewdragon.dev/twitch/commands`)
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