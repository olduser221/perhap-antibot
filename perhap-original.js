let score = 0.0
let timestamps = [Date.now()]
let keys = []
let totalKeysPressed = 0
let totalMouseMovements = 0
let differences = []
let previousX, previousY
let missingKeys = null
let actuallyPasted = null
let finalScore

document.onkeydown = async function (e) {
    totalKeysPressed++
    timestamps.push(Date.now())
    keys.push(e.key)
    differences.push(timestamps[timestamps.length - 1] - timestamps[timestamps.length - 2] || 0)
    if (differences[differences.length - 1] === differences[differences.length - 2]) {
        score += 0.05
    }
    if (e.keyCode === 8) {
        score -= 0.05
    }
}

document.onmousemove = async function(e) {
    totalMouseMovements++
    if (!(previousX === undefined && previousY === undefined)) {
        if (Math.abs(e.clientX - previousX) > 200 || Math.abs(e.clientY - previousY) > 200) {
            score += 0.1
        }
    }
    previousX = e.clientX
    previousY = e.clientY
}

function submit() {
    let first_name = document.getElementById("fname").value
    let last_name = document.getElementById("lname").value
    for (var i = 0; i < first_name.length; i++) {
        if (!keys.includes(first_name[i])) {
            missingKeys = true
        }
    }
    for (var i = 0; i < last_name.length; i++) {
        if (!keys.includes(last_name[i])) {
            missingKeys = true
        }
    }
    if (missingKeys) {
        if (!keys.includes("Control") && !keys.includes("v")) {
            actuallyPasted = false
        }
    }

    if (isBot()) console.log("Bot Detected, Score:", finalScore)
    else console.log("No bot detected, Score:", finalScore)
}


function checkWebgl() {
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl');

    var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    var vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    var renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

    if(vendor == "Brian Paul" && renderer == "Mesa OffScreen") {
        return true
    } else {
        return false
    }
}

function isBot() {
    finalScore = score
    if (missingKeys === true && actuallyPasted === false) {
        finalScore += 0.2
    }
    if (totalKeysPressed < 5 || totalMouseMovements < 5) {
        finalScore += 1
    }
    if (finalScore > 0.5) {
        return true
    } else {
        return false
    }
}