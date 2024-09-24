export const automata_asignacion = (simbolo) => {
    const estado_final = "C";
    const estados = ["A","B","C","M"];  // Estado muerto el M
    let estado_actual = "A";
    const estado_inicial = "A";
    const alfabeto_entrada = [":","="];
    const tamano_simbolo = simbolo.length;
    let asignacion_aceptada = false;

    for (let i = 0; i < tamano_simbolo; i++) {
        let sim = simbolo[i];

        switch(estado_actual) {
            case "A":
                if (sim === alfabeto_entrada[0]) {
                    estado_actual = "B";
                } else {
                    estado_actual = "M";
                }
                break;
            case "B":
                if (sim === alfabeto_entrada[1]) {
                    estado_actual = "C";
                } else {
                    estado_actual = "M";
                }
                break;
            case "C":
                estado_actual = "M";
                break;
            case "M":
                return false;
        }
    }

    return estado_actual === estado_final;
};