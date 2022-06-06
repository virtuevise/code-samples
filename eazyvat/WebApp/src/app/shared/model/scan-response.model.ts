export interface IScanResponse {
    sdkVersion?: string;
    result?: IScanResult;
    reportedError?: string;
    message?: string;
  }
  
  
  export interface IScanResult {
  dateOfBirth?: string;
  dateOfExpiry?: string;
  documentNumber?: string;
  documentType?: string;
  formattedDateOfBirth?: string;
  formattedDateOfExpiry?: string;
  givenNames?: string;
  issuingCountryCode?: string;
  mrzString?: string;
  nationalityCountryCode?: string;
  personalNumber?: string;
  sex?: string;
  surname?: string;
  message?: string;
  }
  