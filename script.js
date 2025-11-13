// ===== Tabela básica (você pode editar/expandir) =====
const tabelaCalorias = {
  arroz:130, frango:165, "maçã":52, banana:89, ovo:155,
  pão:265, batata:86, feijão:140, carne:250, abacate:160,
  cenoura:41, tomate:18, arrozintegral:123
};

// Recomendados (labels que aparecem como chips)
const recomendados = ["arroz","frango","maçã","banana","ovo","carne"];

// === DOM ===
const inputAlimento = document.getElementById("alimento");
const inputQuantidade = document.getElementById("quantidade");
const btn = document.getElementById("calcular");
const resultadoDiv = document.getElementById("resultado");
const chipsDiv = document.getElementById("chips");
const datalist = document.getElementById("sugestoes");
const listaHistorico = document.getElementById("listaHistorico");
const limparHistoricoBtn = document.getElementById("limparHistorico");

// Preenche datalist e chips
function montarSugestoes() {
  // datalist
  Object.keys(tabelaCalorias).forEach(k => {
    const option = document.createElement("option");
    option.value = k;
    datalist.appendChild(option);
  });

  // chips
  recomendados.forEach(item => {
    const b = document.createElement("button");
    b.className = "chip";
    b.textContent = item;
    b.addEventListener("click", ()=> {
      inputAlimento.value = item;
      inputQuantidade.focus();
    });
    chipsDiv.appendChild(b);
  });
}

// Histórico via localStorage
const KEY = "calorify_historico";
function carregarHistorico(){
  const arr = JSON.parse(localStorage.getItem(KEY) || "[]");
  listaHistorico.innerHTML = "";
  arr.slice().reverse().forEach(entry => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${entry.text}</span> <small style="opacity:.6">${entry.when}</small>`;
    listaHistorico.appendChild(li);
  });
}
function salvarHistorico(text){
  const arr = JSON.parse(localStorage.getItem(KEY) || "[]");
  arr.push({text, when: new Date().toLocaleString()});
  localStorage.setItem(KEY, JSON.stringify(arr));
  carregarHistorico();
}
limparHistoricoBtn?.addEventListener("click", ()=> {
  localStorage.removeItem(KEY);
  carregarHistorico();
});

// Função principal
function mostrarResultado(text){
  resultadoDiv.textContent = text;
}
function calcular() {
  const alimento = (inputAlimento.value || "").trim().toLowerCase().replace(/\s+/g,"");
  const quantidade = parseFloat(inputQuantidade.value);
  if(!alimento || isNaN(quantidade) || quantidade <= 0){
    mostrarResultado("⚠️ Preencha os dados corretamente.");
    return;
  }
  if(!(alimento in tabelaCalorias)){
    mostrarResultado("❌ Alimento não encontrado. Tente um recomendado.");
    return;
  }
  const por100 = tabelaCalorias[alimento];
  const resultado = (por100 * quantidade) / 100;
  const texto = `🔥 ${resultado.toFixed(1)} calorias — ${quantidade}g de ${alimento}`;
  mostrarResultado(texto);
  salvarHistorico(texto);
}

// Bind
btn.addEventListener("click", calcular);
inputQuantidade.addEventListener("keydown", e => { if(e.key === "Enter") calcular(); });

// init
montarSugestoes();
carregarHistorico();
