import { DetalleIngreso } from './detalleIngreso';
export class Ingreso{
  //id: number;
  nota: string;
  fechaIngreso: Date;
  impuesto: number;
  totalSD: number;
  totalD: number;
  total: number;
  estado: string;
  inventarioId: number;
  tipoDocumentoId: number;
  proveedorId: number;
  listDetalleIngreso: DetalleIngreso[];
}
