/* script.js - Calorify
   - Lista de alimentos recomendados (calorias por 100g)
   - Renderiza botões recomendados
   - Função de cálculo
   - Histórico salvo em localStorage (últimos 20)
   - Compatível com seu HTML atual (usa .app, #alimento, #quantidade, #calcular, #resultado)
*/

(() => {
  // --- Dados de alimentos (calorias por 100g)
  const tabelaCalorias = {
    arroz: 130,
    frango: 165,
    "maçã": 52,
    maca: 52, // alternativa sem acento
    banana: 89,
    ovo: 155,
    pao: 265,
    pão: 265,
    batata: 86,
    feijao: 140,
    feijão: 140,
    carne: 250,
    abacate: 160,
    cenoura: 41,
    tomate: 18,
    queijo: 350,
    leite: 42,
    peixe: 206
  };

  // Lista recomendada e emojis (ordem)
  const recomendados = [
    { chave: "arroz", label: "Arroz", emoji: "🍚" },
    { chave: "frango", label: "Frango", emoji: "🍗" },
    { chave: "banana", label: "Banana", emoji: "🍌" },
    { chave: "maca", label: "Maçã", emoji: "🍎" },
    { chave: "ovo", label: "Ovo", emoji: "🥚" },
    { chave: "batata", label: "Batata", emoji: "🥔" },
    { chave: "feijao", label: "Feijão", emoji: "🥫" },
    { chave: "carne", label: "Carne", emoji: "🥩" }
  ];

  // --- Helpers DOM
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // Ensure app container exists
  const appEl = document.querySelector(".app") || document.body;

  // Create recommended & history containers if não existirem
  function ensureContainers() {
    if (!$("#recomendados")) {
      const h = document.createElement("h2");
      h.id = "recomendados-titulo";
      h.innerText = "🍏 Alimentos recomendados";
      h.style.marginTop = "36px";
      appEl.appendChild(h);

      const cont = document.createElement("div");
      cont.id = "recomendados";
      cont.style.margin = "8px 0 24px 0";
      appEl.appendChild(cont);
    }

    if (!$("#historico-titulo")) {
      const h2 = document.createElement("h2");
      h2.id = "historico-titulo";
      h2.innerText = "🕘 Histórico de cálculos";
      h2.style.marginTop = "18px";
      appEl.appendChild(h2);

      const hist = document.createElement("div");
      hist.id = "historico";
      hist.style.margin = "8px 0 24px 0";
      appEl.appendChild(hist);
    }
  }

  // --- Render recommended buttons
  function renderRecomendados() {
    const cont = $("#recomendados");
    cont.innerHTML = "";
    recomendados.forEach(item => {
      const btn = document.createElement("button");
      btn.className = "alimentobotao";
      btn.type = "button";
      btn.dataset.chave = item.chave;
      btn.innerText = `${item.emoji} ${item.label}`;
      btn.style.margin = "6px 6px 6px 0";
      btn.style.padding = "6px 10px";
      btn.style.borderRadius = "8px";
      btn.style.border = "1px solid rgba(0,0,0,0.08)";
      btn.style.background = "transparent";
      btn.style.cursor = "pointer";
      btn.onclick = () => {
        const alim = $("#alimento");
        if (alim) {
          alim.value = item.label;
          alim.focus();
        }
      };
      cont.appendChild(btn);
    });
  }

  // --- Histórico (localStorage)
  const HIST_KEY = "calorify_historico_v1";

  function loadHistorico() {
    try {
      const raw = localStorage.getItem(HIST_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  function saveHistorico(lista) {
    try {
      localStorage.setItem(HIST_KEY, JSON.stringify(lista.slice(0, 50)));
    } catch (e) {}
  }

  function renderHistorico() {
    const histEl = $("#historico");
    if (!histEl) return;
    const lista = loadHistorico();
    histEl.innerHTML = "";
    if (lista.length === 0) {
      histEl.innerHTML = "<i>Nenhum cálculo ainda.</i>";
      return;
    }

    lista.slice(0, 20).forEach((item, idx) => {
      const row = document.createElement("div");
      row.className = "hist-row";
      row.style.display = "flex";
      row.style.justifyContent = "space-between";
      row.style.alignItems = "center";
      row.style.padding = "6px 8px";
      row.style.borderRadius = "8px";
      row.style.marginBottom = "6px";
      row.style.background = "rgba(255,255,255,0.02)";

      const left = document.createElement("div");
      left.style.cursor = "pointer";
      left.innerHTML = `<strong>${item.alimento}</strong> — ${item.quantidade} g`;
      left.onclick = () => {
        // carregar no formulário
        const alim = $("#alimento");
        const qtd = $("#quantidade");
        if (alim) alim.value = item.alimento;
        if (qtd) qtd.value = item.quantidade;
      };

      const right = document.createElement("div");
      right.style.textAlign = "right";
      right.innerHTML = `<small>${item.resultado} kcal</small><br><small style="opacity:.7">${new Date(item.ts).toLocaleString()}</small>`;

      // botão de excluir
      const del = document.createElement("button");
      del.type = "button";
      del.innerText = "✖";
      del.title = "Remover do histórico";
      del.style.marginLeft = "10px";
      del.onclick = (ev) => {
        ev.stopPropagation();
        const lista = loadHistorico();
        lista.splice(idx, 1);
        saveHistorico(lista);
        renderHistorico();
      };

      const rightWrap = document.createElement("div");
      rightWrap.appendChild(right);
      rightWrap.appendChild(del);

      row.appendChild(left);
      row.appendChild(rightWrap);
      histEl.appendChild(row);
    });
  }

  // --- Mostrar resultado
  function mostrarResultado(texto) {
    const div = $("#resultado");
    if (!div) return;
    div.innerHTML = texto;
    div.style.padding = "12px";
    div.style.borderRadius = "8px";
    div.style.marginTop = "16px";
    div.style.fontSize = "1.05rem";
    div.style.background = "linear-gradient(90deg, rgba(0,255,140,0.06), rgba(0,255,140,0.03))";
    div.style.border = "1px solid rgba(0,255,140,0.18)";
    // animação simples
    div.style.transition = "transform .18s ease, opacity .18s ease";
    div.style.transform = "translateY(-6px)";
    div.style.opacity = "0";
    requestAnimationFrame(() => {
      div.style.transform = "translateY(0)";
      div.style.opacity = "1";
    });
  }

  // --- Cálculo principal
  function calcularCalorias() {
    const alimEl = $("#alimento");
    const qtdEl = $("#quantidade");
    if (!alimEl || !qtdEl) return;

    const alimentoBruto = String(alimEl.value || "").trim();
    const quantidade = parseFloat(qtdEl.value);

    if (!alimentoBruto || isNaN(quantidade) || quantidade <= 0) {
      mostrarResultado("⚠️ Preencha o nome do alimento e uma quantidade válida (em gramas).");
      return;
    }

    const key = alimentoBruto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    // tenta correspondência exata primeiro
    let caloriasPor100 = tabelaCalorias[key];

    // se não encontrou, tenta remover espaços e comparar por prefixo/label
    if (caloriasPor100 === undefined) {
      // procurar por label nos recomendados
      const found = Object.keys(tabelaCalorias).find(k => k.toLowerCase() === key);
      if (found) caloriasPor100 = tabelaCalorias[found];
    }

    if (caloriasPor100 === undefined) {
      mostrarResultado("❌ Alimento não encontrado na tabela. Tente um dos recomendados ou escreva um nome mais simples (ex: arroz, frango, banana).");
      return;
    }

    const resultado = (caloriasPor100 * (quantidade / 100));
    const texto = `🔥 ${resultado.toFixed(1)} kcal — ${quantidade} g de ${alimentoBruto} (≈ ${caloriasPor100} kcal/100g)`;

    // salvar no histórico
    const historico = loadHistorico();
    historico.unshift({
      alimento: alimentoBruto,
      quantidade,
      resultado: resultado.toFixed(1),
      ts: Date.now()
    });
    saveHistorico(historico);
    renderHistorico();

    mostrarResultado(texto);
  }

  // --- Init: ligar eventos
  function init() {
    ensureContainers();
    renderRecomendados();
    renderHistorico();

    // botão calcular (pode já existir)
    let btn = $("#calcular");
    if (!btn) {
      // tenta criar botão dentro do cartão se não existir
      btn = document.createElement("button");
      btn.id = "calcular";
      btn.innerText = "Calcular";
      btn.type = "button";
      const cartao = document.querySelector(".cartao") || appEl.querySelector("div");
      if (cartao) cartao.appendChild(btn);
    }
    btn.addEventListener("click", calcularCalorias);

    // Enter nas inputs
    const alim = $("#alimento");
    const qtd = $("#quantidade");
    [alim, qtd].forEach(el => {
      if (!el) return;
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          calcularCalorias();
        }
      });
    });

    // mostrar dica se versão mobile sem campos
    if (!alim || !qtd) {
      console.warn("Inputs #alimento ou #quantidade não encontrados no DOM.");
    }

    // preencher lista de sugestões (autocomplete simples) - opcional
    if (alim) {
      alim.setAttribute("autocomplete", "off");
      // pode-se adicionar um datalist
      if (!document.querySelector("#lista-sugestoes")) {
        const dl = document.createElement("datalist");
        dl.id = "lista-sugestoes";
        Object.keys(tabelaCalorias).forEach(k => {
          const opt = document.createElement("option");
          opt.value = k;
          dl.appendChild(opt);
        });
        document.body.appendChild(dl);
        alim.setAttribute("list", "lista-sugestoes");
      }
    }
  }

  // Run
  document.addEventListener("DOMContentLoaded", init);
})();
