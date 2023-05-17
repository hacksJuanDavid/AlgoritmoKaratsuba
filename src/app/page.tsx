"use client";

import Image from "next/image";
import { useState } from "react";

// Interface para el estado de las operaciones
interface Operaciones {
  aHigh: number;
  aLow: number;
  bHigh: number;
  bLow: number;
  z0: number;
  z1: number;
  z2: number;
  result: number;
}

// Componente principal de la pagina
export default function AlgoritmoKaratsuba() {
  // Un estado para guardar las operaciones realizadas en el algoritmo de karatsuba
  const [operaciones, setOperaciones] = useState<Operaciones[]>([]);

  // Un estado para guardar el resultado
  const [resultado, setResultado] = useState(0);

  //* Funcion calcular karatsuba recursiva
  //**Complejidad O(n^log3)** 
  //**Complejidad O(n^1.585)** 
  //**Costo operaciones elementales 3n^log3 + 7** 
  //**Operaciones elementales: 56**
  //**Funcion t(n) = 3T(n/2) + O(n) **
  function calcularKaratsuba(a: number, b: number): any {
    // Convertir los numeros a string
    let aString = a.toString(); //! Operaciones elementales declaracion, asignacion y inovacion = 3
    let bString = b.toString(); //! Operaciones elementales declaracion, asignacion y inovacion = 3
    // Obtener el tamaño de los numeros
    let aLength = aString.length; //! Operaciones elementales declaracion, asignacion y inovacion = 3
    let bLength = bString.length; //! Operaciones elementales declaracion, asignacion y inovacion = 3
    // Obtener el tamaño maximo
    let max = Math.max(aLength, bLength); //! Operaciones elementales declaracion, asignacion y inovacion = 3
    // Si el tamaño maximo es menor a 10
    if (max < 10) { //! Operaciones elementales  asignacion y artimetica = 2
      // Multiplicar los numeros
      return a * b; //! Operaciones elementales  asignacion y artimetica = 2
    }
    // Redondear el tamaño maximo
    max = Math.round(max / 2); //! Operaciones elementales declaracion, asignacion y inovacion = 3
    // Obtener el tamaño de los numeros 
    let aHigh = Math.floor(a / Math.pow(10, max)); //! Operaciones elementales declaracion, asignacion, aritmetica y inovacion = 4
    let aLow = a % Math.pow(10, max); //! Operaciones elementales declaracion, asignacion, aritmetica y inovacion = 4
    let bHigh = Math.floor(b / Math.pow(10, max)); //! Operaciones elementales declaracion, asignacion, aritmetica y inovacion = 4
    let bLow = b % Math.pow(10, max); //! Operaciones elementales declaracion, asignacion, aritmetica y inovacion = 4
    // Obtener el tamaño de los numeros
    let z0 = calcularKaratsuba(aLow, bLow); //! Operaciones elementales declaracion, asignacion y inovacion = 3
    let z1 = calcularKaratsuba(aLow + aHigh, bLow + bHigh); //! Operaciones elementales declaracion, asignacion, aritmetica y inovacion = 4
    let z2 = calcularKaratsuba(aHigh, bHigh); //! Operaciones elementales declaracion, asignacion y inovacion = 3

    // El resultado
    const result =
      z2 * Math.pow(10, max * 2) + (z1 - z2 - z0) * Math.pow(10, max) + z0; //! Operaciones elementales declaracion, asignacion, aritmetica y inovacion = 7

    // Nuevas operaciones
    const nuevasOperaciones = [ //! Operaciones elementales declaracion, asignacion y inovacion = 3
      ...operaciones,
      {
        aHigh,
        aLow,
        bHigh,
        bLow,
        z0,
        z1,
        z2,
        result,
      },
    ];

    // Guardar las nuevas operaciones en el estado y se actualiza el estado
    setOperaciones(nuevasOperaciones); //! Operaciones elementales asignacion y inovacion = 2

    // Retornar el resultado
    return result; //! Operaciones elementales asignacion = 1
  }

  // Funcion para calcular el algoritmo de karatsuba
  function calcular(): void {
    // Obtener los valores de los inputs
    const input1 = document.getElementById("input1") as HTMLInputElement;
    const input2 = document.getElementById("input2") as HTMLInputElement;

    // Validar que los inputs no esten vacios
    if (input1.value === "" || input2.value === "") {
      alert("Ingresa los números a multiplicar");
      return;
    }

    // Validar que los inputs sean numeros
    if (isNaN(Number(input1.value)) || isNaN(Number(input2.value))) {
      alert("Ingresa solo números");
      return;
    }

    // Ingresa los numeros a multiplicar
    const numero1 = Number(input1.value);
    const numero2 = Number(input2.value);

    // Calcular el algoritmo de karatsuba
    const resultado = calcularKaratsuba(numero1, numero2);

    // Guardar el resultado en el estado
    setResultado(resultado);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/*Titulo y descripcion del algoritmo de karatsuba*/}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center underline uppercase">
          Algoritmo de Karatsuba
        </h1>
        <p className="text-center">
          Algoritmo de multiplicación de números grandes.
        </p>
      </div>

      {/*Imagen del algoritmo de karatsuba*/}
      <div className="flex flex-col items-center justify-center m-4 p-2">
        <Image
          src="/images/karatsuba.png"
          alt="Algoritmo de Karatsuba"
          width={500}
          height={500}
        />
      </div>

      {/*Descripcion del algoritmo de karatsuba*/}
      <div className="flex flex-col items-center justify-center m-8 p-4">
        <p className="text-justify">
          El algoritmo de Karatsuba es un algoritmo de multiplicación rápido.
          Fue inventado por Anatoly Karatsuba en 1960 y publicado en 1962. El
          algoritmo de Karatsuba reduce la multiplicación de dos números de n
          dígitos a como máximo n^1.58 multiplicaciones de números de la mitad
          de dígitos. Es un ejemplo de un algoritmo de división y conquista, y
          generalmente es más rápido que el algoritmo de multiplicación escolar.
          El algoritmo de Karatsuba fue el primero de una serie de algoritmos de
          multiplicación rápidos, generalmente llamados algoritmos de
          multiplicación de Karatsuba y de división y conquista.
        </p>
      </div>

      {/*Complejidad algoritmica de karatsuba*/}
      <div className="flex flex-col items-center justify-center m-2 p-2">
        <h2 className="text-2xl font-bold text-center underline uppercase">
          Complejidad algoritmica de karatsuba
        </h2>
        <p className="text-center">
          La complejidad algoritmica del algoritmo de Karatsuba es la siguiente:
        </p>
        <div className="m-2 p-2">
          <p className="text-center font-bold">T(n) = 3T(n/2) + O(n)</p>
          <p className="text-center font-bold">T(n) = O(n^1.58)</p>
        </div>
      </div>

      {/*Formula del algoritmo de karatsuba*/}
      <div className="flex flex-col items-center justify-center m-2 p-2">
        <h2 className="text-2xl font-bold text-center underline uppercase">
          Formula del algoritmo de karatsuba
        </h2>
        <p className="text-center">
          La fórmula del algoritmo de Karatsuba es la siguiente:
        </p>
        <div className="m-2 p-2">
          <p className="text-center font-bold">x = 10^n/2 * a + b</p>
          <p className="text-center font-bold">y = 10^n/2 * c + d</p>
          <p className="text-center font-bold">
            x * y = 10^n * ac + 10^n/2 * (ad + bc) + bd
          </p>
        </div>
      </div>

      {/*Ejemplo del algoritmo de karatsuba */}
      <div className="flex flex-col items-center justify-center m-2 p-2">
        <h2 className="text-2xl font-bold text-center underline uppercase">
          Ejemplo del algoritmo de karatsuba
        </h2>
        <p className="text-center">
          El algoritmo de Karatsuba se puede ver en el siguiente ejemplo:
        </p>
        <div className="m-2 p-2">
          <p className="text-center font-bold">x = 5678</p>
          <p className="text-center font-bold">y = 1234</p>
          <p className="text-center font-bold">n = 4</p>
          <p className="text-center font-bold">a = 56</p>
          <p className="text-center font-bold">b = 78</p>
          <p className="text-center font-bold">c = 12</p>
          <p className="text-center font-bold">d = 34</p>
          <p className="text-center font-bold">z0 = 56 * 12 = 672</p>
          <p className="text-center font-bold">z1 = 78 * 34 = 2652</p>
          <p className="text-center font-bold">
            z2 = (56 + 78) * (12 + 34) = 134 * 46 = 6164
          </p>
          <p className="text-center font-bold">
            z2 - z1 - z0 = 6164 - 2652 - 672 = 2840
          </p>
          <p className="text-center font-bold">
            x * y = 672 * 10^4 + 2840 * 10^2 + 2652 = 7006652
          </p>
        </div>
      </div>

      {/* Segundo ejemplo algoritmo karatsuba */}
      <div className="flex flex-col items-center justify-center m-2 p-2">
        <h2 className="text-2xl font-bold text-center underline uppercase">
          Segundo ejemplo del algoritmo de karatsuba
        </h2>
        <p className="text-center">
          El algoritmo de Karatsuba se puede ver en el siguiente ejemplo:
        </p>
        <div className="m-2 p-2">
          <p className="text-center font-bold">x = 5678233232</p>
          <p className="text-center font-bold">y = 1234</p>
          <p className="text-center font-bold">n = 10</p>
          <p className="text-center font-bold">a = 567823</p>
          <p className="text-center font-bold">b = 33232</p>
          <p className="text-center font-bold">c = 12</p>
          <p className="text-center font-bold">d = 34</p>
          <p className="text-center font-bold">z0 = 567823 * 12 = 6813876</p>
          <p className="text-center font-bold">z1 = 33232 * 34 = 1129888</p>
          <p className="text-center font-bold">
            z2 = (567823 + 33232) * (12 + 34) = 601055 * 46 = 27648530
          </p>
          <p className="text-center font-bold">
            z2 - z1 - z0 = 27648530 - 1129888 - 6813876 = 19704766
          </p>
          <p className="text-center font-bold">
            x * y = 6813876 * 10^10 + 19704766 * 10^5 + 1129888 = 7006939808288
          </p>
        </div>
      </div>

      {/*Calcular el algoritmo de karatsuba*/}
      <div className="flex flex-col items-center justify-center bg-lime-950 rounded">
        <h2 className="text-2xl font-bold text-center underline uppercase">
          Calcular el algoritmo de karatsuba
        </h2>
        <p className="text-center">Ingresa los números a multiplicar</p>
        <div className="flex flex-col items-center justify-center">
          {/*Inpus uno al lado del otro y en el medio el simbolo de "*" " */}
          <div className="flex flex-row items-center justify-center">
            <input
              type="number"
              className="border border-gray-300 bg-black rounded-md p-2 m-2"
              id="input1"
              placeholder="Primer número :5678233232"
            />
            <p className="text-2xl font-bold text-center">*</p>
            <input
              type="number"
              className="border border-gray-300 bg-black rounded-md p-2 m-2"
              id="input2"
              placeholder="Segundo número :1234"
            />
          </div>

          {/*Boton para calcular*/}
          <button
            type="button"
            className="border border-gray-300 rounded-md p-2 m-2 cursor-progress"
            onClick={calcular}
          >
            Calcular
          </button>

          {/*Resultado mostrar resultados*/}
          <div className="flex flex-col items-center justify-center bg-black rounded m-2 p-2">
            <p className="text-cente uppercase font-bold text-2xl">Resultado</p>
            <p className="text-center text-xl">{resultado}</p>
            {/* Mostrar las operaciones en una tabla*/}
            <div className="flex flex-col items-center justify-center bg-black rounded m-2 p-2">
              <p className="text-center">Operaciones</p>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">aHigh</th>
                    <th className="border border-gray-300 p-2">aLow</th>
                    <th className="border border-gray-300 p-2">bHigh</th>
                    <th className="border border-gray-300 p-2">bLow</th>
                    <th className="border border-gray-300 p-2">z0</th>
                    <th className="border border-gray-300 p-2">z1</th>
                    <th className="border border-gray-300 p-2">z2</th>
                  </tr>
                </thead>
                <tbody>
                  {operaciones.map((operacion, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        {operacion.aHigh}
                      </td>

                      <td className="border border-gray-300 p-2">
                        {operacion.aLow}
                      </td>

                      <td className="border border-gray-300 p-2">
                        {operacion.bHigh}
                      </td>

                      <td className="border border-gray-300 p-2">
                        {operacion.bLow}
                      </td>

                      <td className="border border-gray-300 p-2">
                        {operacion.z0}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {operacion.z1}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {operacion.z2}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
