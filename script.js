// ===============================
// CALORIFY – Lógica Premium
// ===============================

// Banco básico de calorias (pode expandir depois)
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
    const alimento = document.getElementById("alimento").value.trim().toLowerCase();
    const quantidade = parseFloat(document.getElementById("quantidade").value);

    // Verificação de preenchimento
    if (!alimento || isNaN(quantidade) || quantidade <= 0) {
        mostrarResultado("⚠️ Preencha os dados corretamente!");
        return;
    }

    // Verificação se o alimento existe
    if (!(alimento in tabelaCalorias)) {
        mostrarResultado("❌ Alimento não encontrado!");
        return;
    }

    // Cálculo
    const caloriasPor100g = tabelaCalorias[alimento];
    const resultado = (caloriasPor100g * quantidade) / 100;

    mostrarResultado(`🔥 ${resultado.toFixed(1)} calorias`);
}

// Exibir resultado com animação
function mostrarResultado(texto) {
    const divResultado = document.getElementById("resultado");
    divResultado.innerHTML = texto;
    divResultado.classList.add("ativo");

    // Remove animação depois de 1 segundo
    setTimeout(() => {
        divResultado.classList.remove("ativo");
    }, 1200);
}

// Listener do botão
document.getElementById("calcular").addEventListener("click", calcularCalorias);
// Clique para preencher automaticamente o alimento
document.querySelectorAll(".item").forEach(botao => {
    botao.addEventListener("click", () => {
        const nome = botao.getAttribute("data-alimento");
        document.getElementById("alimento").value = nome;
    });
});
