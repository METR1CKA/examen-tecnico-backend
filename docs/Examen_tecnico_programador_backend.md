# Examen técnico programador backend

Dentro de este examen se tomarán los siguientes criterios para la evaluación: 

- Se podrá usar cualquier lenguaje de programación para el ejercicio,  pero tendrán mayor puntaje si se utiliza Node.js para el mismo. 

- Puede tomarse cualquier cantidad de tiempo para entregar el examen, podrán entregarlo incluso 1 semana después, pero el tiempo que tarden en realizar el mismo será considerado para el puntaje. 

- En caso de requerir apoyo para la resolución de algún problema, se puede solicitar apoyo, pero esto va a influir en su puntaje. 

- Se podrá solicitar explicación adicional, esto no afectará su puntaje. 

- Se considera de gran manera las prácticas usadas al programar y la limpieza del código. 

- La eficiencia del código es primordial, es un factor de los que más impacta en el puntaje del examen. 


El examen es el siguiente:

1. Se encontrarán con un archivo SQL dentro de la carpeta compartida. dicho archivo habrá que montarlo en un entorno local de mysql, en este se encuentra la tabla de “XNPV_productos_proveedores”, esta la deberán agregar a una base de datos propia. Se podrá editar la tabla de base de datos de ser necesario para resolver detalles o eficientar el proceso.

2. Se adjunta un la documentación de la siguiente API “https://apigloma.xentra.com.mx/” con el token : “API_c656762a1b91e60f2d581325b1fb63398e060d9b” utilicen la solicitudes lo más indispensable, ya que dicho servicio podrá bloquearlo si hacen mas de 10 peticiones y tendrán que esperar hasta el dia siguiente para continuar  (el bloqueo es independiente para cada servicio)

3. El ejercicio consta de solicitar el catálogo de la tabla de XNPV_productos_proveedores  y solicitar a su vez el API, comparar los registros de dicha API y actualizar la tabla de XNPV_productos_proveedores con la información que viene dentro del API.

  - El campo que se usara para comparar entre servicios es el campo de referencia dentro del API contra el campo referencia de la base de datos. 

  - Se agregaran los artículos  faltantes que vengan el el API dentro de la tabla XNPV_productos_proveedores

  - Se actualizará la información de XNPV_productos_proveedores si la información ha cambiado, nombre, precio, stock, etc.

  - Los artículos que se encuentren en la base de datos y no estén en el API se deberá mandar su inventario a 0, pero no se eliminarán.

4. Al finalizar la ejecución deberá retornar un json indicando:

  - Número de artículos nuevos

  - Número de artículos actualizados

  - Número de artículos que no se encuentran en el API, y en estos regresará un listado de los mismos

5. El examen terminará al ejecutar 2 veces el código, indicará que no hay cambios. 
