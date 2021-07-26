# Chess Squad March

You control a chess squad consisting of a king and several other pieces, on a chess board. Your army is placed so that no piece is further than K=8 squares away (horizontally and vertically) from your king. You will receive a destination square for the king and you must generate a list of moves for all your pieces so that your king reaches that square and your pieces' final positions will be at the same distances from your final king as the distances between your pieces' initial positions and the initial king. The constraint that no piece can wander further than K=8 squares from the king (in any direction) must be respected at all times.

# Inputs and Outputs

The board is a matrix of size 41x51, with each cell containing a digit with the following meaning:

 - 0: empty square
 - 1: obstacle square
 - 2: your pawn
 - 3: your knight
 - 4: your bishop
 - 5: your rook
 - 6: your queen
 - 7: your king
 - 8: your final king position
 - 9: unused
 
Your task is to write a function that, being given a matrix, generates a list of moves, in order, so that the king reaches the final king position and the other pieces reach their final positions, relative to the king. The format of the list should be an array of moves, where the move is an array of the form `[x1, y1, x2, y2]`. See the example solver for details.

# Extended Rules

 - Pawns move one square orthogonally, in any direction
 - All special moves from chess are invalid in this setting: two-square pawn advance, en passant, pawn promotion, castling
 - "no-further-than-8" rule: no move that makes a piece become further than 8 squares away from the king (horizontally or vertically) is allowed

# Scoring

The controller (challenge.html) comes with a battery of 16 test sets.
If your solver doesn't output a move list consisting only of valid moves and having the final position of the pieces at their destination fields, you score 10000 for that test. Otherwise, you score the number of moves in your solution. The lowest total score wins.

# Controller

You can open the controller (challenge.html) in your browser and interact with it using your browser's console. No local server required.
Use the dropdown to visualize any of the test set positions.

You can look at a sample solver implementation in the javascript of the page. It outputs a hardcoded best solution to the test set 0, but keep in mind that only a general solver is accepted for the contest. Your own solver will have to take as input the data_map matrix and output the list of valid moves in the same format (explained above).

To evaluate your solver, you can type in the browser console the following:

    evaluate(window.t.test_sets, solver)

It will reply with a breakdown of your score, per category, and the total score.

To visualize one of your solutions your can use the Move Player. Example using the first test set and the default solver:

    var move_list = solver(window.t.test_sets[0])
    window.mp.load(window.t.test_sets[0], move_list)
    
This will load the map and the moves up to the last valid move. You'll be able to use the Move Player's buttons to interact to your solution.

# Submissions

Submit your solver function and total score achieved at the Code Golf StackExchange challenge page at https://codegolf.stackexchange.com/questions/231812/chess-squad-march . Remember, the solver must generalize well and your score should be as low as possible. Good luck!
