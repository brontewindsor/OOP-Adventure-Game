const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)

}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)

    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)

        }


    })

}

function showOption(option) {

    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame ()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)



}

const textNodes = [

    {
        id: 1,
        text: "Are you ready to play?",
        options: [
            {
                text: "Yeah!",
                setState: { oilLamp: true }, 
                nextText: 2
            }, 
            {
                text: "Nope, too scared",
                nextText: 7
            }
        ]
    },
    {
        id: 2,
        text: "You wake up on the floor of a dark mysterious room. There is an oil lamp in the corner of the room",
        options: [
            {
                text: "Take lamp",
                setState: { oilLamp: true }, 
                nextText: 3
            }, 
            {
                text: "Don't take the lamp",
                setState: { oilLamp: false }, 
                nextText: 10
            }
        ]
    }, 
    {
        id: 3,
        text: "You leave the room and wander down the hall. You see a sword and shield on the floor. Your left arm is hurt, you can only carry one item",
        options: [
            {
                text: "Trade oil lamp for sword",
                requiredState: (currentState) => currentState.oilLamp,
                setState: { oilLamp: false, sword: true },
                nextText: 4
            },
            {
                text: "Trade oil lamp for shield",
                requiredState: (currentState) => currentState.oilLamp,
                setState: { oilLamp: false, shield: true},
                nextText: 44
            },
            {
                text: "Keep the oil lamp. Ignore the sword and shield",
                nextText: 11
            }

        ]

    },
    {
        id: 4,
        text: "You continue down the hall in complete darkness and see a glowing musical box with a key inside. As you reach to grab the key you hear something running towards you",
        options: [
            {
                text: "Wave you sword around hoping to hit whatever is running towards you",
                nextText: 99
            },
            {
                text: "Throw your sword at it",
                nextText: 404
            }
        ]

    },
    {
        id: 404,
        text: "You missed. Whaetever was running towards you tears your apart with it's teeth.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
        
    },

    


    {
        id: 44,
        text: "You continue down the hall in complete darkness and see a glowing musical box with a key inside. As you reach to grab the key you hear something running towards you",
        options: [
            {
                text: "Duck and use the shield to protect you",
                nextText: 9
            },
            {
                text: "Throw your shield at whatever is coming towards you",
                nextText: 9
            }
        ]

    },

   { id: 11,
                text: "By keeping the lamp you are able to see a door with an Exit sign, but the door is locked with padlock and chain",
                options: [
                    {
                        text: "Give up hope and take a nap",
                        nextText: 12
                    },
                    {
                        text: "Continue your quest for the key",
                        nextText: 5
                    },
                ]
            },
    {
        id: 5, 
        text: "As you walk further down the hall you see a glowing musical box with a key inside. You reach down to grab the key and drop your lamp. You have the key in your hand but are now in complete darkness",
        options: [ 
            {

            text: "Go back down the hall and try to find the door with the padlock",
            nextText: 6
        }, 
        {
            text: "The musical box is making me sleepy, I'll take a nap",
            nextText: 12
        }

            
        ]
    },
    {
        id: 6, 
        text: "You find the door, but on your way you trip over a sword and sheild. The noise woke a werewolf, who is now running down the hall towards you",
        options: [
            {
                text: "Pick up the sword to kill the werewolf",
                nextText: 8
            },
            {
                text: "Pick up the shield to protect yourself",
                nextText: 9
            },
            {
                text: "Use the key to unlock the padlock and open the door",
                nextText: 13
            }
        ]
    },
    {
        id: 8, 
        text: "You kill the werewolf. You scramble to the door and use the key to escape. You win!",
    },
    {
        id: 9,
        text: "The werewolf smashes through the shield and gobbles you up. Game over",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
        
    },
    {
        id: 99,
        text: "Good aim! Whatever was running towards you changes direction and runs away. You grab the key from the box and continue on with your quest",
        options: [
            {
                text: "Grab the key from the box and continue on with your quest",
                nextText: -1
            },
            {
                text: "Grab the key from the box and continue on with your quest",
                nextText: -1
            }
        ]
        
    },
   
  
    {
        id: 13,
        text: "You couldn't open the door quick enough. The werewolf gobbled you up",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]     

        
    },  
    {
        id: 7,
        text: "Sorry to hear that scaredy cat, come back when you're feeling brave enough",
        
    },
    {
        id: 10, 
        text: "You leave the room and are now walking down a hall in complete darkness. You trip and fall down some stairs. You dead. Game over.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
                
    },
    {
        id: 12,
        text: "Whilst you were napping a werewolf came and ate you. Game over",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
        
    },

    


]

startGame()