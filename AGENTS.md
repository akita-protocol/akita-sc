# Repository instructions

## Building smart contracts

Always compile the contracts from the repository root with:

```sh
algokit project run build
```

Do not compile individual contracts or contract subdirectories directly. The contracts are interconnected, and the root build ensures that all dependencies are compiled together and generated artifacts are written to the correct locations.
