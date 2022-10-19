const resolverCaso = (caso) => {
  return caso.split('--').map((dia, index) => {
          const agenda = definirAgenda(dia)
          const [inicioSiesta, duracionSiesta] = encontrarMejorSiesta(agenda)
          return `Dia #${index+1}: La siesta es a las ${inicioSiesta} y durara ${duracionSiesta}`
        })
}

const definirAgenda = (dia) => {
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
    console.log("agenda", agenda)
    return agenda
}

const encontrarMejorSiesta = (agenda) => {
  const tiempoLibre = Array.from({length: agenda.length - 1}, (_, index) => {
    return [agenda[index][1], agenda[index+1][3] - agenda[index][4]]
  }).sort((a, b) => b[1] - a[1]);
  console.log("tiempoLibre", tiempoLibre)
  const duracion = `${Math.floor(tiempoLibre[0][1]/60) === 0? "" : Math.floor(tiempoLibre[0][1]/60) + " horas y "} ${tiempoLibre[0][1]%60 < 10? '0'+tiempoLibre[0][1]%60 : tiempoLibre[0][1]%60} minutos`
  return [tiempoLibre[0][0], duracion]
}

console.log(resolverCaso("16:59 18:23 Otras,45:35 46:34 Otras,28:22 28:54 Reunión,41:52 42:10 Almuerzo,21:53 22:50 Reunión,33:42 34:34 Reunión,08:30 09:24 Otras--44:56 45:23 Reunión,08:47 10:04 Reunión,24:45 24:57 Reunión,35:03 35:34 PrepaClase,28:34 29:31 Reunión,20:48 21:06 Almuerzo"))