// Função principal para calcular calorias
function calcularCalorias() {
    const alimento = document.getElementById("alimento").value;
    const quantidade = document.getElementById("quantidade").value;

    if (alimento.trim() === "" || quantidade === "") {
        alert("Preencha os campos corretamente!");
        return;
    }

    const kcalPor100g = {
        "Arroz": 130,
        "Feijão": 95,
        "Frango": 165,
        "Ovo": 155,
        "Batata": 86,
        "Maçã": 52
    };

    const kcal = (kcalPor100g[alimento] * quantidade) / 100;

    document.getElementById("resultado").innerHTML =
        `<strong>${alimento}</strong> (${quantidade}g) possui <strong>${kcal.toFixed(1)} kcal</strong>.`;
}
