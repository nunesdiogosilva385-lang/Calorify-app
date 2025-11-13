function calcular() {
    const nomeAlimento = document.getElementById("nome").value.toLowerCase();
    const quantidade = parseFloat(document.getElementById("quantidade").value);
    const resultado = document.getElementById("resultado");

    const alimentos = {
        "arroz": 130,
        "frango": 165,
        "ovo": 70,
        "maçã": 52,
        "banana": 89,
        "feijão": 140,
        "batata": 77
    };

    if (!alimentos[nomeAlimento]) {
        resultado.innerHTML = "❌ Alimento não encontrado.";
        return;
    }

    const caloriasPor100g = alimentos[nomeAlimento];
    const total = (quantidade / 100) * caloriasPor100g;

    resultado.innerHTML = `🔥 Total: <strong>${total.toFixed(2)} kcal</strong>`;
}
