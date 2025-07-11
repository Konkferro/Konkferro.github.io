function abrirCalculadora(tipo) {
  document.getElementById('menuInicial').style.display = 'none';

  if (tipo === 'ferro') {
    document.getElementById('calculadoraViga').style.display = 'block';
    document.getElementById('btnVoltar').style.display = 'inline-block';
    carregarBitolaEstribo();
    if (typeof contadorVergalhoes !== 'undefined' && contadorVergalhoes === 0) {
      adicionarVergalhao();
    }
  }

  if (tipo === 'radier') {
    document.getElementById('calculadoraRadier').style.display = 'block';
    carregarBitolasNoRadier();
  }
}

function voltarAoMenu() {
  const calculadoras = ['calculadoraViga', 'calculadoraRadier'];
  calculadoras.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const menu = document.getElementById('menuInicial');
  if (menu) menu.style.display = 'flex';

  const btnVoltar = document.getElementById('btnVoltar');
  if (btnVoltar) btnVoltar.style.display = 'none';
}

function carregarBitolasNoRadier() {
  const select = document.getElementById("bitolaRadier");
  if (!select || select.options.length > 0) return;

  for (const bitola in bitolas) {
    const option = document.createElement("option");
    option.value = bitola;
    option.textContent = bitola;
    select.appendChild(option);
  }
}

function calcularRadier() {
  const dim1 = parseFloat(document.getElementById("radierDim1").value);
  const dim2 = parseFloat(document.getElementById("radierDim2").value);
  const fator = parseFloat(document.getElementById("fatorVendedor").value);
  const bitola = document.getElementById("bitolaRadier").value;
  const preco = bitolas[bitola] || 0;
  const qtdRadier = parseFloat(document.getElementById("quantidadeRadier").value) || 1;

  if (
    isNaN(dim1) || isNaN(dim2) ||
    isNaN(fator) || isNaN(preco)
  ) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const maior = Math.max(dim1, dim2);
  const metros = (maior / 100) * (fator * 2);
  const valorPorRadier = metros * preco;
  const valorTotal = valorPorRadier * qtdRadier;

  const resumoRadier = `${qtdRadier} x RADIER ${dim1} x ${dim2} ${bitola} ${fator}F: R$${valorPorRadier.toFixed(2)}`;
  document.getElementById("resultadoRadier").innerText =
    `${resumoRadier}\n📏 Total por Radier: ${metros.toFixed(2)} m\n💰 Valor Total: R$ ${valorTotal.toFixed(2)}`;

  const painel = document.getElementById("verificacaoPrecosRadier");
  if (painel) {
    let infoPrecos = '';
    infoPrecos += `🔩 Bitola selecionada: ${bitola} → R$${preco.toFixed(2)}<br>`;
    infoPrecos += `📐 Quantidade de ferro: ${fator}F<br>`;
    infoPrecos += `📏 Maior dimensão: ${maior} cm<br>`;
    infoPrecos += `📦 Metros calculados: ${metros.toFixed(2)} m<br>`;
    infoPrecos += `💰 Valor por Radier: R$${valorPorRadier.toFixed(2)}<br>`;
    infoPrecos += `💰 Valor total (${qtdRadier}x): R$${valorTotal.toFixed(2)}<br>`;
    painel.innerHTML = infoPrecos;
  }
}

function limparRadier() {
  const confirmar = confirm("Tem certeza que deseja limpar os campos do Radier?");
  if (!confirmar) return;

  document.getElementById("radierDim1").value = '';
  document.getElementById("radierDim2").value = '';
  document.getElementById("fatorVendedor").value = '';
  document.getElementById("quantidadeRadier").value = '1';
  document.getElementById("resultadoRadier").innerText = '';
  document.getElementById("bitolaRadier").selectedIndex = 0;

  const painel = document.getElementById("verificacaoPrecosRadier");
  if (painel) painel.innerHTML = '';
}