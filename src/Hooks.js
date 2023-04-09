import { useReducer, useCallback } from "react";
import { initState, reducer } from "Reducer";

const useHook = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const incPlayers = useCallback(() => dispatch({ type: "INC_PLAYERS" }), []);
  const decPlayers = useCallback(() => dispatch({ type: "DEC_PLAYERS" }), []);

  const enterGame = useCallback(() => dispatch({ type: "ENTER_GAME" }), []);
  const startGame = useCallback(() => dispatch({ type: "START_GAME" }), []);

  const checkReady = useCallback((cases, names) => {
    const isReady = Object.values(cases).every((value) => value.trim() !== "") 
                 && Object.values(names).every((value) => value.trim() !== "");
    dispatch({ type: "CHECK_READY", isReady });
  }, []);

  const inputCase = useCallback((e, idx) => {
    const { value } = e.target;
    dispatch({ type: "INPUT_CASE", idx, value });
  }, []);

  const inputName = useCallback((e, idx) => {
    const { value } = e.target;
    dispatch({ type: "INPUT_NAME", idx, value });
  }, []);

  const goHome = useCallback(() => dispatch({ type: "GO_HOME" }), []);
  const goResult = useCallback(() => dispatch({ type: "GO_RESULT" }), []);
  const goGame = useCallback(() => dispatch({ type: "GO_GAME" }), []);

  const updateResult = (idx, posX) =>
    dispatch({ type: "UPDATE_RESULT", idx, posX });

  return {
    state,
    incPlayers,
    decPlayers,
    enterGame,
    startGame,
    checkReady,
    inputCase,
    inputName,
    goHome,
    goResult,
    goGame,
    updateResult,
  };
};

export default useHook;
