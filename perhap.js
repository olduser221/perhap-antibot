let data = {
    score: 0.0,
    timestamps: [Date.now()],
    keys: [],
    totalKeysPressed: 0,
    totalMouseMovements: 0,
    differences: [],
    previousX: null,
    previousY: null,
    missingKeys: null,
    actuallyPasted: null,
    finalScore: null
}

document.onkeydown = async function (e) {
    data.totalKeysPressed++
    data.timestamps.push(Date.now())
    data.keys.push(e.key)
    data.differences.push(data.timestamps[data.timestamps.length - 1] - data.timestamps[data.timestamps.length - 2] || 0)
    if (data.differences[data.differences.length - 1] === data.differences[data.differences.length - 2]) {
        data.score += 0.05
    }
    if (e.keyCode === 8) {
        data.score -= 0.05
    }
}

document.onmousemove = async function(e) {
    data.totalMouseMovements++
    if (!(data.previousX === undefined && data.previousY === undefined)) {
        if (Math.abs(e.clientX - data.previousX) > 200 || Math.abs(e.clientY - data.previousY) > 200) {
            data.score += 0.1
        }
    }
    data.previousX = e.clientX
    data.previousY = e.clientY
}

function submit() {
    let first_name = document.getElementById("fname").value
    let last_name = document.getElementById("lname").value
    for (var i = 0; i < first_name.length; i++) {
        if (!data.keys.includes(first_name[i])) {
            data.missingKeys = true
        }
    }
    for (var i = 0; i < last_name.length; i++) {
        if (!data.keys.includes(last_name[i])) {
            data.missingKeys = true
        }
    }
    if (data.missingKeys) {
        if (!data.keys.includes("Control") && !data.keys.includes("v")) {
            data.actuallyPasted = false
        }
    }

    if (isBot()) console.log("Bot Detected, Score:", data.finalScore)
    else console.log("No bot detected, Score:", data.finalScore)
}

function isBot() {
    data.finalScore = data.score
    if (data.missingKeys === true && data.actuallyPasted === false) {
        data.finalScore += 0.2
    }
    if (data.totalKeysPressed < 5 || data.totalMouseMovements < 5) {
        data.finalScore += 1
    }
    if (data.finalScore > 0.5) {
        return true
    } else {
        return false
    }
}