var fs = require('fs'); 
const rawData = require('./medium');
let lines = rawData.split('\n');
const info = lines[0].split(' ');
const maxSlices  = parseInt(info[0]);
const pizzaTypes  = parseInt(info[1]);
const pizzaTypeSlices = (lines[1].split(' ')).map(x => parseInt(x));
const accuracyThreshold = (90 * maxSlices)/100;

// main program
const generatedSequences = [];
for(let i= 0; i< 25000; i++){
    generatedSequences.push(generateRandomSequince());
    console.log(`sequince ${i+1} generated`)
}
console.log("generated random Sequences...");
const candidateSequences = [];
for(seq of generatedSequences) {
    const sum = getSequniceSummation(seq);
    // console.log(`sum is: ${sum} maxslicesis: ${maxSlices} accuracy threshould: ${accuracyThreshold}`)
    if(sum <= maxSlices){
        candidateSequences.push({seq, sum});
    }
}
console.log(candidateSequences.length+" valid Sequences created...");
console.log("sorting candidates...");
if(candidateSequences.length > 0){
    candidateSequences.sort(function(a, b){return b.sum - a.sum});
}
console.log("completed sorting...")
console.log(candidateSequences[0].sum)
// program functions
function getSequniceSummation(seq) {
    let sum = 0;
    seq.map(x => {
        sum += pizzaTypeSlices[x];
    })
    return sum;
}
function generateRandomSequince(){
    const pickedIndexes = [];
    let count = 0;
    const sequince = [];
    let localSum = 0;
    while(pickedIndexes.length < pizzaTypeSlices.length && localSum < maxSlices){
        let randomIndex =  Math.floor(Math.random() * pizzaTypeSlices.length);
        while(pickedIndexes.indexOf(randomIndex) >= 0){
            randomIndex = Math.floor(Math.random() * pizzaTypeSlices.length);
        }
        pickedIndexes.push(randomIndex);
        localSum+= pizzaTypeSlices[randomIndex]
        if( localSum <= maxSlices ){
            sequince.push(randomIndex);
        }
    }
    return sequince;
}
fs.writeFile('result_medium.txt', `${candidateSequences[0].seq.length}\n${(candidateSequences[0].seq).join(' ')}`, (err)=>{
    if(err)
        console.log(err)
    console.log("result saved success")
})