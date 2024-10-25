function calcular() {
    var largura = document.getElementById("largura").value;
    var comprimento = document.getElementById("comprimento").value;
    var valorFloat = document.getElementById("valorFloat").value;
    var valorUsuario = document.getElementById("valorUsuario").value;
    
    if (largura === "" || comprimento === "") {
        document.getElementById("resultado").textContent = "Por favor, insira valores para A e B.";
        return;
    }

    var A = parseFloat(largura);
    var B = parseFloat(comprimento);

    // Somando A(X) com ele mesmo, e B(Y) com ele mesmo
    var resultadoA = A + A;
    var resultadoB = B + B;

    // Somando A + B + 12
    var resultadoFinal = resultadoA + resultadoB + 12;

    document.getElementById("resultado").textContent = "CM Linear: " + resultadoFinal;

    // Se o valor float(Valor do ferro) for inserido, calcular a multiplicação e divisão
    if (valorFloat !== "") {
        var float = parseFloat(valorFloat);
        var resultadoMultiplicado = (resultadoFinal * float) / 100;

        document.getElementById("resultadoFinal").textContent = "Valor de 1 estribo: R$" + resultadoMultiplicado.toFixed(3);
    } else {
        document.getElementById("resultadoFinal").textContent = "";
    }

    // Se o valor do usuário(espaçamento) for inserido, calcular 100 dividido por ele
    if (valorUsuario !== "") {
        var divisor = parseFloat(valorUsuario);
        if (divisor !== 0) {
            var resultadoDivisao = 100 / divisor;
            document.getElementById("resultadoDivisao").textContent = "Quantidade de estribo em 1Mt é : " + resultadoDivisao + " estribo";
            
            // Multiplicando o resultado final pelo resultado da divisão
            var resultadoMultiplicadoDivisao = resultadoMultiplicado * resultadoDivisao;
            document.getElementById("resultadoMultiplicadoDivisao").textContent = "Valor dos estribos em 1Mt: R$" + resultadoMultiplicadoDivisao.toFixed(2);
        } else {
            document.getElementById("resultadoDivisao").textContent = "Não é possível dividir por zero.";
            document.getElementById("resultadoMultiplicadoDivisao").textContent = "";
        }
    } else {
        document.getElementById("resultadoDivisao").textContent = "";
        document.getElementById("resultadoMultiplicadoDivisao").textContent = "";
    }
}
