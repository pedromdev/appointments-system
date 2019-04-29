export const validation = state => ({
  errors: {
    has(name) {
      if (!state.validationErrors.fields || !Array.isArray(state.validationErrors.fields)) return;

      return !!state.validationErrors.fields.find(field => field.path === name);
    },
    get(name) {
      if (!state.validationErrors.fields || !Array.isArray(state.validationErrors.fields)) return;

      const fieldError = state.validationErrors.fields.find(field => field.path === name);

      if (!fieldError) return;

      return fieldError.message;
    }
  }
});