function calcularCalorias() {
    const alimento = document.getElementById("alimento").value;
    const quantidade = document.getElementById("quantidade").value;
    const resultado = document.getElementById("resultado");

    if (alimento === "" || quantidade === "") {
        resultado.innerHTML = "Preencha todos os campos!";
        return;
    }

    // Exemplo de tabela simples (você pode ampliar depois)
    const tabelaCalorias = {
        "arroz": 130,
        "feijão": 80,
        "frango": 165,
        "ovo": 70,
        "maçã": 52
    };

    const caloriasPor100g = tabelaCalorias[alimento.toLowerCase()];

    if (!caloriasPor100g) {
        resultado.innerHTML = "Alimento não encontrado!";
        return;
    }

    const total = (quantidade * caloriasPor100g) / 100;

    resultado.innerHTML = `Total: <strong>${total.toFixed(1)} kcal</strong>`;
}
