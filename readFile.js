var fs = require('fs');
const array = fs.readFileSync('ptbr-words.txt').toString().split("\n");
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Z","Y","W"]
let totals = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I: 0, J: 0, K: 0, L: 0, M: 0, N: 0, O: 0, P: 0, Q: 0, R: 0, S: 0, T: 0, U: 0, V: 0, X: 0, Z: 0, Y: 0, W: 0 }

const getTotals = (words) => {
    for(i=0;i<words.length;i++){
        wordLetters = words[i].split("")
        let letterTotal = totals[wordLetters[0]] + totals[wordLetters[1]] + totals[wordLetters[2]] + totals[wordLetters[3]] + totals[wordLetters[4]]
        console.log(`${words[i]};${letterTotal}`)
    }
}

alphabet.forEach( letter => {
    for(i = 0; i < array.length ; i++ ) {
        if (array[i].includes(letter)){
            totals[letter]++
        }
    }
})

console.log(totals)

const ptbrWords = fs.readFileSync('ptbr-words.txt').toString().split("\n");
let fiveLetters = []
let fourLetters = []
let treeLetters = []
let twoLetters = []
let oneLetter = []
for(i=0;i<ptbrWords.length;i++) {
    wordLetters = ptbrWords[i].split("")
    let uniqueLetters = []

    for(j=0;j<wordLetters.length;j++) {
        if (!uniqueLetters.includes(wordLetters[j])){
            uniqueLetters.push(wordLetters[j])
        }
    }

    switch (uniqueLetters.length) {
        case 1:
            oneLetter.push(ptbrWords[i])
            break
        case 2:
            twoLetters.push(ptbrWords[i])
            break
        case 3:
            treeLetters.push(ptbrWords[i])
            break
        case 4:
            fourLetters.push(ptbrWords[i])
            break
        case 5:
            fiveLetters.push(ptbrWords[i])
            break
        default:
            oneLetter.push(ptbrWords[i])
            break
    }


    // if (wordLetters[0] == wordLetters[1] || wordLetters[0] == wordLetters[2] || wordLetters[0] == wordLetters[3] || wordLetters[0] == wordLetters[4]) {
    //     continue
    // }
    // if (wordLetters[1] == wordLetters[2] || wordLetters[1] == wordLetters[3] || wordLetters[1] == wordLetters[4] ) {
    //     continue
    // }
    // if (wordLetters[2] == wordLetters[3] || wordLetters[2] == wordLetters[4]) {
    //     continue
    // }
    // if (wordLetters[3] == wordLetters[4]) {
    //     continue
    // }
    // let letterTotal = totals[wordLetters[0]] + totals[wordLetters[1]] + totals[wordLetters[2]] + totals[wordLetters[3]] + totals[wordLetters[4]]
    // console.log(`${ptbrWords[i]};${letterTotal}`)
}

getTotals(fiveLetters)
console.log(';')

getTotals(fourLetters)
console.log(';')

getTotals(treeLetters)
console.log(';')

getTotals(twoLetters)
console.log(';')

getTotals(oneLetter)
