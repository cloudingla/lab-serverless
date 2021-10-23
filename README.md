# Instrucciones de Ejecución
A continuación les comparto la arquitectura a implementar:
![Diagrama Arquitectura](https://github.com/cloudingla/lab-serverless/blob/master/images/lab_serverless.png)


# Instrucciones de Ejecución

## Backend
Abrir una terminal y dirigirse al directorio Backend
* Run npm install
* Run cdk bootstrap
* Run cdk deploy

Después de esto usted obtendrá un API Endpoint, UserPoolId, y UserPoolClientId en la terminal, guarde estos nombres para más adelante. 

## Frontend
Abrir una terminal y dirigirse al directorio Frontend
* Run npm install
* Abrir el archivo .env y pegar los valors obtenidos en Backend (NOTA: Remoueva los slash al final de todos los recursos que lo tengan)
* Run npm start

![Diagrama Arquitectura](https://github.com/cloudingla/lab-serverless/blob/master/images/frontend.png)

## Estructura

* Los servicios creados en AWS están en el siguiente directorio:
└── {backend}
    └── lib/
    └──── api_gateway_template_javascript-stack.js

* El código de las funciones lambda esta en el siguiente directorio:
└── {backend}
    └── functions/
    └──── createItem.js
    └──── getItems.js

