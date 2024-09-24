import { numeros } from './utilidades.js';

const automata_reales = (real)=>{
    const numero = numeros();
    
    ////////////////////////////////////////
    
    let estado_actual = "A";
    const estados = ["A","B","M","D","E","F"]  //Estado muerto M
    const estado_final = "F";
    const estado_inicial = "A" 
    const alfabeto_entrada = [numero,".","-"];
    const tamano_real = real.length;
    let real_aceptado = false;
    
    for (let i = 0; i <= tamano_real; i++) {
        let num = real[i];
      
        
        //ESTADO A
        if (estado_actual == estado_inicial){
            if(alfabeto_entrada[0].includes(num)){
                estado_actual = estados[3]; //Estado D
            }else if(alfabeto_entrada[2] == num){
                estado_actual = estados[1];  //estado B
            }
            else{
                estado_actual = estados[2]; //estado muerto
            }
        }
        //ESTADO B
        else if (estado_actual == estados[1]){
            if(alfabeto_entrada[0].includes(num)){
                estado_actual = estados[3]; //estado D

            }else{
                estado_actual = estados[2]; //Estado muerto
            }
        }
        //ESTADO D
        else if (estado_actual == estados[3]){
            if(alfabeto_entrada[0].includes(num)){
                estado_actual = estados[3]; //estado D

            }else if(alfabeto_entrada[1] == num){
                estado_actual = estados[4]; //Estado E

            }else{
                estado_actual = estados[2];  //Estado muerto
            }
        }
        //ESTADO E
       else if (estado_actual == estados[4]){
            if(alfabeto_entrada[0].includes(num)){
                estado_actual = estados[5];  //Estado F

            }else{
                estado_actual = estados[2];  //Estado muerto
            }
        }
        //ESTADO F  --> estado final
        else if (estado_actual == estado_final){
            real_aceptado = true;
            if(alfabeto_entrada[0].includes(num)){
                estado_actual = estados[5];  //Estado F
                real_aceptado = true

            }else{
                estado_actual = estados[2];  //Estado muerto

            }
        }
        
        //ESTADO M --> estado muerto
        
        else if (estado_actual == estados[2]){
            real_aceptado = false;
            break;
        }

    }
    return real_aceptado;
}


export {automata_reales};