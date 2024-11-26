class Fighter {
    constructor(name, health, attackPower, defense, speed) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.attackPower = attackPower;
        this.defense = defense;
        this.speed = speed;
        this.isDefending = false;
    }

    attack(target) {
        let damage = Math.floor(Math.random() * this.attackPower) + 1;
        damage = Math.max(0, damage - target.defense);
        if (target.isDefending) {
            damage = Math.floor(damage / 2);
            target.isDefending = false;
        }
        target.health = Math.max(0, target.health - damage);
        return `${this.name} attacks ${target.name} for ${damage} damage!`;
    }

    heal() {
        const healAmount = Math.floor(Math.random() * 10) + 5;
        this.health = Math.min(this.maxHealth, this.health + healAmount);
        return `${this.name} heals for ${healAmount} health!`;
    }

    defend() {
        this.isDefending = true;
        return `${this.name} is defending and will take less damage next turn!`;
    }

    isAlive() {
        return this.health > 0;
    }
}

function logMessage(message) {
    const log = document.getElementById("log");
    log.innerHTML += `<p>${message}</p>`;
    log.scrollTop = log.scrollHeight;
}

function updateHealthBar(fighter, healthBarId, healthTextId) {
    const healthBar = document.getElementById(healthBarId);
    const healthText = document.getElementById(healthTextId);
    healthBar.style.width = `${(fighter.health / fighter.maxHealth) * 100}%`;
    healthText.textContent = `HP: ${fighter.health}/${fighter.maxHealth}`;
}

function startBattle() {
    const player = new Fighter("Player", 100, 20, 5, 10);
    const enemy = new Fighter("Enemy AI", 100, 15, 3, 8);

    const playerAlgorithm = document.getElementById("playerAlgorithm").value;

    let turn = 1;

    function executeTurn() {
        if (!player.isAlive() || !enemy.isAlive()) {
            logMessage(player.isAlive() ? "Player wins!" : "Enemy wins!");
            return;
        }

        logMessage(`-- Turn ${turn++} --`);

        // Determine turn order based on speed
        let first, second;
        if (player.speed >= enemy.speed) {
            first = player;
            second = enemy;
        } else {
            first = enemy;
            second = player;
        }

        // First fighter's turn
        if (first === player) {
            playerTurn();
            if (!enemy.isAlive()) {
                logMessage("Enemy is defeated!");
                return;
            }
            enemyTurn();
            if (!player.isAlive()) {
                logMessage("Player is defeated!");
                return;
            }
        } else {
            enemyTurn();
            if (!player.isAlive()) {
                logMessage("Player is defeated!");
                return;
            }
            playerTurn();
            if (!enemy.isAlive()) {
                logMessage("Enemy is defeated!");
                return;
            }
        }

        updateHealthBar(player, "player-health", "player-health-text");
        updateHealthBar(enemy, "enemy-health", "enemy-health-text");

        setTimeout(executeTurn, 1000); // Delay for suspense
    }

    function playerTurn() {
        try {
            const playerAction = new Function(
                "health",
                "enemy",
                "attack",
                "heal",
                "defend",
                playerAlgorithm
            );
            playerAction(
                player.health,
                enemy,
                () => logMessage(player.attack(enemy)),
                () => logMessage(player.heal()),
                () => logMessage(player.defend())
            );
        } catch (error) {
            logMessage("Player algorithm error!");
        }
    }

    function enemyTurn() {
        // Enemy's Turn (improved AI)
        if (enemy.health < 30) {
            logMessage(enemy.heal());
        } else {
            logMessage(enemy.attack(player));
        }
    }

    document.getElementById("log").innerHTML = ""; // Clear log
    updateHealthBar(player, "player-health", "player-health-text");
    updateHealthBar(enemy, "enemy-health", "enemy-health-text");
    executeTurn();
}
