import { resetCase, resetName, getRandomLegs, getRandomPlayers, checkLegs } from "Utils";

export const data = [
  {
    id: 1,
    name: "p1",
    color: "gray",
  },
  {
    id: 2,
    name: "p2",
    color: "crimson",
  },
  {
    id: 3,
    name: "p3",
    color: "darkolivegreen",
  },
  {
    id: 4,
    name: "p4",
    color: "lightseagreen",
  },
  {
    id: 5,
    name: "p5",
    color: "darkorange",
  },
  {
    id: 6,
    name: "p6",
    color: "peru",
  },
  {
    id: 7,
    name: "p7",
    color: "royalblue",
  },
  {
    id: 8,
    name: "p8",
    color: "saddlebrown",
  },
  {
    id: 9,
    name: "p9",
    color: "salmon",
  },
  {
    id: 10,
    name: "p10",
    color: "rebeccapurple",
  },
];

export const initState = {
  page: "home",
  playerCount: 2,
  players: [],
  cases: {},
  names: {},
  results: {},
  gameState: "notReady",
  legs: [],
};

const startGame =  (state) => {
  

  return {
    ...state,
    page: "game",
    gameState: "notReady",
    results: {},
    players: getRandomPlayers(state.playerCount, data),
    cases: resetCase(state.playerCount),
    names: resetName(state.playerCount),
    legs: getRandomLegs(state.playerCount),
  };
};

export const reducer = (state, action) => {
  const bla = () => console.log("from reducer", state);
  switch (action.type) {
    case "INC_PLAYERS":
      return {
        ...state,
        playerCount: state.playerCount + 1,
      };
    case "DEC_PLAYERS":
      return {
        ...state,
        playerCount: state.playerCount - 1,
      };
    case "ENTER_GAME":
      return startGame(state);
      // return {
      //   ...state,
      //   page: "game",
      //   players: getRandomPlayers(state.playerCount, data),
      //   cases: resetCase(state.playerCount),
      //   names: resetName(state.playerCount),
      //   legs: getRandomLegs(state.playerCount),
      // };
    case "START_GAME":
      const js_name = ["종수", "js", "JS", "농뜌", "쮸"];
      const js_case = "어우동";
      let player_js_index = -1;
      let case_js_index = -1;  
      for (let i = 0; i < state.playerCount; i++) 
      {
        if(js_name.includes(state.names[i]))
        {
          player_js_index = i;
          break;
        }
      }

      for (let i = 0; i < state.playerCount; i++) 
      {
        if(state.cases[i] == js_case)
        {
          case_js_index = i;
          break;
        }
      }
      return {
        ...state,
        gameState: "playing",
        legs: checkLegs(state.legs, state.playerCount, player_js_index, case_js_index),
      };
    case "INPUT_CASE":
      return {
        ...state,
        cases: { ...state.cases, [action.idx]: action.value },
      };
      case "INPUT_NAME":
      return {
        ...state,
        names: { ...state.names, [action.idx]: action.value },
      };
    case "CHECK_READY":
      return {
        ...state,
        gameState: action.isReady ? "ready" : "notReady",
      };
    case "GO_HOME":
      return {
        ...state,
        page: "home",
        gameState: "notReady",
      };
    case "GO_RESULT":
      return {
        ...state,
        page: "result",
        gameState: "notReady",
      };
    case "GO_GAME":
      return startGame(state);
      // return {
      //   ...state,
      //   page: "game",
      //   gameState: "notReady",
      //   results: {},
      //   players: getRandomPlayers(state.playerCount, data),
      //   cases: resetCase(state.playerCount),
      //   names: resetName(state.playerCount),
      //   legs: getRandomLegs(state.playerCount),
      // };
    case "UPDATE_RESULT":
      return {
        ...state,
        gameState:
          Object.keys(state.results).length + 1 === state.playerCount
            ? "done"
            : "playing",
        results: { ...state.results, [action.idx]: action.posX },
      };
    default:
      throw new Error("Unhandled action type");
  }
};
