document.getElementById("btnCarregar").addEventListener("click", () => {
  fetch("dados.json")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("titulo").textContent = data.titulo;
      document.getElementById("slogan").textContent = data.slogan;
      carregarDescricao(data.descricao);
      carregarComoFunciona(data.como_funciona);
      carregarDepoimentos(data.depoimentos);
      carregarPlanos(data.planos);
      carregarFAQ(data.faq);
    })
    .catch((err) => console.error("Erro ao carregar JSON:", err));
});

function carregarDescricao(texto) {
  const section = document.getElementById("descricao");
  section.innerHTML = `<h2>O que é o EcoPulse?</h2><p>${texto}</p>`;
}

function carregarComoFunciona(passos) {
  const section = document.getElementById("como-funciona");
  section.innerHTML = "<h2>Como funciona?</h2>";
  const list = document.createElement("ol");
  passos.forEach((passo) => {
    const li = document.createElement("li");
    li.textContent = passo;
    list.appendChild(li);
  });
  section.appendChild(list);
}

function carregarDepoimentos(depoimentos) {
  const container = document.querySelector(".depoimentos .cards");
  container.innerHTML = "";
  depoimentos.forEach((dep) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<p>${dep.texto}</p><span>— ${dep.autor}</span>`;
    container.appendChild(card);
  });
}

function carregarPlanos(planos) {
  const container = document.querySelector(".planos .cards");
  container.innerHTML = "";
  planos.forEach((plano) => {
    const card = document.createElement("div");
    card.className = "card";
    const preco = plano.preco ? `<strong>${plano.preco}</strong>` : "";
    const beneficios = plano.beneficios.map((b) => `<li>${b}</li>`).join("");
    card.innerHTML = `<h3>${plano.nome}</h3><ul>${beneficios}</ul><p>${plano.descricao}</p>${preco}`;
    container.appendChild(card);
  });
}

function carregarFAQ(faqs) {
  const container = document.querySelector(".faq");
  container.innerHTML = "<h2>Perguntas Frequentes</h2>";
  faqs.forEach((faq) => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = faq.pergunta;
    const p = document.createElement("p");
    p.textContent = faq.resposta;
    details.appendChild(summary);
    details.appendChild(p);
    container.appendChild(details);
  });
}
