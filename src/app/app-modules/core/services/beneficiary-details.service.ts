import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BeneficiaryDetailsService {
  beneficiaryDetails = new BehaviorSubject<any>(null);
  beneficiaryDetails$ = this.beneficiaryDetails.asObservable();

  HRPPositive: any = '';

  HRPPositiveFlag = new BehaviorSubject(this.HRPPositive);
  HRPPositiveFlag$ = this.HRPPositiveFlag.asObservable();
  cbacData: any = [];
  healthID: any;
  constructor(private http: HttpClient) {}

  getBeneficiaryDetails(beneficiaryRegID: string, benFlowID: string) {
    this.http
      .post(environment.getBeneficiaryDetail, {
        beneficiaryRegID: beneficiaryRegID,
        benFlowID: benFlowID,
      })
      .subscribe(
        (res: any) => {
          if (res.data) {
            this.beneficiaryDetails.next(res.data);
          }
        },
        (err: any) => {
          this.beneficiaryDetails.next(null);
        },
      );
  }

  getBeneficiaryImage(beneficiaryRegID: string) {
    return this.http.post(environment.getBeneficiaryImage, {
      beneficiaryRegID: beneficiaryRegID,
    });
  }

  reset() {
    this.beneficiaryDetails.next(null);
  }

  setHRPPositive() {
    this.HRPPositive = 1;
    this.HRPPositiveFlag.next(1);
  }

  resetHRPPositive() {
    this.HRPPositive = 0;
    this.HRPPositiveFlag.next(0);
  }

  getCBACDetails(beneficiaryRegID: string) {
    return this.http.post(environment.getBenCBACDetails, {
      benRegID: beneficiaryRegID,
    });
  }
}
