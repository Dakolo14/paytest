# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


# Payfly Landing Page Template

## <a href="https://ui.shadcn.com/" target="_blank">ShadcnUI</a> + <a href="https://react.dev/" target="_blank">React</a> + <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> + <a href="https://tailwindcss.com/" target="_blank">Tailwind</a> + <a href="https://vitejs.dev/" target="_blank">Vite</a>.


Check out our live application only built for mobile devices. <a href="https://paytest-tau.vercel.app/" target="_blank">Live Demo</a>

## Sections For Landing Page

- [x] Navbar
- [x] Hero
- [x] Sponsors
- [x] About
- [x] Statistics
- [x] How It Works
- [x] Call-to-Action (CTA)
- [x] Team
- [x] Frequently Asked Questions(FAQ)
- [x] Footer

## Routes For Landing Page

- [x] Landing Page "/"
- [x] About "/about"
- [x] How To "howto"
- [x] Developer "developer"

## Features For Landing Page

- [x] Mobile Application Design Only
- [x] User Friendly Navigation
- [x] Scroll to Top Feature
- [x] Meta description tags


## Sections For Root Application Page

- [x] Topbar
- [x] Outlet
- [x] Bottombar


## Routes For Root Application Page

- [x] Homepage "/home"
- [x] Cards "/cards"
- [x] Transactions "transaction"
- [x] Me "/profile"

## Routing was fixed by creating a vercel.json file to store all routes to the main destination.