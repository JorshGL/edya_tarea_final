
const resolverCaso = (caso) => {
  caso.split('--').map((dia, index) => {
  let agenda = dia.split(',')
          .map((appointment) => {
            const apt = appointment.split(' ')
            const inicio = apt[0].split(':')
            const fin = apt[1].split(':')
            const minInicio = Number(inicio[0])*60 + Number(inicio[1])
            const minFin = Number(fin[0])*60 + Number(fin[1]) 
            return [...apt, minInicio, minFin]
          })
          .sort((a, b) => a[3] - b[3])
    let mayor = 0;
    let conversion = "";
    let fila = "";
    for(i = 0; i <= agenda.length-2; i++){
        valor = agenda[i+1][3] - agenda[i][4]
        if (mayor < valor){
          mayor = valor
          conversion = Math.trunc(valor/60)
          fila = `Dia #${index+1}: La siesta es a las ${agenda[i][1]} y durara ${conversion} horas y ${(valor - (conversion*60))} minutos`
        }
    }
    console.log("agenda", agenda)
    console.log("El", fila)
    return agenda
  })
}

resolverCaso("16:59 18:23 Otras,45:35 46:34 Otras,28:22 28:54 Reunión,41:52 42:10 Almuerzo,21:53 22:50 Reunión,33:42 34:34 Reunión,08:30 09:24 Otras--44:56 45:23 Reunión,08:47 19:04 Reunión,24:45 24:57 Reunión,35:03 35:34 PrepaClase,28:34 29:31 Reunión,20:48 21:06 Almuerzo")