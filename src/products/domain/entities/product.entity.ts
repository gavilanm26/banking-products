export class ProductEntity {
  public readonly documentType: string;
  public readonly documentNumber: string;
  public readonly loanAmount: number;
  public readonly loanTerm: string;
  public readonly interestRate: string;
  public readonly status: string;
  public readonly customerKey: string;
  public readonly productName: string;

  private constructor(
    documentType: string,
    documentNumber: string,
    loanAmount: number,
    loanTerm: string,
    interestRate: string,
    status: string,
    customerKey: string,
    productName: string, // Nuevo campo para el nombre del producto
  ) {
    this.documentType = documentType;
    this.documentNumber = documentNumber;
    this.loanAmount = loanAmount;
    this.loanTerm = loanTerm;
    this.interestRate = interestRate;
    this.status = status;
    this.customerKey = customerKey;
    this.productName = productName;
  }

  static create(
    documentType: string,
    documentNumber: string,
    loanAmount: number,
    loanTerm: string,
    interestRate: string,
    status: string,
    customerKey: string,
    productName: string,
  ): ProductEntity {
    return new ProductEntity(
      documentType,
      documentNumber,
      loanAmount,
      loanTerm,
      interestRate,
      status,
      customerKey,
      productName,
    );
  }
}
