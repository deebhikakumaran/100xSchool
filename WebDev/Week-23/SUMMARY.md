# auth demo - state lifting vs context api

two ways to get the appbar to show your username after login. same UI, same components (mostly), two different data-flow strategies. flip between them with the tabs at the top.

## structure

```
src/
  components/
    AppBar.jsx      
    Login.jsx
    Home.jsx
    AppBarContext.jsx  
    LoginContext.jsx
    HomeContext.jsx
  context/
    AuthContextProvider.jsx   
  StateLifting.jsx 
  ContextAPI.jsx    
  App.jsx               
```

## run it

```sh
npm install
npm run dev
```

## test it

```sh
npm test
```

covers both approaches: login updates the appbar, logout resets it.

## tl;dr on the comparison

- **state lifting**: parent holds state, passes it + callbacks down as props. dead simple, but every layer in between has to forward props it doesn't care about.
- **context api**: wrap once with `AuthProvider`, any descendant calls `useContext(AuthContext)` directly. no prop drilling, but there's a provider + context file to set up, and it's harder to trace where a state change comes from just by reading a component.

for a two-component app like this, honestly not much difference. context starts winning once you've got 4+ levels of nesting between the state and the component that needs it.