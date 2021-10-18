class AStarSolver {
    constructor(data_map) {
        this.current_map = getEmptyDataMap()
        for (let i=0; i<ROWS; i++) {
            for (let j=0; j<COLS; j++) {
                this.current_map[i][j] = data_map[i][j]
            }
        }
        
        this.squad = extractSquad(this.current_map)
    }
    
    hasReachedDestination = (squad) => {
        if (squad.king.x != squad.king.destination.x || squad.king.y != squad.king.destination.y) {
            return false;
        }
        for (let i=0; i<squad.followers.length; i++) {
            if (squad.followers[i].x != squad.followers[i].destination.x || squad.followers[i].y != squad.followers[i].destination.y) {
                return false;
            }
        }
        return true;
    }
    
    partialHeuristic(piece) {
        // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
        let delta = {
                x: piece.destination.x - piece.x,
                y: piece.destination.y - piece.y
            },
            abs_x = Math.abs(delta.x),
            abs_y = Math.abs(delta.y),
            cross_factor = 0.001,
            cross = Math.abs(delta.x*this.squad.delta.y - this.squad.delta.x*delta.y)
        
        if (!("type" in piece)) { // king
            return Math.max(abs_x, abs_y) + cross*cross_factor
        }
        if (piece.type == "pawn") {
            return abs_x + abs_y
        }
        // and https://math.stackexchange.com/questions/1135683/minimum-number-of-steps-for-knight-in-chess
        if (piece.type=="knight") {
            if (abs_x==2 && abs_y==2) {
                return 4
            }
            if ((abs_x+abs_y)==1) {
                return 3
            }
            
            let m_prime = Math.ceil(
                    Math.max( abs_x/2, abs_y/2, (abs_x+abs_y)/3 )
                )
            return m_prime + ((m_prime +abs_x + abs_y) % 2)
        }
        if (piece.type=="rook") {
            return Math.ceil((abs_x + abs_y)/MOVE_MAX_DISTANCE)
        }
        if (piece.type=="bishop") {
            return Math.ceil(Math.max(abs_x, abs_y)/MOVE_MAX_DISTANCE)
        }
        if (piece.type=="queen") {
            return Math.ceil(Math.max(abs_x, abs_y)/MOVE_MAX_DISTANCE)
        }
        // we should never reach this
        return 1
    }
    
    // sum up the heuristics for all the pieces that need to get to the end
    heuristic(squad) {
        let total_heuristic = this.partialHeuristic(squad.king)
        for (let i=0; i<squad.followers.length; i++) {
            total_heuristic += this.partialHeuristic(squad.followers[i])
        }
        return total_heuristic
    }
    
    copySquad(squad) {
        let new_squad = {
            king: {
                x: squad.king.x,
                y: squad.king.y,
                destination: {
                    x: squad.king.destination.x,
                    y: squad.king.destination.y
                }
            },
            followers: []
        }
        for (let follower of squad.followers) {
            new_squad.followers.push({
                x: follower.x,
                y: follower.y,
                type: follower.type,
                destination: {
                    x: follower.destination.x,
                    y: follower.destination.y
                }
            })
        }
        return new_squad
    }
    
    copyMap(data_map) {
        let arr = [];
        for (let i=0; i<ROWS; i++) {
            let row = [];
            for (let j=0; j<COLS; j++) {
                row.push(data_map[i][j]);
            }
            arr.push(row);
        }
        return arr;
    }
    
    // piece_index helps us know which follower needs to be changed in the squad
    // piece_index is -1 if the piece is the king
    getNode(node, move, piece_index) {
        let new_node = {
            squad: this.copySquad(node.squad),
            data_map: this.copyMap(node.data_map),
            move: move,
            f: 0,
            g: 0,
            h: 0,
            visited: false,
            closed: false,
            debug: "",
            parent: null
        }
        
        let old_x = move[0],
            old_y = move[1],
            new_x = move[2],
            new_y = move[3]
        
        new_node.data_map[new_x][new_y] = node.data_map[old_x][old_y]
        if (old_x == this.squad.king.destination.x && old_y == this.squad.king.destination.y) {
            new_node.data_map[old_x][old_y] = 8
        } else {
            new_node.data_map[old_x][old_y] = 0
        }
        
        if (piece_index == -1) {
            new_node.squad.king.x = new_x
            new_node.squad.king.y = new_y
        } else {
            new_node.squad.followers[piece_index].x = new_x
            new_node.squad.followers[piece_index].y = new_y
        }
        return new_node
    }
    
    // a node nas a squad and a data_map
    neighbors = (node) => {
        let ret = []
        
        let valid_moves = validKingMoves(node.squad, node.data_map);
        for (let move of valid_moves) {
            ret.push(this.getNode(node, [...move], -1))
        }
        
        for (let i=0; i<node.squad.followers.length; i++) {
            valid_moves = validPieceMoves(node.squad.followers[i],
                                              node.squad.king,
                                              node.data_map)
            for (let move of valid_moves) {
                ret.push(this.getNode(node, [...move], i))
            }
        }
        return ret
    }
    
    search() {
        let visited_nodes = {}
        let start = {
            squad: this.squad,
            data_map: this.current_map,
            f: 0,
            g: 0,
            h: this.heuristic(this.squad),
            visited: false,
            closed: false,
            debug: "",
            parent: null
        }
        
        var openHeap = new BinaryHeap(function(node){return node.f;});
        
        openHeap.push(start);
        
        let node_checks = 0
        
        while(openHeap.size() > 0) {
            
            // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
            var current_node = openHeap.pop();
            // console.log("current_node", current_node.g, current_node.h, current_node.move)
            node_checks += 1
            if (node_checks % 1000 == 0) {
                console.log(node_checks, "checking move", current_node.move)
            }
            // End case -- result has been found, return the traced path
            if (this.hasReachedDestination(current_node.squad)) {
                var curr = current_node;
                curr
                var ret = [];
                while(curr.parent) {
                    ret.push(curr);
                    curr = curr.parent;
                }
                return ret.reverse();
            }
            
            // Normal case -- move current_node from open to closed, process each of its neighbors
            current_node.closed = true;
            
            var neighbors = this.neighbors(current_node)
            for(var i=0; i<neighbors.length; i++) {
                var neighbor = neighbors[i];
                
                if (neighbor.closed) {
                    // not a valid node to process, skip to next neighbor
                    continue;
                }
                
                // g score is the shortest distance from start to current node, we need to check if
                //   the path we have arrived at this neighbor is the shortest one we have seen yet
                // 1 is the distance from a node to it's neighbor.  This could be variable for weighted paths.
                var gScore = current_node.g + 1;
                let slug = JSON.stringify(neighbor.data_map)
                var beenVisited = (slug in visited_nodes);
                
                if(!beenVisited || gScore < neighbor.g) {
                
                    // Found an optimal (so far) path to this node.  Take score for node to see how good it is.				    
                    neighbor.visited = true;
                    visited_nodes[slug] = neighbor
                    neighbor.parent = current_node;
                    neighbor.h = neighbor.h || this.heuristic(neighbor.squad);
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.debug = "F: " + neighbor.f + " G: " + neighbor.g + " H: " + neighbor.h;
                    
                    // console.log(neighbor.g, neighbor.h, neighbor.move)
                    if (!beenVisited) {
                        // Pushing to heap will put it in proper place based on the 'f' value.
                        openHeap.push(neighbor);
                    }
                    else {
                        // Already seen the node, but since it has been rescored we need to reorder it in the heap
                        openHeap.rescoreElement(visited_nodes[slug]);
                    }
                }
            }
            // debugger;
        }
        
        // No result was found -- empty array signifies failure to find path
        return [];
    }

    solve() {
        let nodes = this.search(),
            move_list = []
        console.log("solution length", nodes.length);
        for (let i=0; i<nodes.length; i++) {
            move_list.push(nodes[i].move)
        }
        return move_list;
    }
}

// Binary Heap
// Taken from http://eloquentjavascript.net/appendix2.html
// License: http://creativecommons.org/licenses/by/3.0/
function BinaryHeap(scoreFunction){
  this.content = [];
  this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
  push: function(element) {
    // Add the new element to the end of the array.
    this.content.push(element);
    // Allow it to sink down.
    this.sinkDown(this.content.length - 1);
  },
  
  pop: function() {
    // Store the first element so we can return it later.
    var result = this.content[0];
    // Get the element at the end of the array.
    var end = this.content.pop();
    // If there are any elements left, put the end element at the
    // start, and let it bubble up.
    if (this.content.length > 0) {
      this.content[0] = end;
      this.bubbleUp(0);
    }
    return result;
  },
  remove: function(node) {
    var len = this.content.length;
    // To remove a value, we must search through the array to find
    // it.
    for (var i = 0; i < len; i++) {
      if (this.content[i] == node) {
        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        var end = this.content.pop();
        if (i != len - 1) {
          this.content[i] = end;
          if (this.scoreFunction(end) < this.scoreFunction(node))
            this.sinkDown(i);
          else
            this.bubbleUp(i);
        }
        return;
      }
    }
    throw new Error("Node not found.");
  },

  size: function() {
    return this.content.length;
  },

  rescoreElement: function(node) {
  	this.sinkDown(this.content.indexOf(node));
  },
  sinkDown: function(n) {
    // Fetch the element that has to be sunk.
    var element = this.content[n];
    // When at 0, an element can not sink any further.
    while (n > 0) {
      // Compute the parent element's index, and fetch it.
      var parentN = Math.floor((n + 1) / 2) - 1,
          parent = this.content[parentN];
      // Swap the elements if the parent is greater.
      if (this.scoreFunction(element) < this.scoreFunction(parent)) {
        this.content[parentN] = element;
        this.content[n] = parent;
        // Update 'n' to continue at the new position.
        n = parentN;
      }
      // Found a parent that is less, no need to sink any further.
      else {
        break;
      }
    }
  },

  bubbleUp: function(n) {
    // Look up the target element and its score.
    var length = this.content.length,
        element = this.content[n],
        elemScore = this.scoreFunction(element);

    while(true) {
      // Compute the indices of the child elements.
      var child2N = (n + 1) * 2, child1N = child2N - 1;
      // This is used to store the new position of the element,
      // if any.
      var swap = null;
      // If the first child exists (is inside the array)...
      if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N],
            child1Score = this.scoreFunction(child1);
        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore)
          swap = child1N;
      }
      // Do the same checks for the other child.
      if (child2N < length) {
        var child2 = this.content[child2N],
            child2Score = this.scoreFunction(child2);
        if (child2Score < (swap == null ? elemScore : child1Score))
          swap = child2N;
      }

      // If the element needs to be moved, swap it, and continue.
      if (swap != null) {
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
      }
      // Otherwise, we are done.
      else {
        break;
      }
    }
  }
};