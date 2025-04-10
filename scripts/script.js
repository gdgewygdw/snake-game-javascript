let canvas = document.getElementById("snake"); // Pega o elemento <canvas> com o id "snake"
let context = canvas.getContext("2d"); // Cria o contexto 2D para desenhar no canvas
let box = 32; // Tamanho de cada quadrado no jogo (32 pixels)

// Cria a cobrinha como um array de objetos com coordenadas x e y
let snake = [];
snake[0] = {
    x: 8 * box, // posição inicial no eixo X (meio do canvas)
    y: 8 * box  // posição inicial no eixo Y (meio do canvas)
};

let direction = "right"; // Direção inicial da cobrinha

// Cria a comida com posição aleatória dentro da área do jogo
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, // X aleatório entre 1 e 15
    y: Math.floor(Math.random() * 15 + 1) * box  // Y aleatório entre 1 e 15
}

// Função que desenha o fundo do jogo
function createBG() {
    context.fillStyle = "white"; // Cor de fundo
    context.fillRect(0, 0, 16 * box, 16 * box); // Preenche o fundo com um retângulo branco
}

// Função que desenha a cobrinha na tela
function createSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green"; // Cor da cobrinha
        context.fillRect(snake[i].x, snake[i].y, box, box); // Desenha cada parte da cobrinha
    }
}

// Função que desenha a comida
function createFood() {
    context.fillStyle = "red"; // Cor da comida
    context.fillRect(food.x, food.y, box, box); // Desenha a comida
}

// Evento de teclado para mudar a direção da cobrinha
document.addEventListener('keydown', update);

// Função que atualiza a direção com base na tecla pressionada
function update(event) {
    // Verifica se a nova direção não é a oposta da atual
    if (event.keyCode == 37 && direction != 'right') direction = 'left';  // seta esquerda
    if (event.keyCode == 38 && direction != 'down') direction = 'up';     // seta cima
    if (event.keyCode == 39 && direction != 'left') direction = 'right';  // seta direita
    if (event.keyCode == 40 && direction != 'up') direction = 'down';     // seta baixo
}

// Função principal que executa o jogo
function startGame() {
    // Faz a cobrinha "atravessar" a parede e reaparecer do outro lado (teletransporte)
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // Verifica se a cobrinha bateu nela mesma
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game); // Para o jogo
            alert('Game Over :('); // Mostra mensagem de fim de jogo
        }
    }

    // Desenha os elementos do jogo
    createBG();
    createSnake();
    createFood();

    // Posição atual da cabeça da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Atualiza a posição da cabeça conforme a direção
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    // Verifica se a cobrinha comeu a comida
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); // Remove a última parte da cobrinha (ela só cresce se comer a comida)
    } else {
        // Gera nova posição para a comida
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // Cria a nova cabeça da cobrinha
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead); // Adiciona a nova cabeça no início da lista
}

// Inicia o jogo, chamando a função startGame a cada 100 milissegundos
let game = setInterval(startGame, 100);
