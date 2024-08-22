export class ProductEntity {
  constructor(
    public readonly documentType: string,
    public readonly documentNumber: string,
    public readonly nameProduct: string,
    public readonly typeProduct: string,
    public readonly customerKey: string,
    public readonly status: string,
  ) {}
}
