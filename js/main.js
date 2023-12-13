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
        lore_index = 0;
        if (lore_index == 0)
        {
            document.getElementById("popup").style.display = "block";
            document.getElementById("proceedBtn").addEventListener("click", function() {
                document.getElementById("popup").style.display = "none";
                document.getElementById('mainContent').style.display = 'block';
                game.lore_index++;
            });
        }

        document.getElementById("dirtAmount").innerHTML = game.dirt;
    }
}

function mineDirt()
{
    game.dirt = game.dirt.add(1);
    document.getElementById("dirtAmount").innerHTML = game.dirt;
}