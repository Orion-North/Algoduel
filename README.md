# Algoduel
Algoduel is a simple web-based game where you control a fighter using your own custom algorithm. Battle against an AI enemy by coding your strategy.
![image](https://github.com/user-attachments/assets/99d5f854-9513-4ea7-92a7-3b9127f95bd0)

## Features
Customizable Strategy: Write JavaScript code to control your fighter's actions.
Turn-Based Combat: Each turn, your fighter and the enemy take actions based on their strategies.
Real-Time Updates: Visual health bars and action logs keep you informed.

## How to Play
Write Your Algorithm:

Use the provided textarea to input your strategy.
Available Actions:
attack(): Deal damage to the enemy.
heal(): Restore your health.
defend(): Reduce damage from the next enemy attack.
Accessible Variables:
health: Your current health.
enemy.health: Enemy's current health.

Example Algorithm:
```
if (enemy.health < 30) {
    attack();
} else if (health < 50) {
    heal();
} else {
    defend();
}
```
Start the Battle:

Click the "Start Battle" button.
Watch the battle unfold in the action log.
