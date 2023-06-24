//game currencies
var game = {
    lastSave: 0,
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
    localStorage.setItem("grimeSave", JSON.stringify(game));
    localStorage.setItem("grimeLastSaved", game.lastSave);
}

function load()
{
    var savegame = JSON.parse(localStorage.getItem("grimeSave"));;
    var lastSave = localStorage.getItem("grimeLastSaved");
    if (savegame !== null)
    {
        //set each variable in the savegame to the game
        for (var i in savegame)
        {
            game[i] = new Decimal(savegame[i]);
        }

        document.getElementById("dirtAmount").innerHTML = game.dirt;
    }
}

function mineDirt()
{
    game.dirt = game.dirt.add(1);
    document.getElementById("dirtAmount").innerHTML = game.dirt;
}