
const carlosSort = (arr) => {
    const max = Math.max(...arr);
    const min = Math.min(...arr);
  
    const range = max - min + 1;
    let count = Array.from({length: range}, (_, i) => 0);
    let output = Array.from({length: arr.length}, (_, i) => 0);
    for (i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }

    for (let i = 0; i < output.length; i++) {
        
    }
}  