import PlayerList from "Components/Players";
import React, { useContext } from "react";
import { Context } from "Context";

const PlayersContainer = () => {
  const { state, checkReady, inputName } = useContext(Context);
  const { players, playerCount, cases, names, gameState } = state;

  return (
    <PlayerList
      players={players}
      playerCount={playerCount}
      cases={cases}
      names={names}
      gameState={gameState}
      checkReady={checkReady}
      inputName={inputName}
    />
  );
};

export default React.memo(PlayersContainer);

