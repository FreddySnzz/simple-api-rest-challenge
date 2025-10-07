import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiStandardResponses() {
  return applyDecorators(
    ApiResponse({ status: 200, description: 'Sucesso.' }),
    ApiResponse({ status: 201, description: 'Criado com sucesso.' }),
    ApiResponse({ status: 400, description: 'Requisição inválida.' }),
    ApiResponse({ status: 401, description: 'Não autorizado.' }),
    ApiResponse({ status: 404, description: 'Recurso não encontrado.' }),
    ApiResponse({ status: 500, description: 'Erro interno do servidor.' }),
  );
};
