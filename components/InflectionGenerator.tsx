


export default function InflectionGenerator(fullName, type) {

    const firstName = fullName.split(' ')[0]
    const lastLetter = firstName.slice(-1)
    const semiLastLetter = firstName.slice(-2, -1)
    let result = "???"

    switch (lastLetter) {
        case "a": case "u":
            let work = firstName.slice(0, -1)
            result = work + "o"
            break;
        case "r":
            if (semiLastLetter != "a" && semiLastLetter != "e" && semiLastLetter != "i" && semiLastLetter != "o" && semiLastLetter !="u") {
                let repl = firstName.slice(0, -1)
                result = repl + "ře"
                break
            }
            else {
                result = firstName + "e"
                break
            }
        case "b": case "d": case "f": case "l": case "m": case "l": case "m": case "n": case "t": case "v":
            result = firstName + "e"
            break;
        case "c": case "j": case "s": case "x": case "z":
            result = firstName + "i"
            break;
        case "g": case "h": case "k": case "p":
            result = firstName + "u"
            break;
        default:
            result = firstName
    }

    return result

}