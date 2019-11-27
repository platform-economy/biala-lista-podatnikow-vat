[![Netlify Status](https://api.netlify.com/api/v1/badges/9812be22-733b-4ddb-b0fb-f6b341a0412c/deploy-status)](https://app.netlify.com/sites/cocky-dijkstra-b71528/deploys)

# biala-lista-podatnikow-vat

![Nagranie](https://github.com/thirdwave-network/biala-lista-podatnikow-vat/blob/master/rec.gif)

https://www.podatki.gov.pl/wykaz-podatnikow-vat-wyszukiwarka/

https://www.npmjs.com/package/react-dropzone

https://github.com/learnwithparam/logrocket-drag-and-drop

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) (https://create-react-app.dev/)

# Installation

1. `yarn install` - install dependecies

2. `yarn build` - optimized production build

# Wymagany format pliku *.txt

```
23423442
1|0|ABCN|Tauron|01-682 Warszawa|87105000861000009030410063||1||1|
1|0|ABCN|Tauron|01-682 Koszalin|60105012301000000202113056||1||1|
1|0|ABCN|Fundacja XYZ|01-682 Gdańsk|13124010371111001017602908||1||1|
1|0|ABCN|Firma QWERTY|01-682 Wrocław|19249000050000460064651942||1||1|
1|0|ABCN|Firma XYZ|01-682 Szczecin|28114020170000420203281268||1||1|
1|0|ABCN|Tauron|01-682 Szczecin|60105012301000000202113056||1||1|
1|0|ABCN|Firma ABC|01-682 Wrocław|87105000861000009030410063||1||1|
1|0|ABCN|Tauron|01-682 Warszawa|87105000861000009030410063||1||1|
1|0|ABCN|Tauron|01-682 Koszalin|60105012301000000202113056||1||1|
1|0|ABCN|Fundacja XYZ|01-682 Gdańsk|13124010371111001017602908||1||1|
1|0|ABCN|Firma QWERTY|01-682 Wrocław|19249000050000460064651942||1||1|
1|0|ABCN|Firma XYZ|01-682 Szczecin|28114020170000420203281268||1||1|
1|0|ABCN|Tauron|01-682 Szczecin|60105012301000000202113056||1||1|
1|0|ABCN|Firma ABC|01-682 Wrocław|87105000861000009030410063||1||1|
```
[Przykładowy plik](https://github.com/thirdwave-network/biala-lista-podatnikow-vat/blob/master/przykladowy_plik.txt)

### Uwaga

Wymagana jest pierwsza linia w pliku w postaci dowolnego ciągu znaków - jednak nie jest brana pod uwagę pod względem wyszukiwania numeru bankowego (wymóg podyktowany formatem pliku generowanym przez system bankowy).
