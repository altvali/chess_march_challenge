class MovePlayer {

    constructor () {
    
    }

    load (initial_map, move_list) {
        this.initial_map = []
        for (let i=0; i<initial_map.length; i++) {
            this.initial_map[i] = initial_map[i].slice()
        }
        this.move_list = move_list
        this.first()
    }
    
    first = () => {
        this.cancelAnimation()
        this.move_index = 0
        this.current_map = []
        for (let i=0; i<this.initial_map.length; i++) {
            this.current_map[i] = this.initial_map[i].slice()
        }
        this.squad = extractSquad(this.current_map)
        populateTable(this.current_map)
    }
    
    computeNextMove = () => {
        // returns true if succeeds, false if invalid or no move to play
        if (this.move_index >= this.move_list.length) {
            return false
        }
        let old_x = this.move_list[this.move_index][0],
            old_y = this.move_list[this.move_index][1],
            new_x = this.move_list[this.move_index][2],
            new_y = this.move_list[this.move_index][3],
            piece_type = this.current_map[old_x][old_y],
            valid_moves;
        
        let follower_index;
        
        if (PIECE_TYPES[piece_type] == "king") {
            valid_moves = validKingMoves(this.squad, this.current_map)
        } else {
            for (let i=0; i<this.squad.followers.length; i++) {
                if (old_x == this.squad.followers[i].x && old_y == this.squad.followers[i].y) {
                    follower_index = i;
                    break;
                }
            }
            valid_moves = validPieceMoves(this.squad.followers[follower_index], 
                                          this.squad.king,
                                          this.current_map)
        }
        // check if the move is among the valid ones
        let valid = false
        for (let i=0; i<valid_moves.length; i++) {
            if (this.move_list[this.move_index][0] == valid_moves[i][0] &&
                this.move_list[this.move_index][1] == valid_moves[i][1] &&
                this.move_list[this.move_index][2] == valid_moves[i][2] &&
                this.move_list[this.move_index][3] == valid_moves[i][3]
            ) {
                valid = true;
                break;
            }
        }
        if (!valid) {
            return false;
        }
        // make the move by changing squad and current_map
        if (old_x == this.squad.king.destination.x && old_y == this.squad.king.destination.y) {
            this.current_map[old_x][old_y] = 8
        } else {
            this.current_map[old_x][old_y] = 0
        }
        this.current_map[new_x][new_y] = piece_type
        if (PIECE_TYPES[piece_type] == "king") {
            this.squad.king.x = new_x
            this.squad.king.y = new_y
        } else {
            this.squad.followers[follower_index].x = new_x
            this.squad.followers[follower_index].y = new_y
        }
        this.move_index += 1;
        return true;
    }
    
    prev = () => {
        this.cancelAnimation()
        if (this.move_index) {
            let old_x = this.move_list[this.move_index-1][2],
                old_y = this.move_list[this.move_index-1][3],
                new_x = this.move_list[this.move_index-1][0],
                new_y = this.move_list[this.move_index-1][1],
                piece_type = this.current_map[old_x][old_y]
            if (old_x == this.squad.king.destination.x && old_y == this.squad.king.destination.y) {
                this.current_map[old_x][old_y] = 8
            } else {
                this.current_map[old_x][old_y] = 0
                
            }
            this.current_map[new_x][new_y] = piece_type
            
            if (old_x == this.squad.king.x && old_y == this.squad.king.y) {
                this.squad.king.x = new_x
                this.squad.king.y = new_y
            } else {
                for (let i=0; i<this.squad.followers.length; i++) {
                    if (old_x == this.squad.followers[i].x && old_y == this.squad.followers[i].y) {
                        this.squad.followers[i].x = new_x
                        this.squad.followers[i].y = new_y
                        break;
                    }
                }
            }
            this.move_index -= 1;
            populateTable(this.current_map)
        }
    }
    
    play = () => {
        if (this.timeout) {
            this.cancelAnimation()
        } else {
            if (this.computeNextMove()) {
                populateTable(this.current_map)
                document.getElementById("play").innerHTML = "&squf;";
                this.timeout = setTimeout(this.playAnimation, 250)
            }
        }
    }
    
    playAnimation = () => {
        if (this.computeNextMove()) {
            populateTable(this.current_map)
            this.timeout = setTimeout(this.playAnimation, 250)
        } else {
            this.cancelAnimation()
        }
    }
    
    cancelAnimation = () => {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = false;
            document.getElementById("play").innerHTML = "&rtrif;";
        }
    }
    
    next = () => {
        this.cancelAnimation()
        if (this.computeNextMove()) {
            populateTable(this.current_map)
        }
        
    }
    
    last = () => {
        this.cancelAnimation()
        while (this.computeNextMove()) {}
        populateTable(this.current_map)
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
}