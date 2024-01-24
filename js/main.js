//game currencies
var game = {
    lastSave: 0,
    progressIndex: -1,
    infoTextProgressIndex: 0,
    infoTextLocation: 0,
    resources: {
        gold: new Decimal(0),
        dirt: new Decimal(0),
    },
    buyables: {
        dirtMiners: {
            cost: new Decimal(10),
            amount: new Decimal(0),
            costIncrease: new Decimal(1.4),
            dirtPerSecond: new Decimal(0.1)
        },
        dirtUpgrades: {
            cost: new Decimal(10),
            powerAmount: new Decimal(0),
            speedAmount: new Decimal(0),
            costIncrease: new Decimal(1.3),
            dirtMiningSpeed: new Decimal(5), //amount of time in seconds to mine dirt
            dirtMiningSpeedScaling: new Decimal(0.9),
            dirtMiningPower: new Decimal(1),
            dirtMiningPowerScaling: new Decimal(1.1)
        }
    }
};

//game lore texts
const infoText = [
    "In the mystical realm of IDK bruh, where magic and mystery intertwine, an ancient prophecy echoes through the ages. You, adventurer, have been chosen by destiny to unveil the secrets hidden deep within the IDK bruh Abyss. As you stand at the entrance of the enchanted mine, the ethereal voices of the Elders resonate in your mind, guiding you on a quest of unparalleled significance. The IDK bruh Abyss, sealed by the Shattering eons ago, holds the key to unimaginable riches and arcane power. Brave the treacherous depths, mine rare materials, and uncover the lost history of IDK bruh. The choices you make will shape the fate of this realm and determine whether magic will once again flourish or fade into obscurity. Forge your legacy, adventurer, and let the Chronicles of IDK bruh unfold as you embark on the epic journey that awaits within the IDK bruh Abyss.",
    "As you delve deeper into the mine, you begin to notice a peculiar glow emanating from the tenth clump of dirt you unearth. Examining it closely, you discover that this dirt harbors slightly magical properties, shimmering with an ethereal essence. Curiosity guiding your steps, you ascend from the mine's depths and emerge into the daylight. Before you stretches a quaint town, its cobblestone streets lined with shops and stalls. The townsfolk, unaware of the enchantment hidden beneath the surface, greet you with friendly smiles and curious glances.Your newfound magical dirt becomes a topic of interest among the townspeople. Eager to learn more, you engage in conversations with the locals. It doesn't take long before you stumble upon a seasoned merchant who recognizes the unique properties of your unearthed resources. The merchant introduces you to the town's marketplace, where you can trade your magical dirt and other treasures for precious gold. The town offers various services and upgrades, allowing you to enhance your mining abilities and make your subterranean endeavors even more fruitful."
];
const popupText = [
    "In the mystical realm of IDK bruh, where magic and mystery intertwine, an ancient prophecy echoes through the ages. You, adventurer, have been chosen by destiny to unveil the secrets hidden deep within the IDK bruh Abyss.</p><p>As you stand at the entrance of the enchanted mine, the ethereal voices of the Elders resonate in your mind, guiding you on a quest of unparalleled significance. The IDK bruh Abyss, sealed by the Shattering eons ago, holds the key to unimaginable riches and arcane power.</p><p>Brave the treacherous depths, mine rare materials, and uncover the lost history of IDK bruh. The choices you make will shape the fate of this realm and determine whether magic will once again flourish or fade into obscurity.</p><p>Forge your legacy, adventurer, and let the Chronicles of IDK bruh unfold as you embark on the epic journey that awaits within the IDK bruh Abyss.",
    "You have unlocked the town tab.",
];

setInterval(updateSeconds, 1000)
setInterval(update, 50)

//update the game every second
function updateSeconds()
{
    save();
    checkProgress();
}

//update the game every 50 milliseconds
function update()
{
    //update the display of each resource
    for (var key in game.resources)
    {
        document.getElementById(key + "Amount").innerHTML = game.resources[key];
    }
}

function save()
{
    game.lastSave = Date.now();
    localStorage.setItem("localSave", JSON.stringify(game));
    localStorage.setItem("localLastSaved", game.lastSave);
}

function resetSave()
{
    localStorage.removeItem("localSave");
    localStorage.removeItem("localLastSaved");
    location.reload();
}

function load()
{
    var savegame = JSON.parse(localStorage.getItem("localSave"));;
    var lastSave = localStorage.getItem("localLastSaved");
    if (savegame == null)
    {
        game = game;
        save();
        location.reload();
    }
    else
    {
        //set each variable in the savegame to the game
        game.progressIndex = savegame.progressIndex;
        game.infoTextProgressIndex = savegame.infoTextProgressIndex;
        game.infoTextLocation = savegame.infoTextLocation;
        if (savegame.infoTextLocation == null || savegame.infoTextLocation == undefined)
        {
            game.infoTextLocation = 0;
        }

        //convert each resource to a Decimal
        for (var key in savegame.resources)
        {
            game.resources[key] = new Decimal(savegame.resources[key]);
        }
        
        if (game.progressIndex == -1)
        {
            document.getElementById("popup").style.display = "block";
            document.getElementById("popupText").innerHTML = popupText[0];
            document.getElementById("proceedBtn").addEventListener("click", function() {
                document.getElementById("popup").style.display = "none";
                document.getElementById('mainContent').style.display = 'flex';
                if (game.progressIndex == -1)
                {
                    game.progressIndex = 0;
                }
            });
        }
        else
        {
            document.getElementById('mainContent').style.display = 'flex';
        }

        if (game.progressIndex < 1)
        {
           document.getElementById("townTab").style.display = "none";
        }
        if (game.progressIndex < 2)
        {
            document.getElementById("upgradesTab").style.display = "none";
        }
        
        displayInfoText(game.infoTextLocation)
        document.getElementById("dirtAmount").innerHTML = game.resources.dirt;
        showTab('mine');
    }
}

function checkProgress()
{
    currentProgressIndex = game.progressIndex;
    let progressConditions = [
        function() { return game.resources.dirt.cmp(10) >= 0;},
    ];

    if (currentProgressIndex < progressConditions.length && typeof progressConditions[currentProgressIndex] === 'function') {
        if (progressConditions[currentProgressIndex]()) {
            game.progressIndex++;
            game.infoTextProgressIndex++;
            document.getElementById("popup").style.display = "block";
            document.getElementById("popupText").innerHTML = popupText[game.progressIndex];
            displayInfoText(game.infoTextLocation);
            updateProgress(game.progressIndex);
        }
    }
}

function updateProgress(progressIndex)
{
    let progressUpdates = [
        function() { //Progress 0, doesnt do anything
        },
        function() { //Progress 1, unlocks the town tab
            document.getElementById("townTab").style.display = "block";
        }
    ];
    for (var i = 0; i < progressUpdates.length; i++)
    {
        if (i == progressIndex)
        {
            progressUpdates[i]();
        }
    }
}

function showTab(tabName)
{
    var tabContent = document.getElementsByClassName("tabContent");
    for (var i = 0; i < tabContent.length; i++)
    {
        tabContent[i].style.display = "none";
    }

    document.getElementById(tabName).style.display = "block";
}

async function mineResources()
{
    var loadingBar = document.getElementById("loadingBar");
    document.getElementById("mineBtn").disabled = true;

    // Reset the loading bar
    loadingBar.style.width = "0";

    // Set the loading duration (in seconds)
    var duration = 5;

    // Calculate the increment for each iteration
    var increment = 100 / (duration * 10);

    // Start loading
    await simulateAsyncLoading(loadingBar, increment);

    // Enable the button
    document.getElementById("mineBtn").disabled = false;
    loadingBar.style.width = "0";

    // Loading complete
    addResources();
}

function simulateAsyncLoading(loadingBar, increment)
{
    return new Promise(resolve => {
        // Simulate an asynchronous task using setTimeout
        const loadingInterval = setInterval(() =>
        {
            loadingBar.style.width = parseFloat(loadingBar.style.width) + increment + "%";
  
            // Check if loading is complete
            if (parseFloat(loadingBar.style.width) >= 100)
            {
                clearInterval(loadingInterval);
                resolve();
            }
        }, 100);
    });
}

function addResources()
{
    //TODO: add code to figure out what types of resources to add based on what is unlocked
    //For now, it just adds dirt
    addDirt();
}

function addDirt()
{
    game.resources.dirt = game.resources.dirt.add(game.buyables.dirtUpgrades.dirtMiningPower);
}

function displayInfoText(textIndex)
{
    document.getElementById("infoText").textContent = infoText[textIndex];
    /* display the previous or next buttons if they are needed */
    if (game.infoTextLocation == 0)
    {
        document.getElementById("backwardBtn").disabled = true;
    }
    else
    {
        document.getElementById("backwardBtn").disabled = false;
    }
    if (game.infoTextLocation == game.infoTextProgressIndex)
    {
        document.getElementById("forwardBtn").disabled = true;
    }
    else
    {
        document.getElementById("forwardBtn").disabled = false;
    }
}

function prevInfoText()
{
    if (game.infoTextLocation > 0)
    {
        game.infoTextLocation--;
        displayInfoText(game.infoTextLocation);
    }
}

function nextInfoText()
{
    if (game.infoTextLocation < game.infoTextProgressIndex)
    {
        game.infoTextLocation++;
        displayInfoText(game.infoTextLocation);
    }
}