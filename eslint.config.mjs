import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default tseslint.config(...tseslint.configs.recommended, {
  plugins: {
    prettier: eslintPluginPrettier,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        trailingComma: 'es5',
      },
    ],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
});
