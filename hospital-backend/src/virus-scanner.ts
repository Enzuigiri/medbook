export type IssueDetected = Boolean;

export interface Scanner {
  /**
   * Scan the file for viruses. Return wheter an issue detected
   *
   * @param filename the upload to scan
   * @return A promise that resolves to true if an issue was detected, False if no issue was detected
   */
  scan(filename: String): Promise<IssueDetected>;
}

export class ThreatProtecScanner implements Scanner {
  scan(filename: String): Promise<IssueDetected> {
    throw new Error("Method not implemented.");
  }
}

export class SynergySecurityScanner implements Scanner {
  scan(filename: String): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
}
