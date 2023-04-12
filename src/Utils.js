const resetCase = (playerCount) => {
  const cases = {};
  for (let i = 0; i < playerCount; i++) cases[i] = "";
  return cases;
};

const resetName = (playerCount) => {
  const names = {};
  for (let i = 0; i < playerCount; i++) names[i] = "";
  return names;
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomPlayers = (playerCount, data) => {
  const players = new Set();
  while (players.size < playerCount) players.add(data[getRandomNumber(0, 10)]);
  return [...players];
};

const getRandomLegs = (playerCount) => {
  const legCounts = [];
  const legs = [];
  let rows = new Set();
  let column = 0;

  for (let i = 1; i < playerCount; i++) 
  {
    legCounts.push(getRandomNumber(2, 5));
  }

  for(let column = 0; column < playerCount - 1; column++)
  {
    let rows = new Set();
    while(rows.size < legCounts[column])
    {
      const num = getRandomNumber(0, 9);
      if (0 < column) 
      {
        if (legs[column - 1].includes(num)) 
          continue;
      }      
      
      rows.add(num);
    }
    
    legs.push([...rows].sort());
  }
  
  return legs;
};

export { resetCase, resetName, getRandomLegs, getRandomPlayers };
