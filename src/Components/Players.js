import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import A11yTitle from "./A11yTitle";

const Player = React.memo(
  ({ idx, value, gameState, inputName, resultColor, playerCount }) => {
    // console.log("cases rendering");
    return (
      <>
        <A11yTitle element="h3" text="플레이어 입력 필드 리스트" />
        <PlayerWrapper playerCount={playerCount}>
          {["setting", "ready", "notReady"].includes(gameState) ? (
            <PlayerInput
              type="text"
              aria-label={`player ${idx + 1}`}
              placeholder={`player ${idx + 1}`}
              gameState={gameState}
              onChange={(e) => inputName(e, idx)}
              value={value}
              tabIndex={idx + 2}
              autoFocus={!idx}
            />
          ) : (
            <PlayerBox resultColor={resultColor}>{value}</PlayerBox>
          )}
        </PlayerWrapper>
      </>
    );
  }
);

const PlayerList = ({
  players,
  playerCount,
  gameState,
  cases,
  names,
  checkReady,
  inputName,
}) => {
  // console.log("caselist rendering");
  useEffect(() => {
    Object.keys(names).length && checkReady(cases, names);
  }, [cases, names]);

  return (
    <PlayerListWrapper>
      {players.map((_, idx) => {       
        return (
          <Player
            key={idx}
            idx={idx}
            value={names[idx]}
            gameState={gameState}
            inputName={inputName}
            playerCount={playerCount}
            resultColor={players[idx] && players[idx].color}
          />
        );
      })}
    </PlayerListWrapper>
  );
};

export default React.memo(PlayerList);

const PlayerListWrapper = styled.ul`
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  width: 80%;

  @media ${({ theme }) => theme.mobile} {
    width: 100%;
  }
`;

const PlayerWrapper = styled.li`
  flex-basis: ${({ playerCount }) => (playerCount < 4 ? "30%" : "20%")};
  padding: 0 0.5%;
  min-width: 0;
`;

const caseStyle = css`
  height: 4rem;
  width: 100%;
  border: 2px solid cornflowerblue;
  border-radius: 5px;
  font-size: 1.6rem;
  text-align: center;

  @media ${({ theme }) => theme.mobile} {
    height: 3rem;
    font-size: 1.4rem;
  }
`;

const PlayerInput = styled.input`
  ${caseStyle};

  &::placeholder {
    text-align: center;
    font-size: 1.6rem;
  }

  &:focus {
    box-shadow: 0 0 1px 2px white, 0 0 1px 5px cornflowerblue;
  }

  @media ${({ theme }) => theme.mobile} {
    &::placeholder {
      font-size: 1.4rem;
    }

    &:focus {
      box-shadow: 0 0 1px 1px white, 0 0 1px 2px cornflowerblue;
    }
  }
`;

const PlayerBox = styled.span`
  ${caseStyle};
  color: white;
  background-color: ${({ resultColor }) => resultColor || "cornflowerblue"};
  border: none;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 1rem;
  line-height: 4rem;

  @media ${({ theme }) => theme.mobile} {
    line-height: 3rem;
  }
`;
