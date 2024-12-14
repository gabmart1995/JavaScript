const $globalCode = document.querySelector('#global');
const $sendButton = document.querySelector('.send-button');
const $bars = document.querySelectorAll('.bar');
const $percentages = document.querySelectorAll('.percentage');

const COLORS = ['green', 'yellow', 'orange', 'red'];

async function runTestCases() {
    const $testCases = document.querySelectorAll('.test-case');
    const globalCodeData = $globalCode.value;

    // reestablecemos la altura de la barra
    $bars.forEach(bar => bar.setAttribute('height', 0));
    $percentages.forEach(percentage => percentage.textContent = '');

    const promises = Array
        .from($testCases)
        .map(async testCase => {
            const $code = testCase.querySelector('.code');
            const $ops = testCase.querySelector('.ops');

            const codeValue = $code.value;
            $ops.textContent = 'Loading ...';

            const result = await runTest({
                code: codeValue, 
                data: globalCodeData
            });

            $ops.textContent = `${result.toLocaleString()} ops/s`;

            return result;
        });
    
    const results = await Promise.all(promises);
    const maxOps = Math.max(...results);
    const sortedResults = results
        .map((result, index) => ({result, index}))
        .sort((a, b) => b.result - a.result);

    results.forEach((result, index) => {
        const heightLine = 300;
        const $bar = $bars[index];
        const $percentage = $percentages[index];

        const indexColor = sortedResults.findIndex(x => x.index === index);
        const color = COLORS[indexColor];

        const height = result / maxOps * heightLine;
        $bar.setAttribute('height', height);
        $bar.setAttribute('fill', color);
        
        const porcentageValue = Math.round(result / maxOps * 100);
        $percentage.textContent = `${porcentageValue}%`;
    });
}

/**
 * ejecuta las pruebas
 * @param {{code: string, data: string}} test
 * @returns {Promise<number>}
 */
async function runTest({code, data}) {
    const duration = 1000; // 1s
    
    // creamos el worker
    const worker = new Worker('worker.js');
    worker.postMessage({code, data, duration});

    const { promise, resolve } = Promise.withResolvers();

    worker.onmessage = event => { resolve(event.data) };

    return promise;
}

// run test cases on init
runTestCases();

if ($sendButton) {
    $sendButton.addEventListener('click', () => {
        runTestCases();
    });
}