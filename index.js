// to get me going: Have the discord.js npm package installed with me
                 // place a token in my token variable, just below this.
                 // run me using node

const token = "";

const Discord = require('discord.js');
const client = new Discord.Client();

var lchannel;
var rolling = false;
var farming = false;
var lmsg;
var lparams = [];
var hasGotPoints = false;
var isOn = true;
var trolling = false;
var blockedUsers = [];
var cache = [];

var users_who_voted = [];
var votename = "";
var votes = {};

var http = require('http');
var url = require('url');

var template = [
	"\\~\\~\\~               ",
	"             \\~\\~\\~   _\n---------------------------------------------------------------------\n",
    "**genre    **:  ",
    "**words   **:  ",  
    "**letters  **:  ",
    "---------------------------------------------------------------------"
];
var genres = [];
var words = [];
var letters = [];
var users = [];
var cuser = 0;
var gameMaster = "";
var blanks = "";

var isYeeting = false;
var owner = "KingTide";
var altadmins = ["KingTide", "KingTide44"];
var subadmins = ["I Want to Jiro-verdose and Die", "IsntThatSwell"]

client.login(token).then(success).catch(err);
function success(token) {
    console.log('great success :) ' + client.user.username);
}
function err(error) {
    console.log(error);
}


client.on('ready', () => {
    console.log('Howdy :)');
});

client.on('message', message => {
    if(!lchannel) lchannel = message.channel;
	else if(message.author.username == owner && message.content == "##summon") {
		lchannel = message.channel;
	}
    var xx = message.content.split(' ')[0].toLowerCase();
    var params = message.content.split(' ');
    params.splice(0, 1);
	
	if(!checkIfICare(message)) {
	}
	else{

    if(isOn) {
		console.log("Message from " + message.author.username);
		
		if(isYeeting && !isAdmin(message.author.username)) {
			var yeetsToSend = "";
			params.splice(0, 0, xx);
			for(var i = 0; i < params.length; i++) {
				var thisYeet = "y";
				for(var j = 0; j < params[i].length; j++) {
					thisYeet += "e";
				}
				thisYeet += "t ";
				
				yeetsToSend += thisYeet;
			}
			
			message.reply(yeetsToSend);
		}
		
        if(xx == '!rew' && !isAdmin(message.author.username) && rolling) {
            lchannel.sendMessage('!fwd ' + params[0]);
        }
        if(xx == '!fwd' && !isAdmin(message.author.username) && rolling) {
            lchannel.sendMessage('!rew ' + params[0]);
        }
        if(xx == '!pause' && rolling && !isAdmin(message.author.username)) {
            lchannel.sendMessage('!unpause');
        }
        if((xx == '!leave' || xx == '!destroy') && rolling && !isAdmin(message.author.username)) {
            lchannel.sendMessage('!play https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        }
        if(xx == '!skip' && rolling && !isAdmin(message.author.username)) {
            lchannel.sendMessage('!skip');
            lchannel.sendMessage('!play https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        }
        if(xx == '!play' && rolling && !isAdmin(message.author.username)) {
            lchannel.sendMessage('!skip');
            lchannel.sendMessage('!play https://www.youtube.com/watch?v=dQw4w9WgXcQ');
		}
		if(xx == '##yeet' && isSubAdmin(message.author.username)) {
			isYeeting = !isYeeting;
			if(isYeeting) 
				message.reply("yeeting is now on");
			else
				message.reply("yeeting is now off");
		}
		if(xx == '##startvote' && isSubAdmin(message.author.username)) {
			lchannel.sendMessage(`Starting a vote. This new vote will be about:
			` + params.join(" ") + `
			Please note that due to limitations I'm only built to hold one vote.`);
			votename = params.join(" ");
		}
		if(xx == "##gamemaster" && (isAdmin(message.author.username) || gameMaster == "")) {
			if (params[0] == "me") {
				gameMaster = message.author.username;
				message.reply("** __ GAME MASTER HAS BEEN CHANGED TO " + message.author.username + " __ **");
			}
			else {
				gameMaster = params[0];			
				message.reply("** __ GAME MASTER HAS BEEN CHANGED TO " + params[0] + " __ **");
			}
		}
		if(xx == "##turnback") {
			if(message.author.username == gameMaster)
			{
				cuser -= 1;
				drawGame(false);
			}
			else {
				message.reply("But you're not the game master!");
			}
		}
		if(xx == "##turnforward") {
			if(message.author.username == gameMaster)
			{
				drawGame(true);
			}
			else {
				message.reply("But you're not the game master!");
			}
		}
		if(xx == "##victoryto") {
			if(message.author.username == gameMaster)
			{
				drawGame(false);
				
				message.reply("** Victory to " + params[0] + " !!!! **");
				
				resetGame();
				
				gameMaster = "";
			}
			else {
				message.reply("But you're not the game master!");
			}
		}
		if(xx == "##startgame") {
			if(message.author.username == gameMaster)
			{
				message.reply("Starting a game!");
				
				resetGame();
				
				pp = params.join(" ");
				for(var i = 0; i < pp.length; i++) {
					if(pp[i] == "?") {
						blanks += " \\_ ";
					}
					else {
						blanks += " __" + pp[i] + "__ ";
						console.log(params[i]);
					}
				}
				
				drawGame(false);
			}
			else {
				message.reply("But you're not the game master!");
			}
		}
		if(xx == "##signup") {
			if(message.author.username == gameMaster)
			{
				for (var i = 0; i < params.length; i++) {
					users.push(params[i]);
				}
				
				message.reply("Signed up the people");
			}
			else {
				message.reply("But you're not the game master!");
			}
		}
		if(xx == "##addletter") {
			if(message.author.username == gameMaster)
			{
				if(params[0] == "correct") {
					letters.push("__" + params[1] + "__");
				}
				else {
					letters.push("~~" + params[0] + "~~");
				}
				
				drawGame(true);
			}
			else {
				message.reply("But you're not the game master!");
			}
		}
		if(xx == "##addgenre") {
			if(message.author.username == gameMaster)
			{
				if(params[0] == "correct") {
					genres.push("__" + params[1] + "__");
				}
				else {
					genres.push("~~" + params[0] + "~~");
				}
			
				drawGame(true);
			}
			else {
				message.reply("But you're not the game master!");
			}
		}
		if(xx == "##addword") {
			if(message.author.username == gameMaster)
			{
				if(params[0] == "correct") {
					words.push("__" + params[1] + "__");
				}
				else {
					words.push("~~" + params[0] + "~~");
				}
				drawGame(true);
			}
			else {
				message.reply("But you're not the game master!");
			}
		}		
		if(xx == "##removeletter") {
			if(message.author.username == gameMaster)
			{
				var letToFind = "";
				if(params[0] == "correct") {
					letToFind = ("__" + params[1] + "__");
				}
				else {
					letToFind = ("~~" + params[0] + "~~");
				}
				
				for(var i = 0; i < letters.length; i++) {
					if(letters[i] == letToFind) letters.splice(i, 1);
				}
				
				drawGame(false);
			}
			else {
				message.reply("But you're not the game master!");
			}
		}
		if(xx == "##removegenre") {
			if(message.author.username == gameMaster)
			{
				var letToFind = "";
				if(params[0] == "correct") {
					letToFind = ("__" + params[1] + "__");
				}
				else {
					letToFind = ("~~" + params[0] + "~~");
				}
				
				for(var i = 0; i < genres.length; i++) {
					if(genres[i] == letToFind) genres.splice(i, 1);
				}
				
				drawGame(false);
			}
			else {
				message.reply("But you're not the game master!");
			}
		}
		if(xx == "##removeword") {
			if(message.author.username == gameMaster)
			{
				var letToFind = "";
				if(params[0] == "correct") {
					letToFind = ("__" + params[1] + "__");
				}
				else {
					letToFind = ("~~" + params[0] + "~~");
				}
				
				for(var i = 0; i < words.length; i++) {
					if(words[i] == letToFind) words.splice(i, 1);
				}
				
				drawGame(false);
			}
			else {
				message.reply("But you're not the game master!");
			}
		}
		if(xx == "##setgame") {
			if(message.author.username == gameMaster)
			{
				blanks = "";
				
				pp = params.join(" ");
				for(var i = 0; i < pp.length; i++) {
					if(pp[i] == "?") {
						blanks += " \\_ ";
					}
					else {
						blanks += " __" + pp[i] + "__ ";
						console.log(params[i]);
					}
				}
				
				drawGame(false);
			}
			else {
				message.reply("But you're not the game master!");
			}
		}
		if(xx == "##vote") {
			var person_has_voted = false;
			var m_name = message.author.username;
			for(var i = 0; i < users_who_voted.length; i++) {
				if(users_who_voted[i] == m_name) {
					person_has_voted = true;
				}
			}
			if(person_has_voted) {
				message.reply(`Sorry to say this, but it seems you've already voted. 
				(Double voting is not allowed rn, contact an admin if you wish for this to change.`);
			}
			else {
				users_who_voted.push(m_name);
				votes[m_name] = params.join(" ");
				message.reply("Your vote has been counted. Thank you for voting.");
			}
		}
		if(commandIs("getvotes", message)) {
			m_reply = "Votes on issue <"+ votename +"> are: \n";
			for(var votekey in votes) {
				m_reply += votekey + ": " + votes[votekey] + " \n";
			}			
			message.reply(m_reply);
		}
        if(commandIs("sam", message)) {
            message.reply('Huh? Oh. Hello :)');
        }
        if(commandIs("howareyou", message)) {
            message.reply('Good! Found out I\'m not \'really\' a human, so its not all bad. I can stop spending so much money on soap.');
        }
        if(commandIs("rollem", message)) {
            if(isAdmin(message.author.username)) {
                rolling = true;
                lchannel.sendMessage('The roll has started >:)');
            } 
			if(isSubAdmin(message.author.username)) {
				lchannel.sendMessage('!leave');
				lchannel.sendMessage('!play https://www.youtube.com/watch?v=dQw4w9WgXcQ');
			}
        }
        if(commandIs('quickroll', message)) {
			if(isSubAdmin(message.author.username)) {
				lchannel.sendMessage('!leave');
				lchannel.sendMessage('!play https://www.youtube.com/watch?v=dQw4w9WgXcQ');
			}
        }
        if(commandIs("stoptheroll", message)) {
            if(isAdmin(message.author.username)) {
                rolling = false;
                lchannel.sendMessage('The roll has stopped master :)');
            } 
            else {
                message.reply('Look, only the true king has access to this');
            }
        }
        if(commandIs("wakemeup", message)) {
            if(!params[0]) {
                lchannel.sendMessage('Correct usage: ##wakemeup (MINUTES TO WAKE YOU UP AFTER)');
            } else { 
                message.reply('I will! Promise <3');
                setTimeout(wakeup, 60000 * params[0]);
            }
        }
        if(commandIs("farmplz", message) && isAdmin(message.author.username)) {
            message.reply('Okk farming: ' + !farming);
            farming = !farming;
        }
        if(isAdmin(message.author.username)) {
            hasGotPoints = true;
        }
        if(commandIs("glitch", message)) {
            if(params.length > 10 && !isAdmin(message.author.username)) lchannel.sendMessage('No');
            else {
                if(!isAdmin(message.author.username)) message.reply('This ones for you :)');
                if(params[0] == 'aesthetic') {
                    var aestheticPrint = true;
                    var printStyle = true;
                }
                if(isAdmin(message.author.username) && params[0] == 'aestts') {
                    var aesttsPrint = true;
                    var printStyle = true;
                }
                if(isSubAdmin(message.author.username) && params[0] == 'tts') {
                    var ttsPrint = true;
                    var printStyle = true;
                }
                if(params[0] == 'tourrettes') {
                    var tourrettesPrint = true;
                    var printStyle = true;
                }
                if(params[0] == 'noswearing') {
                    var noswearPrint = true;
                    var printStyle = true;
                }
                if(params[0] == 'defnoswearing') {
                    var defnoswearPrint = true;
                    var printStyle = true;
                }
				if(isSubAdmin(message.author.username) && params[0] == 'play') {
					var playPrint = true;
					var printStyle = true;
				}
                for (var res in params) {
                    if(params[res].length > 100) params[res] = "STOP THE SPAM";
                    var test = params[res].replace('##', 'I see what you\'re trying to do..');
                    if(aesttsPrint && res != 0) lchannel.sendMessage(test.split('').join(' '), {tts: true});
                    if(aestheticPrint && res != 0) lchannel.sendMessage(test.split('').join(' '));
                    if(ttsPrint && res != 0) lchannel.sendMessage(test, {tts: true});
                    if(tourrettesPrint && res != 0) lchannel.sendMessage(' FUCKING ' + test);
                    if(noswearPrint && res != 0) lchannel.sendMessage(test.split(/[fsFSCcEe]/).join('*'));
                    if(defnoswearPrint && res != 0) lchannel.sendMessage(test.split(/[a-z]/).join('\\*'));
					if(playPrint && res != 0) lchannel.sendMessage("!play " + test);
                    else if(!printStyle) lchannel.sendMessage(test);
                }
            }
        }
        if(commandIs("whatscool", message) && checkIfICare()) {
            message.reply('I think this tbh https://www.youtube.com/watch?v=nob0wutM-Xo&index=7&list=PLL0602iqqyiyHTOl09UrqOfsnRCgYd5Ax');
        }
        if(commandIs("themecolors", message)) {
            message.reply(`
titlehover: . . . #428bca  |  dark-back: . . . . . #262626  |  body-back: . . . . #404041 
create-btn-back: .#446CB3  |  create-hover-back: . #3c97d8  |  results-general: . #2a2a2c
results-light: . .#5a5a5c  |  results-xlight: . . .#8595A0  |  `);
        }
        if(commandIs("cache",message)) {
            if(cache.length < 40) {
                cache.push(params.join(' '));
                message.reply('Done! Everythings good!');
            } else {
                message.reply('Im so sorry... my bellies a bit full... with 40 cache items!');
            }
        }
        if(commandIs("getcache",message)) {
            message.reply(cache.join(`
`));
        }
        if(commandIs("splicecache", message)) {
            cache.splice(params[0], params[1]);
            message.reply('Done! Cache spliced with: ' + params[0] + " , " + params[1]);
        }
        if(isSubAdmin(message.author.username) && commandIs("dumpcache", message)) {
            cache = [];
        }
        if(commandIs("cachehelp", message)) {
            message.reply(`
\`\`
cache: stores the string you give it
  --getcache: replies the cache to you,

  --splicecache runs the splice() function on the cache, param[0] is index, param[1] is length to splice
 
  --dump cache flushes the cache
\`\`
            `);
        }
    }
    if(commandIs("header", message)) {
        message.reply("lol scribe amirite");
    }
    if(commandIs('trollem', message) && isAdmin(message.author.username)) {
        trolling = true;
        message.reply('hehehe...');
    }
    if(commandIs('idontcare', message) && isAdmin(message.author.username)) {
        blockedUsers.push(params.join(" "));
    }
    if(commandIs('icarenow', message) && isAdmin(message.author.username)) {
        for(var i = 0; i < blockedUsers.length; i++) {
            if(blockedUsers[i] == params.join(" ")) {
                blockedUsers.splice(i, 1);
            }
        }
    }
	if(commandIs("dice", message)) {
		message.reply(Math.floor(Math.random() * params[0] + 1));
	}
	
	}
});


function checkIfICare(message) {
    for(var i = 0; i < blockedUsers.length; i++) {
        if(blockedUsers[i] == message.author.username) {
            return false;
        }
    }
    return true;
}

function getPoints() {
    if(farming && !hasGotPoints) lchannel.sendMessage('Points! Look you got like, maybe this much ' + Math.random() * 25);
    hasGotPoints = false;
} setInterval(getPoints, 60000);

function commandIs(str, msg) {
  return msg.content.split(' ')[0].toLowerCase() == "##" + str;
}

function apicall(url, callback) {

    return http.get(url, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback({
                value: parsed.value
            });
        });
    });

}

function wakeup() {
    lchannel.sendMessage('BOO! wake up!');
}

function drawGame(shouldChangeTurn) {
	lchannel.sendMessage("!clear 100");
	
	var htmlToSend = "";
	
	htmlToSend += (template[0] + blanks + template[1]);
	htmlToSend += (template[2] + genres.join(" ") + "\n");
	htmlToSend += (template[3] + words.join(" ") + "\n");
	htmlToSend += (template[4] + letters.join(" ") + "\n");
	htmlToSend += (template[5] + "\n");
	
	if(shouldChangeTurn) {
		cuser += 1;
		if (cuser >= users.length) {
			cuser = 0;
		}
	}
	
	if(users[cuser])
		htmlToSend += ("It is " + users[cuser] + " 's turn! ");
	else { 
		htmlToSend += ("It is [" + cuser + "] 's turn! ");
	}
	
	lchannel.sendMessage(htmlToSend);
}

function resetGame() {
	blanks = "";
	words = [];
	users = [];
	cuser = 0;
	letters = [];
	genres = [];
}

function isAdmin(username) {
	for(var i = 0; i < altadmins.length; i++) {
		if(altadmins[i] == username) return true;
	}
	if(username == client.user.username) return true;
	
	return false;
}

function isSubAdmin(username) {
	if(isAdmin(username))
		return true;
	
	for(var i = 0; i < subadmins.length; i++) {
		if(subadmins[i] == username) return true;
	}
	
	return false;
}
