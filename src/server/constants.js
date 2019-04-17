export const RESPONSE_ERRORS = {
  UNAUTHORIZED: {
    type: "unauthorized",
    message: "Você não tem autorização de acessar uma área reservada. Por favor, faça o login para ter acesso."
  },
  FORBIDDEN: {
    type: "forbidden",
    message: "Você não tem permissão para executar esta ação."
  },
  INTERNAL_SERVER_ERROR: {
    type: "internal_server_error",
    message: "Ocorreu um erro enquanto esta operação foi executada."
  }
};