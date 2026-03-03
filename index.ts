import tmi from '@tmi.js/chat';

const client = new tmi.Client({
  token: process.env.TWITCH_OAUTH_TOKEN,
  channels: [ 'AndrewDragonCh' ]
});

client.connect();

client.on('message', e => {
  const { channel, user, message } = e;
  if(user.isBot || !message.text.startsWith('!')) return;
  const command = message.text.slice(1).split(' ')[0].toLowerCase();

  if(command === 'specs' || command === 'pc') {
    client.say(channel, `@${user.login} https://pcpartpicker.com/user/AndrewDragonCh/saved/QR24gs`)
      .then(() => {
        console.log(`Specs command succeeded.`)
      }).catch((err) => {
        console.log(`Specs command failed. ${err}`)
      });
  }
  if(command === 'headphones' || command === 'headset' || command === 'inears') {
    client.say(channel, `@${user.login} Razer Nari Essentials, Linsoul 7Hz x Crinacle Zero:2, Apple AirPods Pro 2`)
      .then(() => {
        console.log(`Headphones command succeeded.`)
      }).catch((err) => {
        console.log(`Headphones command failed. ${err}`)
      });
  }
  if(command === 'mic' || command === 'microphone') {
    client.say(channel, `@${user.login} Audio Technica AT2035. Interface is a Behringer U-PHORIA UMC1820.`)
      .then(() => {
        console.log(`Microphone command succeeded.`)
      }).catch((err) => {
        console.log(`Microphone command failed. ${err}`)
      });
  }
  if(command === 'mouse') {
    client.say(channel, `@${user.login} Razer Viper V3 Pro`)
      .then(() => {
        console.log(`Mouse command succeeded.`)
      }).catch((err) => {
        console.log(`Mouse command failed. ${err}`)
      });
  }
  if(command === 'keyboard' || command === 'kb') {
    client.say(channel, `@${user.login} Asus ROG Strix Scope II 96`)
      .then(() => {
        console.log(`Keyboard command succeeded.`)
      }).catch((err) => {
        console.log(`Keyboard command failed. ${err}`)
      });
  }
  if(command === 'monitor') {
    client.say(channel, `@${user.login} Main is a Dell Alienware AW3225QF 4k 240hz. Second is an Acer XF273 S 1080p 165hz. Third is a generic Dell 1080p 60hz.`)
      .then(() => {
        console.log(`Monitor command succeeded.`)
      }).catch((err) => {
        console.log(`Monitor command failed. ${err}`)
      });
  }
  if(command === 'mousepad') {
    client.say(channel, `@${user.login} SteelSeries QcK XL Performance Speed`)
      .then(() => {
        console.log(`Mousepad command succeeded.`)
      }).catch((err) => {
        console.log(`Mousepad command failed. ${err}`)
      });
  }
  if(command === 'help') {
    client.say(channel, `@${user.login} I need to make this...`)
      .then(() => {
        console.log(`Help command succeeded.`)
      }).catch((err) => {
        console.log(`Help command failed. ${err}`)
      });
  }
});
