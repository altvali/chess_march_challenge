class FitnessSolver {
    constructor(data_map) {
        this.current_map = getEmptyDataMap()
        for (let i=0; i<ROWS; i++) {
            for (let j=0; j<COLS; j++) {
                this.current_map[i][j] = data_map[i][j]
            }
        }
        
        this.squad = extractSquad(this.current_map)
    }
    
    hasReachedDestination = () => {
        if (this.squad.king.x != this.squad.king.destination.x || this.squad.king.y != this.squad.king.destination.y) {
            return false;
        }
        for (let i=0; i<this.squad.followers.length; i++) {
            if (this.squad.followers[i].x != this.squad.followers[i].destination.x || this.squad.followers[i].y != this.squad.followers[i].destination.y) {
                return false;
            }
        }
        return true;
    }
    
    
    solve() {
        let step = 0, move_list = []
        while ( (!this.hasReachedDestination()) && (step < 1000) ) {
            let evaluated_moves = []
            let valid_moves = validKingMoves(this.squad, this.current_map)
            for (let move of valid_moves) {
                // for now the only cost is the diff 
                // between this piece's new position and final destination
                // smaller cost is better
                let cost = Math.sqrt(
                        Math.pow(move[2]-this.squad.king.destination.x, 2)
                      + Math.pow(move[3]-this.squad.king.destination.y, 2)
                    ) -
                    Math.sqrt(
                        Math.pow(move[0]-this.squad.king.destination.x, 2)
                      + Math.pow(move[1]-this.squad.king.destination.y, 2)
                    )
                evaluated_moves.push([cost, ...move])
            }
            
            for (let i=0; i<this.squad.followers.length; i++) {
                valid_moves = validPieceMoves(this.squad.followers[i],
                                              this.squad.king,
                                              this.current_map)
                for (let move of valid_moves) {
                    let cost = Math.sqrt(
                            Math.pow(move[2]-this.squad.followers[i].destination.x, 2)
                          + Math.pow(move[3]-this.squad.followers[i].destination.y, 2)
                        ) -
                        Math.sqrt(
                            Math.pow(move[0]-this.squad.followers[i].destination.x, 2)
                          + Math.pow(move[1]-this.squad.followers[i].destination.y, 2)
                        )
                    evaluated_moves.push([cost, ...move])
                }
            }
            if (!evaluated_moves.length) {
                break;
            }
            evaluated_moves.sort((a, b) => {
                return a[0] - b[0]
            })
            
            // make the best move
            let old_x = evaluated_moves[0][1],
                old_y = evaluated_moves[0][2],
                new_x = evaluated_moves[0][3],
                new_y = evaluated_moves[0][4],
                piece_type = this.current_map[old_x][old_y]
            
            move_list.push([old_x, old_y, new_x, new_y])
            
            if (old_x == this.squad.king.destination.x &&
                old_y == this.squad.king.destination.y
            ) {
                this.current_map[old_x][old_y] = 8
            } else {
                this.current_map[old_x][old_y] = 0
            }
            this.current_map[new_x][new_y] = piece_type
            
            if (PIECE_TYPES[piece_type] == "king") {
                this.squad.king.x = new_x
                this.squad.king.y = new_y
            } else {
                for (let i=0; i<this.squad.followers.length; i++) {
                    if (old_x == this.squad.followers[i].x && old_y == this.squad.followers[i].y) {
                        this.squad.followers[i].x = new_x
                        this.squad.followers[i].y = new_y
                        break
                    }
                }
            }
            
            step += 1
        }
        
        return move_list;
    }
}