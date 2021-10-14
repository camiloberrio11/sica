export interface BodyCreateLoan {
  deliveredBy: string;
  receivedBy: string;
  quantity: number;
  days: number;
  tasks: string;
  remark: string;
  tool: string;
}

export interface BodyUpdateLoan {
  return: Return;
}


interface Return {
  deliveredBy: string;
  receivedBy: string;
  detail: Detail;
  remark: string;
}

interface Detail {
  status: string;
  quantity: number;
}
