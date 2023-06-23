//game currencies
var dirt = new Decimal(0);

function mineDirt()
{
    dirt.add(1);
    document.getElementById("dirt").innerHTML = dirt;
}