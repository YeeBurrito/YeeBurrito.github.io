//game currencies
var game = {
    lastSave: 0,
    progressIndex: 0,
    infoTextProgressIndex: 1,
    infoTextLocation: 0,
    resources: {
        dirt: new Decimal(0),
    }
};

//game lore texts
const infoText = [
    "In the mystical realm of IDK bruh, where magic and mystery intertwine, an ancient prophecy echoes through the ages. You, adventurer, have been chosen by destiny to unveil the secrets hidden deep within the IDK bruh Abyss. As you stand at the entrance of the enchanted mine, the ethereal voices of the Elders resonate in your mind, guiding you on a quest of unparalleled significance. The IDK bruh Abyss, sealed by the Shattering eons ago, holds the key to unimaginable riches and arcane power. Brave the treacherous depths, mine rare materials, and uncover the lost history of IDK bruh. The choices you make will shape the fate of this realm and determine whether magic will once again flourish or fade into obscurity. Forge your legacy, adventurer, and let the Chronicles of IDK bruh unfold as you embark on the epic journey that awaits within the IDK bruh Abyss.",
    "This is the third lore text."
];
const popupText = [
    "In the mystical realm of IDK bruh, where magic and mystery intertwine, an ancient prophecy echoes through the ages. You, adventurer, have been chosen by destiny to unveil the secrets hidden deep within the IDK bruh Abyss.</p><p>As you stand at the entrance of the enchanted mine, the ethereal voices of the Elders resonate in your mind, guiding you on a quest of unparalleled significance. The IDK bruh Abyss, sealed by the Shattering eons ago, holds the key to unimaginable riches and arcane power.</p><p>Brave the treacherous depths, mine rare materials, and uncover the lost history of IDK bruh. The choices you make will shape the fate of this realm and determine whether magic will once again flourish or fade into obscurity.</p><p>Forge your legacy, adventurer, and let the Chronicles of IDK bruh unfold as you embark on the epic journey that awaits within the IDK bruh Abyss.",
];

setInterval(updateSeconds, 1000)

//update the game every second
function updateSeconds()
{
    save();
}

function save()
{
    game.lastSave = Date.now();
    localStorage.setItem("localSave", JSON.stringify(game));
    localStorage.setItem("localLastSaved", game.lastSave);
}

function load()
{
    var savegame = JSON.parse(localStorage.getItem("localSave"));;
    var lastSave = localStorage.getItem("localLastSaved");
    if (savegame !== null)
    {
        //set each variable in the savegame to the game
        game.progressIndex = savegame.progressIndex;
        game.infoTextProgressIndex = savegame.infoTextProgressIndex;
        game.infoTextLocation = savegame.infoTextLocation;
        if (savegame.infoTextLocation == null || savegame.infoTextLocation == undefined)
        {
            game.infoTextLocation = 1;
        }

        //convert each resource to a Decimal
        for (var key in savegame.resources)
        {
            game.resources[key] = new Decimal(savegame.resources[key]);
        }
        
        if (game.progressIndex == 0)
        {
            document.getElementById("popup").style.display = "block";
            document.getElementById("popupText").innerHTML = popupText[game.progressIndex];
            document.getElementById("proceedBtn").addEventListener("click", function() {
                document.getElementById("popup").style.display = "none";
                document.getElementById('mainContent').style.display = 'flex';
                game.progressIndex++;
                game.infoTextProgressIndex = 1;
            });
        }
        else
        {
            document.getElementById('mainContent').style.display = 'flex';
        }

        if (game.progressIndex < 2)
        {
           document.getElementById("townTab").style.display = "none";
        }
        if (game.progressIndex < 3)
        {
            document.getElementById("upgradesTab").style.display = "none";
        }
        
        displayInfoText(game.infoTextLocation)
        document.getElementById("dirtAmount").innerHTML = game.resources.dirt;
        showTab('mine');
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
    game.resources.dirt = game.resources.dirt.add(1);
    document.getElementById("dirtAmount").innerHTML = game.resources.dirt;
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

function showTab(tabName)
{
    var tab = document.getElementsByClassName("tab");
    for (var i = 0; i < tab.length; i++)
    {
        tab[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}