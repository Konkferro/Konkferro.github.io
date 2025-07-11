let contadorVergalhoes = 0;

function mostrarCalculadora() {
  document.getElementById('menuInicial').style.display = 'none';
  document.getElementById('calculadoraViga').style.display = 'block';
  document.getElementById('btnVoltar').style.display = 'inline-block';
  carregarBitolaEstribo();
  if (contadorVergalhoes === 0) adicionarVergalhao();
}

function adicionarVergalhao() {
  const container = document.getElementById('vergalhaoContainer');
  const div = document.createElement('div');
  div.className = "linha";
  div.id = `vergalhaoLinha_${contadorVergalhoes}`;

  const isPrimeiro = contadorVergalhoes === 0;

  div.innerHTML = `
    ${isPrimeiro ? `<button class="add-btn" onclick="adicionarVergalhao()">+</button>` : ``}
    <div class="grupo-entrada">
      <label>Vergalhão:</label>
      <select class="bitolaVergalhao" id="bitola_${contadorVergalhoes}"></select>
    </div>
    <div class="grupo-entrada">
      <label>Quantidade:</label>
      <input type="number" class="quantidadeVergalhao" id="quantidade_${contadorVergalhoes}">
    </div>
    ${!isPrimeiro ? `<button class="remove-btn" onclick="removerLinha('${div.id}')">X</button>` : ``}
  `;

  container.appendChild(div);
  preencherBitolaNoSelect(document.getElementById(`bitola_${contadorVergalhoes}`));
  contadorVergalhoes++;
}

function removerLinha(id) {
  const linha = document.getElementById(id);
  if (linha) linha.remove();
}

function preencherBitolaNoSelect(selectEl) {
  selectEl.innerHTML = "";
  for (const bitola in bitolas) {
    const option = document.createElement('option');
    option.value = bitola;
    option.textContent = bitola;
    selectEl.appendChild(option);
  }
}

function carregarBitolaEstribo() {
  const select = document.getElementById('bitolaEstribo');
  if (select.options.length > 0) return;
  for (const bitola in bitolas) {
    const option = document.createElement('option');
    option.value = bitola;
    option.textContent = bitola;
    select.appendChild(option);
  }
}

function calcularFerro() {
  const selects = document.querySelectorAll('.bitolaVergalhao');
  const inputs = document.querySelectorAll('.quantidadeVergalhao');

  // Valores principais
  const Dim1 = parseFloat(document.getElementById('Dimensão1').value);
  const Dim2 = parseFloat(document.getElementById('Dimensão2').value);
  const qtdEstribo = parseFloat(document.getElementById('QTDestribo').value);
  const metros = parseFloat(document.getElementById('metros').value);
  const quantidadeVigas = parseFloat(document.getElementById('quantidadeVigas').value) || 1;
  const bitolaEstribo = document.getElementById('bitolaEstribo').value;
  const precoEstribo = bitolas[bitolaEstribo] || 0;

  // Verificação de preenchimento
  if (
    isNaN(Dim1) || isNaN(Dim2) ||
    isNaN(qtdEstribo) || isNaN(metros) ||
    isNaN(quantidadeVigas) || isNaN(precoEstribo)
  ) {
    alert("Preencha todos os campos corretamente para calcular.");
    return;
  }

  // Agrupando vergalhões por bitola
  let agrupado = {};
  selects.forEach((select, index) => {
    const bitola = select.value;
    const qtd = parseFloat(inputs[index].value) || 0;
    const preco = bitolas[bitola] || 0;

    if (!agrupado[bitola]) {
      agrupado[bitola] = { quantidade: 0, preco };
    }
    agrupado[bitola].quantidade += qtd;
  });

  // Cálculo do estribo com arredondamento
  const perimetroComDobra = ((Dim1 * 2) + (Dim2 * 2) + 10) / 100;
  const estribosPorMetro = Math.ceil(100 / qtdEstribo); // ← Arredondando pra inteiro
  const custoEstriboPorViga = perimetroComDobra * estribosPorMetro * precoEstribo;

  // Cálculo total por viga
  let custoTotalPorViga = 0;
  let descricaoBitolas = '';

  for (const bitola in agrupado) {
    const qtdF = agrupado[bitola].quantidade;
    const precoF = agrupado[bitola].preco;
    const custoVergalhao = precoF * qtdF;

    custoTotalPorViga += custoVergalhao;
    descricaoBitolas += `${bitola} ${qtdF}F `;
  }

  custoTotalPorViga += custoEstriboPorViga;

  const valorPorViga = custoTotalPorViga * metros;
  const valorTotal = valorPorViga * quantidadeVigas;

  // Resumo formatado
  const resumoFinal =
    `${quantidadeVigas} x Viga ${descricaoBitolas}${Dim1}x${Dim2} cada ${qtdEstribo} ${bitolaEstribo} ${metros}M : R$${valorPorViga.toFixed(2)}\n` +
    `💰 Total: R$ ${valorTotal.toFixed(2)}`;

  document.getElementById('resultado').innerText = resumoFinal;

  // Painel de verificação de preços
  const painel = document.getElementById("verificacaoPrecos");
  let infoPrecos = '';

  for (const bitola in agrupado) {
    const preco = agrupado[bitola].preco;
    const qtd = agrupado[bitola].quantidade;
    infoPrecos += `🔩 Bitola ${bitola}: R$${preco.toFixed(2)} (Qtd: ${qtd})<br>`;
  }

  infoPrecos += `🔁 Estribo (${bitolaEstribo}): R$${precoEstribo.toFixed(2)}<br>`;
  infoPrecos += `📏 Quantidade de estribos por metro: ${estribosPorMetro}<br>`;
  painel.innerHTML = infoPrecos;
}

/*let vigaInfo = '';

selects.forEach((select, index) => {
  const bitola = select.value;
  const quantidade = parseFloat(inputs[index].value) || 0;
  vigaInfo += `🧱 Viga ${index + 1}: Bitola ${bitola} | Qtd: ${quantidade}\n`;
});


const resumoFinal = 
  `${vigaInfo}` +
  `📐 Estribo: ${Dim1}cm x ${Dim2}cm\n`+`🔁 A cada: ${qtdEstribo}cm | Ferro do Estribo: ${bitolaEstribo}\n` +
  `📏 Metros: ${metros}m | Quantidade de Vigas: ${quantidadeVigas}\n` +
  `💰 Total: R$ ${resultadoFinal.toFixed(2)}`;

//document.getElementById('resultado').innerText = resumoFinal;
document.getElementById('resultado').innerText = `viga ${bitola} ${quantidadee}F ${Dim1} x ${Dim2} cada ${qtdEstribo} ${bitolaEstribo} ${metros}M`
}*/

/*let linhasResumo = '';
selects.forEach((select, index) => {
  const bitola = select.value;
  const quantidade = parseFloat(inputs[index].value) || 0;
  linhasResumo += `viga ${bitola} ${quantidade}F ${Dim1} x ${Dim2} cada ${qtdEstribo} ${bitolaEstribo} ${metros}M\n`;
});

document.getElementById('resultado').innerText = linhasResumo;*/




function limparCampos() {
  const confirmar = confirm("Tem certeza que deseja limpar todos os campos e reiniciar?");
  if (!confirmar) return;

  document.getElementById('Dimensão1').value = '';
  document.getElementById('Dimensão2').value = '';
  document.getElementById('QTDestribo').value = '';
  document.getElementById('metros').value = '';
  document.getElementById('quantidadeVigas').value = '1';
  document.getElementById('resultado').innerText = '';

  const container = document.getElementById('vergalhaoContainer');
  container.innerHTML = '';
  contadorVergalhoes = 0;
  adicionarVergalhao();
}