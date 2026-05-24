## Zmiana losowania price pointu na równomierne

W pliku `src/lib/wtpPrice.ts` zamień ważone losowanie (50/25/25) na równomierne (1/3 każdy).

### Zmiana (linie 10-12)

Z:
```ts
// Weighted: 499 = 50%, 399 = 25%, 299 = 25%
const r = Math.random();
const picked: PricePoint = r < 0.5 ? 499 : r < 0.75 ? 399 : 299;
```

Na:
```ts
// Equal distribution: each price point has 1/3 probability
const idx = Math.floor(Math.random() * POINTS.length);
const picked: PricePoint = POINTS[idx];
```

Żadne inne pliki nie są modyfikowane.