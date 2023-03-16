/***
 * Rotacion: Construye las matrices que ayuda a rotar el objeto y retorna la matriz teniendo en cuenta su eje.
 * ENTRADAS: ang= Angulo de rotación.
 *           eje= Eje en el cual se quiere aplicar la rotación.
 * SALIDAS: Matriz de rotación con respecto a cierto eje.
*/

function Rotacion (eje,ang){
    var matrizR= new THREE.Matrix4();
    let rad = ang * Math.PI / 180;
    [cs, sn] = [Math.cos(rad), Math.sin(rad)];
    switch(eje){
case 'x':
    matrizR.set(
        1, 0, 0, 0,
        0, cs, -sn, 0,
        0, sn, cs, 0,
        0, 0, 0, 1);
        return matrizR;
    break;

case 'y':
    matrizR.set(
        cs, 0, sn, 0,
        0, 1, 0, 0,
        -sn, 0, cs, 0,
        0, 0, 0, 1);
        return matrizR;
    break;

case 'z':
    matrizR.set(
        cs, -sn, 0, 0,
        sn, cs, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1);
        return matrizR;
    break;
    }
}

/**
 * RotacionReal: Construye las matrices que ayuda a rotar el objeto y retorna la matriz teniendo en cuenta su eje.
 * ENTRADAS: fig = Objeto tipo THREE.Line que representa el objeto gráfico
 *           posini= Posición inicial del fig (array de enteros)
 *           ang= Angulo de rotación.
 *           eje= Eje en el cual se quiere aplicar la rotación.
 * SALIDAS: 
 */
function RotacionReal (fig,posini,eje,ang){
    tr = [-posini[0],-posini[1], -posini[2]]; 
    fig.applyMatrix(Traslacion(tr));//Aplicar translacion al objeto para llevar a la posicion inicial.
    switch(eje){

        case 'x':
             fig.applyMatrix(Rotacion('x',ang));//Aplicar y retornar la matriz al objeto en el eje X.
                break;

        case 'y':
             fig.applyMatrix(Rotacion('y', ang));//Aplicar y retornar la matriz al objeto en el eje Y.
        break;

        case 'z':
             fig.applyMatrix(Rotacion('z', ang)); //Aplicar y retornar la matriz al objeto en el eje Z.
        break;
    }
    fig.applyMatrix(Traslacion(posini));//Aplicar translacion al objeto para llevar a la posicion inicial.

}

/**
 * Translación: Construye la matriz de translación para el vector vt y la retorna 
 * ENTRADAS: vt= Vector de translación (Arreglo de enteros)
 * SALIDAS: matrizT= Matriz de translación para el vector vt
 */
function Traslacion(vt){
    var matrizT = new THREE.Matrix4();
    matrizT.set(1, 0, 0, vt[0],
                0, 1, 0, vt[1],
                0, 0, 1, vt[2],
                0, 0, 0, 1);
    return matrizT;
    }
/**
 * Escalado: Construye la matriz de translación THREEJS para el vector vs y la retorna
 * ENTRADAS: vs = Vector de escalado (arreglo de enteros)
 * SALIDA: matriz = Matriz de escalado para el vector vs
 */

function Escalado (vs) {
    var matrizS = new THREE.Matrix4();
    matrizS.set(vs[0], 0, 0, 0,
                0, vs[1], 0, 0,
                0, 0, vs[2], 0,
                0, 0, 0, 1);

    return matrizS;
    }
/**
 * EscaladoReal: Aplica el vector de escalado vs al objeto fig
 * ENTRADAS: fig = Objeto tipo THREE.Line que representa el objeto gráfico
 *           posini= Posición inicial del fig (array de enteros)
 *           vs = Vector de escalado (arreglo de enteros)
 * SALIDA: 
 */


function EscaladoReal(fig, posini ,vs){
    tr = [-posini[0],-posini[1], -posini[2]];    // Vector para llevar al origen
    fig.applyMatrix(Traslacion(tr));   //Se aplica la matriz de translación a fig
    fig.applyMatrix(Escalado(vs));     //Se aplica la matriz de escalado a fig 
    fig.applyMatrix(Traslacion(posini)); //Se aplica la matriz de translación con posición inicial a fig
}