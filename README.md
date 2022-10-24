# Como foi feito

O cálculo do IVV é feito de maneira simples para encontrar locais que reúnam, simulanteamente, quatro características:

- Grande número de votos registrados no 1º turno
- Grande percentual de eleitores de "terceira via", que não votaram em Lula ou em Bolsonaro
- Grande percentual de eleitores de Lula
- Pequeno percentual de eleitores de Bolsonaro

Para isso, foram usados os dados de votação por bairro de todo o país, compilados pelo jornalista Gabriel Zanlorenssi.

De início, cada bairro do país foi classificado de acordo com sua posição em cada uma das quatro características. Por exemplo, o bairro com mais percentual de votos em Lula no 1º turno recebeu a pontuação mais alta, enquanto o que teve menor percentual recebeu a menor.

Depois, calculou-se a pontuação média de cada bairro nas quatro características. É a partir dessa média que o IVV é calculado: o bairro com pontuação mais alta recebe valor 1, enquanto o que tem pontuação mais baixa recebe valor 0. Todos os demais recebem uma nota de acordo com seu valor relativo entre os dois extremos.

Trata-se de uma medida bastante simples que visa encontrar onde são os bairros populosos com um percentual alto de eleitores potencialmente indecisos, mas que moram em áreas propensas a votar em Lula. 

O objetivo é ser uma ferramenta adicional para organizar ações na reta final da campanha, unindo os padrões de votação com o conhecimento cotidiano de quem mora em cada local.

## Desenvolvedores - como executar o site

- Clone ou baixe o código-fonte presente em `https://github.com/ondevirarvoto/ondevirarvoto.github.io`;
- Abra o terminal no diretório com os arquivos;
- Execute algum servidor para testes presentes em diferentes linguagens de programação. Por exemplo, em php execute no terminal `php -S localhost:8000` ou em python3, pode utilizar `python3 -m http.server`. Em ambos os casos o site estará disponível em "localhost:8000".
