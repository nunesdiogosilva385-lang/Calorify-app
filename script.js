// ==== Tabela de calorias por 100g ====
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

// ==== Função principal ====
function calcularCalorias() {
    const alimento = document.getElementById("alimento").value.trim().toLowerCase();
    const quantidade = parseFloat(document.getElementById("quantidade").value);
    const resultadoDiv = document.getElementById("resultado");

    if (!alimento || isNaN(quantidade) || quantidade <= 0) {
        resultadoDiv.innerHTML = "⚠️ Preencha os dados corretamente!";
        return;
    }

    if (!(alimento in tabelaCalorias)) {
        resultadoDiv.innerHTML = "❌ Alimento não encontrado na tabela.";
        return;
    }

    const caloriasPor100g = tabelaCalorias[alimento];
    const resultado = (caloriasPor100g * quantidade) / 100;

    resultadoDiv.innerHTML = `🔥 ${resultado.toFixed(1)} calorias`;
    resultadoDiv.style.animation = "brilho 1s ease";
}

// ==== Botão principal ====
document.getElementById("calcular").addEventListener("click", calcularCalorias);

// ==== Clique nos botões da lista recomendada ====
document.querySelectorAll(".item").forEach(button => {
    button.addEventListener("click", () => {
        const alimento = button.getAttribute("data-alimento");
        document.getElementById("alimento").value = alimento;
    });
});
