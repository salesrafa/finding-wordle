const readline = require('readline-sync')
const axios = require('axios');
const fs = require('fs');

const ptUrl = "https://significado.herokuapp.com/"
const enUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Z","Y","W"]
const getOnline = false
const getRanked = true
const dictionaryFile = 'ptbr-words.txt'

const rankingPossibilities = (possibilities) => {
    let fileWords = fs.readFileSync('test.txt').toString().split("\n");
    let rankedPossibilities = []
    for(i=0;i<possibilities.length;i++) {
        for(j=0;j<fileWords.length;j++) {
            let row = fileWords[j].split(';')
            if (possibilities[i] == row[0]){
                // rankedPossibilities.push(`${row[0]};${row[2]}`)
                rankedPossibilities.push({value: row[0], ranking: row[2]})
                break
            }
        }
    }
    return rankedPossibilities
}

const getDictionaryWords = (possibilities) => {

    let fileWords = fs.readFileSync(dictionaryFile).toString().split("\n");
    let words = []
    for( i = 0; i < possibilities.length ; i++ ) {

        if (fileWords.includes(possibilities[i])) {
            words.push(possibilities[i])
            console.log(possibilities[i])
        }
    }
    return words
}

const getDictionaryWordsOnline = async (possibilities) => {

    let words = []
    for( i = 0; i < possibilities.length ; i++ ) {
        try {
            await axios.get(`${ptUrl}${possibilities[i]}`)
        } catch (e) {
            continue
        }
        console.log(possibilities[i])
        words.push(possibilities[i])
    }
    return words
}

const getLetter = (message) => {
    let letter
    do {
        console.log("\n")
        letter = readline.question(`Você sabe qual é a ${message} letra?\n`)
        if (letter.length > 1) {
            console.warn("Só pode uma letra")
        }
    } while (letter.length > 1)
    return letter || null
}

const isValidWord = (included, word) => {
    for(i = 0; i < included.length; i++) {
        if (!word.includes(included[i].value)){
            return false
        }
    }
    return true
}

const getWordPossibilities = (lettersIncluded, first, second, third, fourth, fifth) => {
    possibilities = []
    word = []
    first.forEach(firstLetter => {
        word[0] = firstLetter
        second.forEach(secondLetter => {
            word[1] = secondLetter
            third.forEach(thirdLetter => {
                word[2] = thirdLetter
                fourth.forEach(fourthLetter => {
                    word[3] = fourthLetter
                    fifth.forEach(fifthLetter => {
                        word[4] = fifthLetter
                        if (isValidWord(lettersIncluded, word)) {
                            possibilities.push(word.join(""))
                        }
                    })
                })
            })
        })
    })

    return possibilities

}

const getPossibilities = (termo, position, discarded, includeds) => {
    let possibilities = []
    if (termo[position]) {
        possibilities.push(termo[position])
        return possibilities
    }
    let includedsNoAcceptable = []

    includeds.forEach(letter => {
        if (letter.positions.includes(position)) {
            includedsNoAcceptable.push(letter.value)
        }
    })

    alphabet.forEach(letter => {
        if (!discarded.includes(letter) && !includedsNoAcceptable.includes(letter)) {
            possibilities.push(letter)
        }
    })

    return possibilities
}

const findTermo = async () => {

    console.log("TERMO")

    let termo = []
    
    // termo[0] = getLetter("primeira")
    // termo[1] = getLetter("segunda")
    // termo[2] = getLetter("terceira")
    // termo[3] = getLetter("quarta")
    // termo[4] = getLetter("quinta")
    
    // const lettersIncludedString = readline.question(`Quais letras tem mas você não sabe a posição?`)
    // const lettersIncluded = lettersIncludedString.split(",")
    
    // const discardedLettersString = readline.question(`Quais letras você sabe que não tem?`)
    // const discardedLetters = discardedLettersString.split(",")

    // termo = [null, null, null, null, null]zxx
    // const lettersIncluded = []
    // const lettersIncluded = [{value: 'E', positions:[0]}, {value: 'A', positions:[1,4]}, {value: 'R', positions:[2]}]

    // const discardedLetters = []


    // 1
    // termo = [null, 'A', null, 'O', 'S']
    // const lettersIncluded = [ {value: 'A', positions:[4]}, {value: 'O', positions:[1, 4]}, {value: 'S', positions:[0, 3]}]
    // const discardedLetters = ['E', 'L', 'I', 'U', 'P', 'R', 'M', 'N', 'B', 'T', 'C']


    // 2
    termo = [null, 'O', null,'E', null]
    const lettersIncluded = []
    const discardedLetters = ['L', 'I', 'R', 'A', 'C', 'N', 'S']


    // 3
    // termo = [null, 'O', 'L', null, null]
    // const lettersIncluded = [{value: 'E', positions:[0]}, {value: 'O', positions:[0, 4]}]
    // const discardedLetters = ['I', 'A', 'U', 'S', 'R', 'N', 'C']

    //4
    // termo = [null, null, null, 'I', 'A']
    // const lettersIncluded = [{value: 'E', positions:[0, 1, 4]}, {value: 'A', positions:[1, 3]}]
    // const discardedLetters = ['O', 'L', 'U', 'S', 'R', 'N', 'C', 'G', 'P', 'M', 'D']


    const firstPossibilities = getPossibilities(termo, 0, discardedLetters, lettersIncluded)
    const secondPossibilities = getPossibilities(termo, 1, discardedLetters, lettersIncluded)
    const thirdPossibilities = getPossibilities(termo, 2, discardedLetters, lettersIncluded)
    const fourthPossibilities = getPossibilities(termo, 3, discardedLetters, lettersIncluded)
    const fifthPossibilities = getPossibilities(termo, 4, discardedLetters, lettersIncluded)
    const wordPossibilities = getWordPossibilities( lettersIncluded, firstPossibilities, secondPossibilities, thirdPossibilities, fourthPossibilities, fifthPossibilities)
    console.log(wordPossibilities.length)
    console.log("----------------------------------------")
    if (!getOnline) {
        const possibilities = await getDictionaryWords(wordPossibilities)
        console.log(`possibilidades: ${possibilities.length}`)
        if (getRanked) {
            const rankedPossibilities = rankingPossibilities(possibilities)
            console.log(rankedPossibilities)

            rankedPossibilities.sort((a,b)=> {
                return b.ranking - a.ranking
            })
        
            console.log(rankedPossibilities)
            return
        }
        console.log(possibilities)
        return
    }
    wordPossibilities.forEach(word=> {
        console.log(word)
    })
    console.log("----------------------------------------")
    const possibilities = await getDictionaryWordsOnline(wordPossibilities)
    console.log(`possibilidades: ${possibilities.length}`)
    console.log(possibilities)

}

findTermo()