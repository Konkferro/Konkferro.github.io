let contadorVergalhoes = 0;

function mostrarCalculadora() {
  document.getElementById('botaoInicial').style.display = 'none';
  document.getElementById('calculadora').style.display = 'block';
  carregarBitolaEstribo();

  if (contadorVergalhoes === 0) {
    adicionarVergalhao();
  }
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
      <label>Bitola:</label>
      <select class="bitolaVergalhao" id="bitola_${contadorVergalhoes}"></select>
    </div>

    <div class="grupo-entrada">
      <label>Qtd:</label>
      <input type="number" class="quantidadeVergalhao" id="quantidade_${contadorVergalhoes}">
    </div>

    ${!isPrimeiro ? `<button class="remove-btn" onclick="removerLinha('${div.id}')">X</button>` : ``}
  `;

  container.appendChild(div);

  const select = document.getElementById(`bitola_${contadorVergalhoes}`);
  preencherBitolaNoSelect(select);

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
  let resultado1 = 0;

  selects.forEach((select, index) => {
    const bitola = select.value;
    const quantidade = parseFloat(inputs[index].value) || 0;
    const preco = bitolas[bitola] || 0;
    resultado1 += preco * quantidade;
  });

  const Dim1 = parseFloat(document.getElementById('Dimensão1').value);
  const Dim2 = parseFloat(document.getElementById('Dimensão2').value);
  const qtdEstribo = parseFloat(document.getElementById('QTDestribo').value);
  const metros = parseFloat(document.getElementById('metros').value);
  const bitolaEstribo = document.getElementById('bitolaEstribo').value;
  const precoEstribo = bitolas[bitolaEstribo] || 0;

  const resultado2Bruto = ((((Dim1 * 2) + (Dim2 * 2)+10) / 100) * (100 / qtdEstribo)) * precoEstribo;
  const resultado2 = parseFloat(resultado2Bruto.toFixed(2));
  const resultadoFinal = (resultado1 + resultado2) * metros;

  document.getElementById('resultado').innerText =
   /* `Total Vergalhões: R$ ${resultado1.toFixed(2)}\n` +
    `Estribo: R$ ${resultado2.toFixed(2)}\n` +*/
    `Preço Final da viga: R$ ${resultadoFinal.toFixed(2)}`;
}
function voltarAoMenu() {
  document.getElementById('calculadora').style.display = 'none';
  document.getElementById('botaoInicial').style.display = 'flex';
  document.getElementById('btnVoltar').style.display = 'none';
}

function mostrarCalculadora() {
  document.getElementById('botaoInicial').style.display = 'none';
  document.getElementById('calculadora').style.display = 'block';
  document.getElementById('btnVoltar').style.display = 'inline-block';
  carregarBitolaEstribo();

  if (contadorVergalhoes === 0) {
    adicionarVergalhao();
  }
}
