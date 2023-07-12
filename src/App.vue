<template>
  <div id="app">
    <section class="container-app row flex justify-center py-2">
      <div class="small-6 columns justify-center">
        <h1 class="text-center">YOU</h1>
        <img
          src="../src/assets/images-character/chibi.png"
          alt=""
          style="height: 300px; width: 100%"
        />

        <div class="healthbar">
          <button
            class="healthbar text-center button-49"
            :style="{ width: playerHealth + '%' }"
          >
            {{ playerHealth }}
          </button>
        </div>
      </div>
      <div class="small-6 columns justify-center">
        <h1 class="text-center">MONSTER</h1>
        <img
          src="../src/assets/images-character/monster.png"
          alt=""
          style="height: 300px; width: 100%"
        />

        <div class="healthbar">
          <button
            class="healthbar text-center button-49"
            :style="{ width: monsterHealth + '%' }"
          >
            {{ monsterHealth }}
          </button>
        </div>
      </div>
    </section>
    <section class="row controls" v-if="!gameIsRunning">
      <div class="small-12 columns">
        <button id="start-game" @click="startNewGame">START NEW GAME</button>
      </div>
    </section>
    <section class="row controls" v-else>
      <div class="small-12 columns">
        <button id="attack" @click="attack">ATTACK</button>
        <button id="special-attack" @click="specialAttack">
          SPECIAL ATTACK
        </button>
        <button id="heal" @click="heal">HEAL</button>
        <button id="give-up" @click="giveUp">GIVE UP</button>
      </div>
    </section>
    <section class="row log" v-if="turns.length > 0">
      <div class="small-12 columns">
        <ul>
          <li v-for="turn in turns" :key="turn.text">
            {{ turn.text }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false,
      turns: [],
    };
  },
  methods: {
    startNewGame() {
      this.gameIsRunning = !this.gameIsRunning || true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack: function () {
      if (this.checkPlayerOptions()) {
        return;
      }
      // Monster auto
      var damage = this.inputDamage(4, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player đánh Monster mất " + damage,
      });
      //Player attack
      this.monsterAttack();
    },
    specialAttack: function () {
      if (this.checkPlayerOptions()) {
        return;
      }
      // Monster auto
      var damage = this.inputDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player đánh Monster mất " + damage,
      });
      // player
      this.monsterAttack();
    },
    heal: function () {
      //player
      if (this.playerHealth > 70) {
        return false;
      } else if (this.playerHealth <= 60) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 70;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "Player hồi 10 máu ",
      });

      //monster
      this.monsterAttack();
    },
    giveUp: function () {
      this.gameIsRunning = false;
      this.checkPlayerOptions();
    },
    monsterAttack: function () {
      var damage = this.inputDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: "Monster đánh Player mất " + damage,
      });
      this.checkPlayerOptions();
    },
    inputDamage: function (minDamage, maxDamage) {
      return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
    },
    checkPlayerOptions: function () {
      if (this.monsterHealth <= 0) {
        if (confirm("You win! New Game Again ")) {
          this.startNewGame();
          this.gameIsRunning = true;
        } else {
          this.gameIsRunning = false;
        }
        return;
      } else if (this.playerHealth <= 0) {
        if (confirm("You Lost! New Game Again ")) {
          this.startNewGame();
        } else {
          this.gameIsRunning = false;
        }
        return;
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}
#app {
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  object-fit: contain;
  background: url("./assets/images-character/bbg-1.jpeg");
}

.text-center {
  text-align: center;
}

.healthbar {
  width: 80%;
  height: 40px;
  background-color: #eee;
  margin: auto;
  transition: width 500ms;
}

.controls,
.log {
  margin-top: 30px;
  text-align: center;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0px 3px 6px #ccc;
}

.turn {
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 22px;
}

.log ul {
  list-style: none;
  font-weight: bold;
  text-transform: uppercase;
}

.log ul li {
  margin: 5px;
}

.log ul .player-turn {
  color: blue;
  background-color: #e4e8ff;
}

.log ul .monster-turn {
  color: red;
  background-color: #ffc0c1;
}

#start-game {
  background-color: #aaffb0;
}

#start-game:hover {
  background-color: #76ff7e;
}

#attack {
  background-color: #ff7367;
}

#attack:hover {
  background-color: #ff3f43;
}

#special-attack {
  background-color: #ffaf4f;
}

#special-attack:hover {
  background-color: #ff9a2b;
}

#heal {
  background-color: #aaffb0;
}

#heal:hover {
  background-color: #76ff7e;
}

#give-up {
  background-color: #ffffff;
}

#give-up:hover {
  background-color: #c7c7c7;
}
button {
  width: 150px;
  height: 40px;
}
/* CSS */
.button-49,
.button-49:after {
  width: 150px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  box-shadow: rgba(199, 13, 13, 0.2) 0 -25px 18px -14px inset,
    rgba(216, 33, 33, 0.15) 0 1px 2px, rgba(228, 64, 64, 0.15) 0 2px 4px,
    rgba(224, 11, 11, 0.15) 0 4px 8px, rgba(220, 32, 22, 0.15) 0 8px 16px,
    rgba(211, 37, 28, 0.15) 0 16px 32px;
  font-family: "Bebas Neue", sans-serif;
  background: linear-gradient(45deg, transparent 5%, #ff013c 5%);
  border: 0;
  color: #fff;
  letter-spacing: 3px;
  outline: transparent;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-49:after {
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(80% -6px 0 0);
  --slice-2: inset(50% -6px 30% 0);
  --slice-3: inset(10% -6px 85% 0);
  --slice-4: inset(40% -6px 43% 0);
  --slice-5: inset(80% -6px 5% 0);

  content: "ALTERNATE TEXT";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    transparent 3%,
    #00e6f6 3%,
    #00e6f6 5%,
    #ff013c 5%
  );
  text-shadow: -3px -3px 0px #f8f005, 3px 3px 0px #00e6f6;
  clip-path: var(--slice-0);
}

.button-49:hover:after {
  animation: 1s glitch;
  animation-timing-function: steps(2, end);
}

@keyframes glitch {
  0% {
    clip-path: var(--slice-1);
    transform: translate(-20px, -10px);
  }
  10% {
    clip-path: var(--slice-3);
    transform: translate(10px, 10px);
  }
  20% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 10px);
  }
  30% {
    clip-path: var(--slice-3);
    transform: translate(0px, 5px);
  }
  40% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 0px);
  }
  50% {
    clip-path: var(--slice-3);
    transform: translate(5px, 0px);
  }
  60% {
    clip-path: var(--slice-4);
    transform: translate(5px, 10px);
  }
  70% {
    clip-path: var(--slice-2);
    transform: translate(-10px, 10px);
  }
  80% {
    clip-path: var(--slice-5);
    transform: translate(20px, -10px);
  }
  90% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 0px);
  }
  100% {
    clip-path: var(--slice-1);
    transform: translate(0);
  }
}

@media (min-width: 768px) {
  .button-49,
  .button-49:after {
    width: 150px;
    height: 40px;
    line-height: 40px;
  }
}
</style>
