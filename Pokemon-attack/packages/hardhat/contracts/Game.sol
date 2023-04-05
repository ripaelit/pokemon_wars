// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC1155LazyMint.sol";

error GAME_NOT_ACTIVE();

contract Pokemon_Wars is ERC1155LazyMint {
  event LevelUp(address indexed account, uint256 indexed level);
  event BattleWon(address indexed attacker, address indexed victim, uint256 indexed level, uint256 timestamp);
  event BattleBegins(address indexed starter, uint256 indexed id, uint256 indexed timestamp);

  uint256 public immutable gameTime = 24 hours;
  bool public started;
  address[] private allWinners;

  struct Game {
    uint256 gameStartingTime;
    uint256 gameEndingTime;
    bool gameActive;
    address[] allPlayers;
    bool winnerRewarded;
    address winner;
    uint256 reward;
    mapping(address => uint256) playerScore;
  }

  mapping(uint256 => Game) public games;
  uint256 public gameId;

  constructor(
    string memory _name,
    string memory _symbol,
    address _royaltyRecipient,
    uint128 _royaltyBps
  ) ERC1155LazyMint(_name, _symbol, _royaltyRecipient, _royaltyBps) {
    games[gameId].gameStartingTime = block.timestamp;
    games[gameId].gameEndingTime = block.timestamp + gameTime;
    games[gameId].gameActive = true;
    started = true;
  }

  /*
  @dev start new game
  */
  function startNewGame() public {
    Game storage _game = games[gameId];
    require(_game.gameEndingTime < block.timestamp, "Game not ended");
    if (_game.gameActive) {
      _game.gameActive = false;
    }
    if (!_game.winnerRewarded) {
      rewardWinner();
    }
    gameId += 1;
    games[gameId].gameStartingTime = block.timestamp;
    games[gameId].gameEndingTime = block.timestamp + gameTime;
    games[gameId].gameActive = true;
    emit BattleBegins(msg.sender, gameId, block.timestamp);
  }

  modifier isGameActive() {
    if (!started || !games[gameId].gameActive) {
      revert GAME_NOT_ACTIVE();
    }
    _;
  }

  modifier CheckGameTime() {
    require(games[gameId].gameEndingTime > block.timestamp, "GAME ENDED");
    _;
  }

  /*
  @dev claim a level one pickachu to start playing
  */
  function claimLevelOnePichu() external payable isGameActive CheckGameTime {
    require(msg.value == 0.1 ether, "NOT_ENOUGH_ETHER");
    claim(msg.sender, 0, 1);
    games[gameId].allPlayers.push(msg.sender);
    games[gameId].playerScore[msg.sender] += 2;
    emit LevelUp(msg.sender, 1);
  }

  /*
  @dev Transfer level 1 pickachu to upgrade to a level 2 
  */
  function safeTransferFrom(
    address from,
    address to,
    uint256 id,
    uint256 amount,
    bytes memory data
  ) public override isGameActive CheckGameTime {
    require(id == 0, "This NFT is not transferrable");
    require(balanceOf[to][0] == 0 && balanceOf[to][1] == 0 && balanceOf[to][2] == 0, "Player already owns an NFT");
    super.safeTransferFrom(from, to, id, amount, data);
    // if the address already exists don't push it
    games[gameId].allPlayers.push(to);
    if (from != to && id == 0) {
      _mint(msg.sender, 1, 1, "");
      emit LevelUp(msg.sender, 2);
    }
  }

  /*
  @dev Burn a level 2 pickachu to upgrade to a level 3 pickachu
  */
  function burn(address account, uint256 id, uint256 amount) external override isGameActive CheckGameTime {
    require(msg.sender == account || balanceOf[msg.sender][2] > 0, "Not Token Owner or no level 3 pickachu");
    _burn(msg.sender, 1, 1);
    if (id == 1) {
      _mint(msg.sender, 2, 1, "");
      games[gameId].playerScore[msg.sender] += 1;
      emit LevelUp(msg.sender, 3);
    }
  }

  /*
  @dev verify the claim
  */
  function verifyClaim(
    address _claimer,
    uint256 _tokenId,
    uint256 _quantity
  ) public view virtual override isGameActive {
    // Your custom claim restriction logic
    require(_tokenId == 0, "Only Level 1 pickachu can be claimed");
    require(balanceOf[msg.sender][0] == 0, "Already got a level 1 pickachu");
    require(balanceOf[msg.sender][1] == 0, "Already got a level 2 pickachu");
    require(balanceOf[msg.sender][2] == 0, "Already got a level 3 pickachu");
  }

  /*
  @dev Attack other players and earn points
  */
  function attack(address _victim) external isGameActive CheckGameTime {
    require(balanceOf[msg.sender][2] > 0, "You don't own a level 3 pickachu to attack");
    require(msg.sender != _victim, "You can't attack yourself");
    uint256 tokenToAttack = 0;
    if (balanceOf[_victim][0] > 0) {
      tokenToAttack = 0;
    } else if (balanceOf[_victim][1] > 0) {
      tokenToAttack = 1;
    } else if (balanceOf[_victim][2] > 0) {
      tokenToAttack = 2;
    } else {
      revert("Address has no NFT");
    }
    _burn(_victim, tokenToAttack, 1);
    _mint(msg.sender, 3, 1, "");
    games[gameId].playerScore[msg.sender] += 2;
    emit BattleWon(msg.sender, _victim, tokenToAttack + 1, block.timestamp);
  }

  function getScore(address player) public view returns (uint256) {
    return games[gameId].playerScore[player];
  }

  /*
    @dev reward winner of the game
    */
  function rewardWinner() public {
    Game storage _game = games[gameId];
    require(block.timestamp > _game.gameEndingTime, "GAME_ONGOING");
    address winner = _game.allPlayers[0];
    for (uint256 i = 1; i < _game.allPlayers.length; i++) {
      uint256 playerScore = getScore(_game.allPlayers[i]);
      uint256 currentWinnerScore = getScore(winner);
      if (playerScore > currentWinnerScore) {
        winner = _game.allPlayers[i];
        _game.winner = winner;
      }
    }
    _game.reward = address(this).balance;
    (bool sent, ) = winner.call{value: address(this).balance}("");
    require(sent && winner != address(0), "Failed to reward winner");
    allWinners.push(winner);
    _game.winnerRewarded = true;
  }

  /*
    @dev Getter function to get all the players
    */
  function getPlayers(uint256 _id) public view returns (address[] memory) {
    return games[_id].allPlayers;
  }

  /*
  @dev Getter function to get all the winners
  */
  function getAllWinners() public view returns (address[] memory) {
    return allWinners;
  }

  /*
  @dev Allow the owner to be able to pause the contract
  */
  function pauseGame() external {
    require(msg.sender == owner(), "NOT OWNER");
    started = false;
  }

  function checkIfGameEnded() public view returns (bool) {
    return true ? block.timestamp > games[gameId].gameEndingTime : false;
  }

  function getContractBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function getGameReward(uint256 _id) public view returns (uint256) {
    return games[_id].reward;
  }
}
