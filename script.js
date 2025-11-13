// Banco de dados básico de calorias por 100g
const tabelaCalorias = {
    "arroz": 130,
    "frango": 165,
    "maçã": 52,
    "banana": 89,
    "ovo": 155,
    "pão": 265,
    "batata": 86,
    "feijão": 140,
    "carne": 250,
    "abacate": 160,
    "cenoura": 41,
    "tomate": 18
};

// Função principal
function calcularCalorias() {
    const alimento = document.getElementById("alimento").value.toLowerCase().trim();
    const quantidade = parseFloat(document.getElementById("quantidade").value);

    if (!alimento || isNaN(quantidade) || quantidade <= 0) {
        mostrarResultado("⚠️ Preencha os dados corretamente.");
        return;
    }

    if (!(alimento in tabelaCalorias)) {
        mostrarResultado("❌ Alimento não encontrado na base de dados.");
        return;
    }

    const caloriasPor100g = tabelaCalorias[alimento];
    const resultado = (caloriasPor100g * quantidade) / 100;

    mostrarResultado(`🔥 ${resultado.toFixed(1)} calorias`);
}

// Função para exibir o resultado
function mostrarResultado(texto) {
    const divResultado = document.getElementById("resultado");
    divResultado.style.animation = "brilho 1s infinite alternate";
    divResultado.innerHTML = texto;
}
