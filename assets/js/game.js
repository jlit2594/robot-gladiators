

var fight = function(enemy) {
    while(playerInfo.health > 0 && enemy.health > 0) {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    if (promptFight === "fight" || promptFight === "FIGHT") {
        // remove enemy's health by subtracting the amount set in the payerAttack variable
        enemy.health =  Math.max(0, enemy.health - playerInfo.attack);
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        //check enemy health

        if (enemy.health <=0) {
            window.alert(enemy.name + " has died!");
            break;
            
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        //remove player health by subtracting the amount set in the enemy.attack variable
        var damage = randomNumber(enemy.attack -3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        //check player health
        if(playerInfo.health <=0) {
            window.alert(playerInfo.name + " has died!");
            break;

        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }

        //if player chooses to skip
    } if (promptFight === "skip" || promptFight === "SKIP") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            //subtract money
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("playerInfo.money", playerInfo.money);
            break;
        }

        //if no (false), ask question again
        else {
            fight();
        }
    }   
    }
};

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() { 
        if (this.money >= 7) {
            window.alert("Upgrading player's attack for $7.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough mopney!");
        }
    }
};


var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

var startGame = function() {
    // reset player stats
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++) {
    var pickedEnemyObj = enemyInfo[i];
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    pickedEnemyObj.health = randomNumber(40, 60);
    fight(pickedEnemyObj);

    if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask the player
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round");

        //if yes, take them to the store function
        if (storeConfirm) {
        shop();
        }
    }

    if (playerInfo.health > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
        debugger;
        var pickedEnemyObj = enemyNames[i];

        enemy.health = 50;
        // debugger;

        fight(pickedEnemyObj);
    } else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
}

startGame();
// after the loop ends, player is either out of health or enemies to fight, so run the endGame function
endGame();
};



var endGame = function() {
    //if the player is still alive, player wins
    if (playerInfo.health > 0) {
        window.alert("Great job! You've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
    
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

var shop = function() {
    // ask the player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    )
    switch (shopOptionPrompt) {

        case "REFILL": // new case
        case "refill":
            playerInfo.refillHealth();
            break;

        case "UPGRADE": //new case
        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        case "LEAVE": //new case
        case "leave":
            window.alert("Leaving the store.");
            //do nothing, the function will end
            break;
        default:
            window.alert("You did not pick a valid option, try again.");

            //call shop() again to force player to pick a valid option
            shop();
            break;
    }
};



startGame ();