/**
 * Cabeçalho dos documentos A4 da Central de Recursos.
 * No modo público os campos são marcadores para a entidade preencher.
 * Os templos, lotes e envios de demonstração saíram em 24/11/2026 (plano 013):
 * tinham CNPJ e selos fictícios.
 */
export interface TemploMock {
  id: string;
  nome: string;
  cidade: string;
  dirigente: string;
  cnpj: string;
}
