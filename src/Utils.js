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
  for (let i = 1; i < playerCount; i++) 
  {
    legCounts.push(getRandomNumber(2, 5));
  }

  for(let column = 0; column < playerCount - 1; column++)
  {
    let rows = new Set();
    while(rows.size < legCounts[column])
    {
      const num = getRandomNumber(0, 7);
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

const dicisionDirIsRight = (legs, playerCount, column, cur_row) => {
  let dir_right = true;
  if(column === playerCount - 1)
  {
    dir_right = false;
  }
  else if(0 < column)
  {
    let row_left = 99;
    for(let i = 0; i<legs[column - 1].length; ++i)
    {
      if(cur_row <legs[column - 1][i])
      {
        row_left = legs[column - 1][i];
        break;
      }
    }

    let row_right = 99;
    for(let i = 0; i<legs[column].length; ++i)
    {
      if(cur_row <legs[column][i])
      {
        row_right = legs[column][i];
        break;
      }
    }
    
    if(row_left < row_right)
      dir_right = false;
  }

  return dir_right;
};

const checkLegs = (legs, playerCount, player_js_index, case_js_index) => {    
    if(player_js_index < 0 || case_js_index < 0)
    {
      return legs;
    }

    //만약 js가 강제로 걸려야 한다면 보정
    //js를 플레이해본다.
    let predict_result = case_js_index;
    let column = player_js_index;        
    let cur_row = -1;

    //시뮬레이션 시작    
    let row = new Set();
    while(true)
    {
      let dir_right = dicisionDirIsRight(legs, playerCount, column, cur_row);

      if(dir_right)
        row = legs[column];
      else
        row = legs[column - 1];

      let is_break = true;
      for(let i = 0; i < row.length; ++i)
      {
        if(cur_row < row[i])
          {
            is_break = false;
            cur_row = row[i];
            break;
          }
      }

      if(is_break) 
      {
        predict_result = column;
        break;
      }
      
      if(dir_right)
        ++column;
      else 
        --column;
    }

    let last_row_num = 0;
    for(let i = 0; i < legs.length; ++i)
    {
      for(let j = 0; j < legs[i].length; ++j)
      {
        if(last_row_num < legs[i][j])
          last_row_num = legs[i][j];
      }
    }

    cur_row = last_row_num + 1;
    
    //더 오른쪽으로 가야 하는 경우    
    if(predict_result < case_js_index)
    {
      for(let i = predict_result; i < case_js_index; ++i)
      {
        legs[i].push(cur_row++);
      }
    }
    else if (predict_result > case_js_index)
    {      
      for(let i = predict_result; i > case_js_index; --i)
      {
        legs[i-1].push(cur_row++);
      }
    }

    return legs;
};

export { resetCase, resetName, getRandomLegs, getRandomPlayers, checkLegs };
