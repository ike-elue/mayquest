const testMode = false;

var form = document.getElementById('episode');
var submit = document.getElementById('continue-button');
var reset = document.getElementById('reset-button');
var vid = document.getElementById('video-player');
var selector = document.getElementById('event-selector');
var selector_holder = document.getElementById('event-selector-holder');

var currentEvent = null;

var start = {
    name:"start",
    question: "Dillo Day is a maximum security event. Your mission is to infiltrate it. You hurdle over a four foot tall fence. You duck behind a curtain to hide from security guards. Oh no! You are accidentally backstage for [snitches get ditches].",
    choices: ["Assignment"],
    choice_actions: ["Ruh roh!"],
    video: null
}

var assignemnt = {
    name:"Assignment",
    question: "What are you doing?? Don't just stand there, Lana Alabama needs help getting ready before the show!<br><br>Choose your assignment.",
    choices: ["Outfits", "Hair/Makeup"],
    choice_actions: null,
    video:'vid00.mp4',
    volume: 0.4
}

var outfits = {
    name:"Outfits",
    question: "Looks great!",
    choices: ["Favorite Drink"],
    choice_actions: ["Thanks!"],
    video:'vid01.mp4',
    volume: 0.2
}

var hair_makeup = {
    name:"Hair/Makeup",
    question: "Nicely done!",
    choices: ["Favorite Drink"],
    choice_actions: ["Thanks!"],
    video:'vid2.mp4',
    volume: 0.2
}

var fav_drink = {
    name:"Favorite Drink",
    question: "Lana Alabama needs to soothe their vocal chords before they perform. Go buy their favourite drink!",
    choices: ["Coffee", "Pellegrino "],
    choice_actions: ["Grab them a coffee", "Fetch them a pellegrino"],
    video: null
}

var coffee = {
    name:"Coffee",
    question: "Nice! Now we can finally get on with this performance.",
    choices: ["Upset"],
    choice_actions: ['Excellent!'],
    video:'vid4.mp4',
    volume: 0.4
}

var pellegrino  = {
    name:"Pellegrino ",
    question: "Oops! Looks like Lana Alabama got sick! Quick, bring them coffee to make them feel better!",
    choices: ["Coffee"],
    choice_actions: ["Grab them a coffee"],
    video:'vid3.mp4',
    volume: 0.9
}

var upset = {
    name:"Upset",
    question: "Oh no, we have an emergency! Their luxury shoes caught on fire! What should we do?",
    choices: ["Weed", "Shoes"],
    choice_actions: ["Go get some *yummy* ice cream to calm them down!", "Run to the Mayfit to get a new pair!"],
    video:'vid05.mp4',
    volume: 0.2
}

var weed = {
    name:"Weed",
    question: "Crap, they ate too much! This is a disaster!!!! Quick, get them a new pair of shoes from Mayfit so Lana Alabama can at least perform",
    choices: ["Shoes"],
    choice_actions: ["To the store!!"],
    video:'vid6.mp4',
    volume: 0.2
}

var shoes = {
    name:"Shoes",
    question: "Do they like the shoes?",
    choices: ["No Like", "Like"],
    choice_actions: ["Sneakers", "Crocs"],
    video:'vid7.mp4',
    volume: 0.1
}

var nolike = {
    name:"No Like",
    question: "Bruh what are you doing, this has no drip!! Lana Alabama can’t go out looking like that!",
    choices: ["Bad Perform"],
    choice_actions: ["Oh no! (but like, did I ask?)"],
    video:'vid8.mp4',
    volume: 0.15
}

var like = {
    name:"Like",
    question: "Damn that fit is fire!",
    choices: ["Perform"],
    choice_actions: ["Yessir!!"],
    video:'vid9.mp4',
    volume: 0.2
}

var badPerform = {
    name:"Bad Perform",
    question: "Oh no, there’s no way Lana Alabama can go on stage like this! We need you to step in.",
    choices: ["Finale 1"],
    choice_actions: ['Zoinks'],
    video: null
}

var perform = {
    name:"Perform",
    question: "Wow, Lana Alabama looks amazing! Thank you for all of your help today, we couldn't have done it without you!!",
    choices: ["Finale 2"],
    choice_actions: ['Yippie!'],
    video: null
}

var finale1 = {
    name:"Finale 1",
    question: null,
    choices: ["Last"],
    choice_actions: null,
    video: 'vid10.mp4',
    volume: 0.2
}

var finale2 = {
    name:"Finale 2",
    question: null,
    choices: ["Last"],
    choice_actions: null,
    video: 'vid11.mp4',
    volume: 0.3
}

var last = {
    name:"Last",
    question: "Wait a minute...would you like to enter a raffle?",
    choices: ['Yes', 'No'],
    choice_actions: ['Yessiree', 'Nah, I\'m lame'],
    video: null
}

var playAgain = {
    name:"Play Again",
    question: "Would you like to play again?",
    choices: ['Start'],
    choice_actions: ['Why not?'],
    video: null
}

var events = [start,assignemnt,outfits,hair_makeup,fav_drink,coffee,pellegrino,upset,weed,shoes,nolike,like,badPerform,perform,finale1,finale2,last,playAgain];

// Start the game at the first event
// Be start screen
function init() {
    populateSelector();
    progressStory('start');
}

// Displays the video corresponding to the first video and plays it automatically
function displayEvent() {
    if(!currentEvent.video) {
        videoEndLogic();
        return;
    }
    vid.src = currentEvent.video;
    vid.volume = !currentEvent.volume ? 1 : currentEvent.volume;
    vid.autoplay = true;
    vid.load();
}

// Displays the form on top of the video
function displayForm() {
    var text = "";
    for(var choice in currentEvent.choices) {
        if(!currentEvent.choice_actions) {
            text += '<label><input type="radio" name="answer" value="' +  currentEvent.choices[choice] + '"/><span>' + currentEvent.choices[choice] + '</span></label>';
        }
        else {
            text += '<label><input type="radio" name="answer" value="' +  currentEvent.choices[choice] + '"/><span>' + currentEvent.choice_actions[choice] + '</span></label>';
        }
    }

    form.querySelector('p').innerHTML = currentEvent.question;
    form.querySelector('fieldset').innerHTML = text;
}

// Progress story based on the choice
function progressStory(choice) {
    hideButtons();
    currentEvent = events.find(e => {
        return e.name.toLowerCase() === choice.toLowerCase();
    });
    if(!currentEvent) {
        console.log("Could not find event because choice name was invalid!")
        return;
    }
    displayEvent();
}

function videoEndLogic() {
    if(!currentEvent.question) {
        // When there are multiple vids that aren't pieced together
        progressStory(currentEvent.choices[0]);
    }
    else {
        // Might display the prompt during the entire vid and after its done
        // Display the questions once the vid has ended
        displayForm();
        showButtons();
        // TODO: Add logic where the non selected choice fades out and the main choice stays for a bit (maybe, honestly not sure)
    }
}

// Logic for when the video ends
vid.addEventListener('ended', function() {
    videoEndLogic();
});

function hideButtons() {
    submit.style.display = "none";
    reset.style.display = "none";
    form.style.display = "none";
    selector_holder.style.display ="none";
}

function showButtons() {
    submit.style.display = "block";
    reset.style.display = "block";
    form.style.display = "block";
    if(testMode) {
        selector_holder.style.display ="block";
    }
}

function populateSelector() {
    var buttonText = '<a href="#" onclick="progressStory(\'event\')">event</a>'
    for(var event of events) {
        selector.innerHTML += buttonText.replace('event', event.name).replace('event', event.name);
    }
}

// Logic for when the submit button is pressed
submit.addEventListener('mouseup', function(){
    choice = form.querySelectorAll('input[type=radio]:checked')[0].value; 
    if(currentEvent.name.includes("Last")) {
        if(choice==='Yes') {
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSc8o9RvCXBCJHgcIRC6xrJ7XVwhpOwYPJByDbVa06KrsrsQpQ/viewform ', '_blank');
        }
        vid.removeAttribute('src'); // empty source
        vid.load();
        progressStory('play again');
        return;
    }

    if(choice) {
        progressStory(choice);
    }
  });

  // Go to beginning
function startEpisode(){
    progressStory('start');
}