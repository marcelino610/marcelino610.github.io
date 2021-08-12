let display = '';
let displaySignType = [];
let parenthesisClosed = '';
let areParenthesisClosed = true;

function manejarNumeros(id) {
    if (document.getElementById('results-visor').style.display === 'none') {
        let numero = document.getElementById(id).innerText;
        display += numero;
        displaySignType.push('n');
        document.getElementById('entries-visor').innerText = display;
    } else {
        borrar();
        let numero = document.getElementById(id).innerText;
        display += numero;
        displaySignType.push('n');
        document.getElementById('entries-visor').innerText = display;
    };

};

function manejarSignos(id) {
    let lastSign = displaySignType[displaySignType.length - 1];
    if (lastSign === 'n' || lastSign === 'r-p') {
        let signo = document.getElementById(id).innerText;
        display += ' ' + signo + ' ';
        displaySignType.push('s');
        document.getElementById('entries-visor').innerText = display;
    } else {
        return false;
    };
};

function isPalindrome(str) {
    const reversed = str.split('').reverse().join();
    return str === reversed ? true : false;
};

function manejarParentesis(id) {
    let parenthesisType = id;
    switch (parenthesisType) {
        case 'left-parenthesis':
            manejarSignos('mult');
            display += document.getElementById(id).innerText;
            document.getElementById('entries-visor').innerText = display;
            displaySignType.push('l-p');
            parenthesisClosed += 'az';
            areParenthesisClosed = false;
            break;
        case 'right-parenthesis':
            if (isPalindrome(parenthesisClosed)) {
                return false;
            } else {
                display += document.getElementById(id).innerText;
                document.getElementById('entries-visor').innerText = display;
                displaySignType.push('r-p');
                parenthesisClosed += 'za';
                areParenthesisClosed = true;
            };
            break;

        default:
            break;
    };
};

function resultado() {
    if (areParenthesisClosed) {
        let resultadoAMostrar = eval(display.replace(/\÷/g, '/').replace(/\×/g, '*').replace(/\–/g, '-'));
        let a = document.getElementById('results-visor');
        if (a.style.display === 'none') {
            a.style.display = 'block';
        };
        if (resultadoAMostrar) {
            document.getElementById('results-visor').innerHTML = resultadoAMostrar;
        } else {
            return false
        };
    } else {
        alert('Asegúrese de que los paréntesis están cerrados correctamente');
    };
};

function borrar() {
    display = '';
    displaySignType = [];
    document.getElementById('entries-visor').innerText = display;
    document.getElementById('results-visor').innerHTML = '';
    document.getElementById('results-visor').style.display = 'none';
};

function deshacer() {
    switch (displaySignType[displaySignType.length - 1]) {
        case 's':
            display = display.slice(0, -3);
            displaySignType.pop();
            document.getElementById('entries-visor').innerText = display;
            break;
        case 'n':
            display = display.slice(0, -1);
            displaySignType.pop();
            document.getElementById('entries-visor').innerText = display;
            break;
        case 'l-p':
            display = display.slice(0, -1);
            displaySignType.pop();
            document.getElementById('entries-visor').innerText = display;
            break;
        case 'r-p':
            display = display.slice(0, -1);
            displaySignType.pop();
            document.getElementById('entries-visor').innerText = display;
            areParenthesisClosed = false;
            break;
        default:
            break;
    }
}