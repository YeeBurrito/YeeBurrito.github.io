//game currencies
var game = {
    dirt: new Decimal(0)
};

function mineDirt()
{
    game.dirt = game.dirt.add(1);
    document.getElementById("dirtAmount").innerHTML = game.dirt;
}