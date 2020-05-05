import * as Dat from "dat.gui";
import { Scene, Color, Vector3 } from "three";
import { Flower, Arena, Player, Ball } from "objects";
import { BasicLights } from "lights";

const Colors = {
  background: 0x000000,
  floor: 0x000000,
  ball1: 0x0055ff,
  ball2: 0xe2598b,
  bomb: 0x15cda8,
  freeze: 0x0075f6,
  cross: 0xff5959,
};

const X_AXIS = new Vector3(1, 0, 0),
  Y_AXIS = new Vector3(0, 1, 0),
  Z_AXIS = new Vector3(0, 0, 1),
  TO_RADIANS = Math.PI / 180,
  time = 31,
  turning = 3.5,
  speed = 8,
  cameraX = 3.5,
  cameraZ = 4,
  ballRadius = 3,
  maxPowers = 5,
  powerProb = 0.975;

let arena, initialPosVirus, initialDirVirus, virus, flower;

class GameScene extends Scene {
  constructor(camera) {
    // Call parent Scene() constructor
    super();

    // Init state
    this.state = {
      // this gui is the menu box
      gui: new Dat.GUI(), // Create GUI for scene
      rotationSpeed: 0,
      rotation: true,
      updateList: [],
    };

    this.Colors = Colors;
    this.camera = camera;

    // Set background to a nice color
    this.background = new Color(0x7ec0ee);

    // Set initial positions and direction of virus
    // initialPosVirus = new Vector3(-arena.width + 2 * arena.wallSize,
    //     -arena.height + 2 * arena.wallSize, 0);
    let initialPosPlayer = new Vector3(0, 2, 0);
    let initialDirPlayer = new Vector3(-1, 0, 0);

    // Add player to scene
    let player = new Player(this, initialPosPlayer.clone(), initialDirPlayer.clone());
    this.player = player;

    // Add an experimental ball. 
    let ball = new Ball(); 
    this.ball = ball; 
    this.add(ball);

    // Add area to scene.
    this.height = 50;
    this.width = 75;
    this.wallSize = 5;
    this.wallHeight = 10;
    this.tileSize = 1;
    arena = new Arena(this);

    flower = new Flower(this);
    const lights = new BasicLights();
    this.add(arena, player, flower, lights);

    // Populate GUI
    this.state.gui.add(this.state, "rotationSpeed", -5, 5);
    this.state.gui.add(this.state, "rotation", false, true);
  }

  // add object to updateList in state
  addToUpdateList(object) {
    this.state.updateList.push(object);
  }

  // Called every timestamp.
  update(timeStamp, camera) {
    const { rotationSpeed, updateList } = this.state;
    this.rotation.y = (rotationSpeed * timeStamp) / 10000;

    // Call update for each object in the updateList
    for (const obj of updateList) {
      obj.update(timeStamp);
    }
  }
}

export default GameScene;
