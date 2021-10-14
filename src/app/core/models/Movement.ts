export interface Movement {
  id: string;
  reason: Reason;
  devolutionEstimatedDate: string;
  date: string;
  receiptDate: string;
  origin: Origin;
  destination: Origin;
  tool: Tool;
}

