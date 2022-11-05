const textIn = document.getElementById("textIn");
const textOut = document.getElementById("textOut");
const runBtn = document.getElementById("runBtn");
const clearBtn = document.getElementById("clearBtn");

runBtn.addEventListener("click", () => {
  if (textIn.value.length === 0) {
    window.alert("Please add your schedule in the text area.");
    return
  }
  try {
    let out = resolverCaso(textIn.value);
    if (out.length === 0 || out.length === 1) throw new Error("Invalid text");
    textOut.value = out;
  } catch (err) {
    window.alert("Please put a valid text in the text area.")
    return
  }
  return
});


clearBtn.addEventListener("click", () => {
  textIn.value = "";
  textOut.value = "";
  return
});


const resolverCaso = (caso) => {
  let ans = "";
  caso.split('--').forEach((dia, index) => {
    let max = 0;
    let min = 3000;
    let agenda = dia.split(',')
          .map((appointment) => {
            const apt = appointment.split(' ')
            const inicio = apt[0].split(':')
            const fin = apt[1].split(':')
            const minInicio = Number(inicio[0])*60 + Number(inicio[1])
            const minFin = Number(fin[0])*60 + Number(fin[1])
            if (minInicio > max) max = minInicio;
            if (minInicio < min) min = minInicio;
            return [...apt, minInicio, minFin]
          })
    agenda = countSort(agenda, min, max)
    let mayor = 0;
    let conversion = "";
    let fila = "";
    for(let i = 0; i <= agenda.length-2; i++){
         let valor = agenda[i+1][3] - agenda[i][4]
         if (mayor < valor){
            mayor = valor
            conversion = Math.trunc(valor/60)
            fila = `Dia #${index+1}: La siesta es a las ${agenda[i][1]} y durara ${conversion} horas y ${(valor - (conversion*60))} minutos`
          }
      }
    ans += fila + "\n";
  });
  return ans;
}

const countSort = (arr, min, max) => {
  const range = max - min + 1;
  let count = Array.from({length: range}, (_, i) => 0);
  let output = Array.from({length: arr.length}, (_, i) => 0);
  for (let i = 0; i < arr.length; i++) {
      count[arr[i][3] - min]++;
  }

  for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
      output[count[arr[i][3] - min] - 1] = arr[i];
      count[arr[i][3] - min]--;
  }

  return output;
}

// resolverCaso("16:59 18:23 Otras,45:35 46:34 Otras,28:22 28:54 Reunión,41:52 42:10 Almuerzo,21:53 22:50 Reunión,33:42 34:34 Reunión,08:30 09:24 Otras--44:56 45:23 Reunión,08:47 10:04 Reunión,24:45 24:57 Reunión,35:03 35:34 PrepaClase,28:34 29:31 Reunión,20:48 21:06 Almuerzo")