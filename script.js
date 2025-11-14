// ========================================================
//  CALORIFY - SCRIPT COMPLETO (COM FUNÇÃO DE TIRAR FOTO)
// ========================================================

// Lista de alimentos padrão
const alimentosBase = {
  "Arroz": 130,
  "Feijão": 95,
  "Frango grelhado": 165,
  "Ovo cozido": 78,
  "Maçã": 52,
  "Banana": 89,
  "Batata cozida": 87
};

// Inicialização do APP
(function () {
  let alimentos = { ...alimentosBase };

  function init() {
    const alim = document.getElementById("alimento");
    const qtd = document.getElementById("quantidade");
    const btn = document.getElementById("calcular");
    const hist = document.getElementById("historico");

    // Preencher lista de alimentos
    for (let nome in alimentos) {
      const op = document.createElement("option");
      op.value = nome;
      op.textContent = nome;
      alim.appendChild(op);
    }

    // Evento Calcular
    btn.addEventListener("click", () => {
      const nome = alim.value;
      const gramas = parseFloat(qtd.value);

      if (!nome || !gramas) {
        alert("Preencha o nome do alimento e a quantidade!");
        return;
      }

      const kcal100g = alimentos[nome] || 0;
      const total = (kcal100g / 100) * gramas;

      const item = document.createElement("div");
      item.className = "hist-item";
      item.textContent = `${nome} (${gramas}g): ${total.toFixed(1)} kcal`;

      hist.prepend(item);
    });

    // Sugestões Automáticas
    if (!document.getElementById("lista-sugestoes")) {
      const dl = document.createElement("datalist");
      dl.id = "lista-sugestoes";

      for (let nome in alimentos) {
        const opt = document.createElement("option");
        opt.value = nome;
        dl.appendChild(opt);
      }

      document.body.appendChild(dl);
      alim.setAttribute("list", "lista-sugestoes");
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();


// ========================================================
//  📸 FUNÇÃO DE TIRAR FOTO + ENVIAR PARA IA DE CALORIAS
// ========================================================

// Quando clicar no botão → abre a câmera
document.getElementById('btn-foto').addEventListener('click', () => {
  document.getElementById('input-camera').click();
});

// Quando a foto for tirada
document.getElementById('input-camera').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Mostrar prévia da foto
  const preview = document.getElementById('preview');
  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";

  // Enviar foto para IA
  const calories = await analyzeFoodPhoto(file);

  if (!calories) {
    alert("Não foi possível identificar o alimento. Tente outra foto.");
    return;
  }

  alert("Calorias estimadas: " + calories + " kcal");
});


// Função que envia a foto para API calorias.js
async function analyzeFoodPhoto(file) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("/api/calorias", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    return result.calories;

  } catch (e) {
    console.error("Erro ao analisar foto:", e);
    return null;
  }
}
