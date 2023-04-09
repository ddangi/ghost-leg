import React, { useContext } from "react";
import { Context } from "Context";
import CaseList from "Components/CaseList";

const CaseListContainer = () => {
  const { state, checkReady, inputCase } = useContext(Context);
  const { players, playerCount, cases, names, gameState, results } = state;

  return (
    <CaseList
      players={players}
      playerCount={playerCount}
      cases={cases}
      names={names}
      results={results}
      gameState={gameState}
      checkReady={checkReady}
      inputCase={inputCase}
    />
  );
};

export default React.memo(CaseListContainer);
