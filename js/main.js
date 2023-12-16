//game currencies
var game = {
    lastSave: 0,
    lore_index: 0,
    dirt: new Decimal(0)
};

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
        for (var i in savegame)
        {
            game[i] = new Decimal(savegame[i]);
        }
        
        lore_index = game.lore_index;
        if (lore_index == 0)
        {
            document.getElementById("popup").style.display = "block";
            document.getElementById("popupText").innerHTML = "<p>In the mystical realm of IDK bruh, where magic and mystery intertwine, an ancient prophecy echoes through the ages. You, adventurer, have been chosen by destiny to unveil the secrets hidden deep within the IDK bruh Abyss.</p><p>As you stand at the entrance of the enchanted mine, the ethereal voices of the Elders resonate in your mind, guiding you on a quest of unparalleled significance. The IDK bruh Abyss, sealed by the Shattering eons ago, holds the key to unimaginable riches and arcane power.</p><p>Brave the treacherous depths, mine rare materials, and uncover the lost history of IDK bruh. The choices you make will shape the fate of this realm and determine whether magic will once again flourish or fade into obscurity.</p><p>Forge your legacy, adventurer, and let the Chronicles of IDK bruh unfold as you embark on the epic journey that awaits within the IDK bruh Abyss.</p>";
            document.getElementById("proceedBtn").addEventListener("click", function() {
                document.getElementById("popup").style.display = "none";
                document.getElementById('mainContent').style.display = 'flex';
                game.lore_index++;
            });
        }
        else
        {
            document.getElementById('mainContent').style.display = 'flex';
        }

        document.getElementById("dirtAmount").innerHTML = game.dirt;
    }
}

function mineDirt()
{
    game.dirt = game.dirt.add(1);
    document.getElementById("dirtAmount").innerHTML = game.dirt;
}