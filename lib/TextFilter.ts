

export default function filterText(text) {

    const notAllowedWords = [
        'kurv',
        'srač',
        'sráč',
        'čůrák',
        'píča',
        'curak',
        'zmrd',
        'bdsm',
        'porno',
        'porn',
        'redtube',
        'xhamster',
        'milf',
        'prc',
        'šoust',
        'debil',
        'čubk',
        'prdel',
        'kretén',
        'hovn',
        'kund',
        'děvk',
        'šuk',
        'onlyfans'
    ]

    let error = false

    notAllowedWords.map((word , i) => {
        if(text.includes(word)) {
            error = true
        }
    })
    

    return error
}