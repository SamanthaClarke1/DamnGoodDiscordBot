# **DamnGoodDiscordBot**
#### (Its actually trash lmao)

## **Owner**
+ ##summon // sets the bots default messaging channel to that channel.
+ All other commands

## **Admins**

### You have the following rights
+ Protection from the rickroll bot
+ Control of the rickroll bot
    + ##rollem      // starts a really atrocious spam of rythym bots
    + ##stoptheroll // stops that hell
+ Protection from the yeet bot
+ Ability to force GameMaster
    + ##gamemaster {name / "me"}  // sets gamemaster to either that persons name, or you, if passed me instead of a name.
+ Ability to use the farmbot
    + ##farmplz   // toggles
    + ##isfarming // checks if farming
+ Extended ##glitch priveleges
    + Greater than ten lines
    + glitch param: aestts         // abc def -> /tts a b c \n /tts d e f
+ Ability to psuedo-block users
    + ##idontcare [name]  // blocks em
    + ##icarenow  [name]  // unblocks em
+ All SubAdmins and Everyday User priveleges


## **SubAdmins**

### You have the following rights
+ Control of quickrolls
    + ##quickroll // starts a single roll
    + ##rollem    // edited to be a shortcut to single roll (for subadmins)
+ The ability to start votes
    + ##startvote {topic}   // starts a poll
+ Control of the yeet bot
    + ##yeet  // toggles the yeet. whilst yeeting, the bot replaces every word said with yeet. I know, it's **terribl**(y gr)**e**(at).
+ Extended ##glitch priveleges
    + glitch param: tts            // abc def -> /tts abc \n def
    + glitch param: play           // abc def -> !play abc \n !play def
+ Ability to dump the cache
    + ##dumpcache // speaks for itself
+ All Everyday User Priveleges


## **GameMasters**
#### Please note this is only a temporary role, granted by ##gamemaster [name / "me"]

### You have the following rights
+ Ability to start a new game
    + ##startgame {boardstate}   // starts a new game with the letters. For example, if passed ????e, it would look like " _ _ _ _ e "
+ Ability to grant a victor
    + ##victoryto {person}  // just refreshes the board and prints a victory message. nothing else.
+ Ability to signup players
    + ##signup [player1] [player2] [player3] .... // signs up players for the current game
+ Ability to Change the turn cycle of games
    + ##turnback     // goes back a turn
    + ##turnforward  // goes forward a turn
+ Ability to add things to the board
    + ##addletter [correct] {letter}  // adds the given letter, as missing by default, but as correct if passed the correct flag.
    + ##addgenre [correct] {genre}    // see ##addletter
    + ##addword [correct] {word}      // see ##addgenre 
    + ##add commands will all advance the turnstate by one.
+ Ability to remove things from the board
    + ##removeletter [correct] {letter} // removes the letter from the board
    + ##removeword [correct] {word}     // see ##removeletter
    + ##removegenre [correct] {genre}   // see ##removeword
    + ##remove commands will NOT advance the turnstate.
+ Ability to set the boardstate
    + ##setgame {boardstate}  // see startgame. does NOT increment the turnstate.


## **Everyday Users**

### You have the following rights
+ The ability to vote
    + ##vote {your say}  // submits the vote if there is a vote going on
    + ##getvotes         // see what people have voted recently
+ Bot Status checks
    + ##sam // checks status of the bot
    + ##howareyou // checks status of the bot
+ Wake up calls
    + ##wakemeup {minutes}  //wakes you up after a given amount of minutes
+ ##glitch [params] {message} // text editing and regurgitating. ab cd ef -> ab \n cd \n ef \n
    + glitch param: aesthetic      // abc def -> a b c \n d e f
    + glitch param: tourrettes     // abc def -> FUCKING abc \n FUCKING def
    + glitch param: noswearing     // abc def -> *b* \n d**
    + glitch param: defnoswearing  // abc def -> *** \n ***
+ Cache usage
    + ##cache {stuff to cache} // caches what you pass it
    + ##getcache // returns the current cache
    + ##splicecache [start] [elementsToDelete] // runs a javascript array.splice command on the cache. 
    + // ##splicecache 0 1 // deletes the first element
+ Dice usage
    + ##dice [max number] // generates a number from 1 to max number
