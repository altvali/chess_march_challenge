class Tests {
    constructor () {
        this.test_sets = []
        this.genTest0()
        this.genTest1()
        this.genTest2()
        this.genTest3()
        this.genTest4()
        this.genTest5()
        this.genTest6()
        this.genTest7()
        this.genTest8()
        this.genTest9()
        this.genTest10()
        this.genTest11()
        this.genTest12()
        this.genTest13()
        this.genTest14()
        this.genTest15()
    }
    
    genTest0 = () => {
        let map = getEmptyDataMap()
        map[20][20] = 7
        map[19][20] = 2
        map[21][20] = 2
        map[20][25] = 8
        this.test_sets.push(map)
    }
    genTest1 = () => {
        let map = getEmptyDataMap()
        map[20][20] = 7
        map[19][20] = 2
        map[21][20] = 2
        map[20][30] = 8
        this.test_sets.push(map)
    }
    genTest2 = () => {
        let map = getEmptyDataMap()
        map[19][19] = 2
        map[19][20] = 2
        map[19][21] = 2
        map[20][19] = 2
        map[20][20] = 7
        map[20][21] = 2
        map[21][19] = 2
        map[21][20] = 2
        map[21][21] = 2
        map[30][30] = 8
        this.test_sets.push(map)
    }
    genTest3 = () => {
        let map = getEmptyDataMap()
        map[20][20] = 7
        map[19][20] = 2
        map[18][20] = 2
        map[17][20] = 2
        map[16][20] = 2
        map[15][20] = 2
        map[14][20] = 2
        map[13][20] = 2
        map[12][20] = 2
        map[10][20] = 8
        this.test_sets.push(map)
    }
    genTest4 = () => {
        let map = getEmptyDataMap()
        map[20][20] = 7
        map[19][20] = 2
        map[18][20] = 2
        map[17][20] = 2
        map[16][20] = 2
        map[15][20] = 2
        map[14][20] = 2
        map[13][20] = 2
        map[12][20] = 2
        map[30][20] = 8
        this.test_sets.push(map)
    }
    genTest5 = () => {
        let map = getEmptyDataMap()
        map[19][19] = 3
        map[19][20] = 3
        map[19][21] = 3
        map[20][19] = 3
        map[20][20] = 7
        map[20][21] = 3
        map[21][19] = 3
        map[21][20] = 3
        map[21][21] = 3
        map[30][30] = 8
        this.test_sets.push(map)
    }
    genTest6 = () => {
        let map = getEmptyDataMap()
        map[19][19] = 4
        map[19][20] = 4
        map[19][21] = 4
        map[20][19] = 4
        map[20][20] = 7
        map[20][21] = 4
        map[21][19] = 4
        map[21][20] = 4
        map[21][21] = 4
        map[30][30] = 8
        this.test_sets.push(map)
    }
    genTest7 = () => {
        let map = getEmptyDataMap()
        map[19][19] = 5
        map[19][20] = 5
        map[19][21] = 5
        map[20][19] = 5
        map[20][20] = 7
        map[20][21] = 5
        map[21][19] = 5
        map[21][20] = 5
        map[21][21] = 5
        map[30][30] = 8
        this.test_sets.push(map)
    }
    genTest8 = () => {
        let map = getEmptyDataMap()
        map[19][19] = 6
        map[19][20] = 6
        map[19][21] = 6
        map[20][19] = 6
        map[20][20] = 7
        map[20][21] = 6
        map[21][19] = 6
        map[21][20] = 6
        map[21][21] = 6
        map[30][30] = 8
        this.test_sets.push(map)
    }
    genTest9 = () => {
        let map = getEmptyDataMap()
        map[19][19] = 2
        map[19][20] = 3
        map[19][21] = 4
        map[20][19] = 6
        map[20][20] = 7
        map[20][21] = 2
        map[21][19] = 3
        map[21][20] = 4
        map[21][21] = 5
        map[30][30] = 8
        this.test_sets.push(map)
    }
    genTest10 = () => {
        let map = getEmptyDataMap()
        map[12][12] = 2
        map[12][20] = 3
        map[12][28] = 4
        map[20][12] = 6
        map[20][20] = 7
        map[20][28] = 2
        map[28][12] = 3
        map[28][20] = 4
        map[28][28] = 5
        map[30][40] = 8
        this.test_sets.push(map)
    }
    genTest11 = () => {
        let map = getEmptyDataMap()
        map[19][19] = 2
        map[19][20] = 3
        map[19][21] = 4
        map[20][19] = 6
        map[20][20] = 7
        map[20][21] = 2
        map[21][19] = 3
        map[21][20] = 4
        map[21][21] = 5
        for (let i=15; i<26; i++) {
            map[i][30] = 1
            map[i][31] = 1
        }
        map[20][40] = 8
        this.test_sets.push(map)
    }
    genTest12 = () => {
        let map = getEmptyDataMap()
        map[19][19] = 3
        map[19][20] = 3
        map[19][21] = 3
        map[20][19] = 3
        map[20][20] = 7
        map[20][21] = 3
        map[21][19] = 3
        map[21][20] = 3
        map[21][21] = 3
        for (let i=15; i<26; i++) {
            map[i][30] = 1
        }
        map[20][40] = 8
        this.test_sets.push(map)
    }
    genTest13 = () => {
        let map = getEmptyDataMap()
        map[19][19] = 2
        map[19][20] = 3
        map[19][21] = 4
        map[20][19] = 6
        map[20][20] = 7
        map[20][21] = 2
        map[21][19] = 3
        map[21][20] = 4
        map[21][21] = 5
        for (let i=25; i<36; i++) {
            map[13][i] = 1
            map[14][i] = 1
            map[15][i] = 1
            map[16][i] = 1
            map[17][i] = 1
            map[22][i] = 1
            map[23][i] = 1
            map[24][i] = 1
            map[25][i] = 1
            map[26][i] = 1
            map[27][i] = 1
        }
        map[20][40] = 8
        this.test_sets.push(map)
    }
    genTest14 = () => {
        let map = getEmptyDataMap()
        map[19][19] = 2
        map[19][20] = 3
        map[19][21] = 4
        map[20][19] = 6
        map[20][20] = 7
        map[20][21] = 2
        map[21][19] = 3
        map[21][20] = 4
        map[21][21] = 5
        for (let i=25; i<36; i++) {
            map[13][i] = 1
            map[14][i] = 1
            map[15][i] = 1
            map[16][i] = 1
            map[17][i] = 1
            map[18][i] = 1
            map[21][i] = 1
            map[22][i] = 1
            map[23][i] = 1
            map[24][i] = 1
            map[25][i] = 1
            map[26][i] = 1
            map[27][i] = 1
        }
        map[20][40] = 8
        this.test_sets.push(map)
    }
    genTest15 = () => {
        let map = getEmptyDataMap()
        map[19][19] = 2
        map[19][20] = 2
        map[19][21] = 2
        map[20][19] = 2
        map[20][20] = 7
        map[20][21] = 2
        map[21][19] = 2
        map[21][20] = 2
        map[21][21] = 2
        for (let i=25; i<36; i++) {
            map[13][i] = 1
            map[14][i] = 1
            map[15][i] = 1
            map[16][i] = 1
            map[17][i] = 1
            map[18][i] = 1
            map[21][i] = 1
            map[22][i] = 1
            map[23][i] = 1
            map[24][i] = 1
            map[25][i] = 1
            map[26][i] = 1
            map[27][i] = 1
        }
        map[20][40] = 8
        this.test_sets.push(map)
    }
}
