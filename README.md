# React Performance Task 

Before optimization
- Flamegraph  <img width="852" alt="Flamegraphbefore" src="https://github.com/user-attachments/assets/19267f56-35a2-4eb9-b184-c1db29371835" />
Ranked Chart 1<img width="843" alt="Perfomancebefore1" src="https://github.com/user-attachments/assets/7a7ce761-289f-433e-88fe-d2f430ffd6c7" />
Ranked Chart 2<img width="844" alt="Perfomancebefore2" src="https://github.com/user-attachments/assets/c42e2243-d9b6-4a40-8b8a-e775fba2742c" />
Ranked Chart 3<img width="839" alt="Perfomancebefore3" src="https://github.com/user-attachments/assets/87466e46-f826-45d1-9bf0-9983eb3bc089" />
Ranked Chart 4<img width="854" alt="Perfomancebefore4" src="https://github.com/user-attachments/assets/ab8505be-0415-4459-af9c-dea102d30a1c" />
Ranked Chart 5<img width="871" alt="Perfomancebefore5" src="https://github.com/user-attachments/assets/fa008a7a-df2f-4b2a-964d-4a1db24244be" />
Ranked Chart 6<img width="837" alt="Perfomancebefore6" src="https://github.com/user-attachments/assets/2ffa2327-6026-45d0-bf18-5f42b1338843" />
Ranked Chart 7<img width="853" alt="Perfomancebefore7" src="https://github.com/user-attachments/assets/504eb12e-dff6-41e7-98ca-359f9a37d9c9" />

- Flamegraph. Cтруктура App и его потомков(дерево компонентов)
- Ranked Cart1. Рендер занял 9.1 мс, при том что сам App рендерился 0.9 мс, все остальное время это рендер его многочисленнных детей/children. Подборка стран Азии.
- Ranked Cart2. Рендер занял 24.2 мс, при том что сам App рендерился 4.2 мс, все остальное время это рендер его многочисленнных детей/children. Подборка стран Европы, редер занял больше времени из-за большего количества потомков.
- Ranked Cart3. Был ранжированы страны Европы по имени. 
- Ranked Chart 4-7. Был произведен поиск стран на 'N' среди европейских стран. Ranked Chart 4 рендер трех стран.  Ranked Chart 5-6 рендер двух стран('Nor'=> Norway и North Macedonia). По итогу Северная Македония  перерерисовывались 5 раз, Норвегия 6 раз. 


After optimization

<img width="838" alt="AfterOpt1" src="https://github.com/user-attachments/assets/5ed4e456-8da4-46f5-aa3f-670c6359e763" />
<img width="835" alt="AfterOpt2" src="https://github.com/user-attachments/assets/dc4b8f7b-d368-42c9-b2ae-b533456574f0" />
<img width="836" alt="AfterOpt3" src="https://github.com/user-attachments/assets/178dff27-f5bc-4b37-9602-cc4981dc9e0e" />
<img width="833" alt="AfterOpt4" src="https://github.com/user-attachments/assets/7062e8c1-467c-469a-b536-b0b11f5210c1" />
<img width="830" alt="AfterOpt5png" src="https://github.com/user-attachments/assets/31634d77-dc63-4865-955d-eb1679510bb5" />
<img width="841" alt="AfterOpt6png" src="https://github.com/user-attachments/assets/90973f19-1127-4a32-a3be-ce809687cd94" />

- Из=за оптимизации время рендера сократилось в среднем в 3 раза. Фаза коммита осталась прежней т.к совершались одинаковые действия как до так и после оптимизации. Новрегия и Северная Македония рендерились только одии раз во  время клика по выбору региона благодаря React.memo. Поэтому в дальнейшм мы видим все страны (включая Новрегию и Северную Македонию)  на Flamegraph серого цвета. 

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
