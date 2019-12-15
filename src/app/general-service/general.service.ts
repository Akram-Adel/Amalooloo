import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  API_BASE_URL = 'http://41.76.108.45/api'

  emailPattern:RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  private mode = new Subject<boolean>();
  customerMode$:Observable<boolean> = this.mode.asObservable();

  public customerMode:boolean;
  public constructionID:Number;

  public userToken:string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjc4LCJpc3MiOiJodHRwOi8vNDEuNzYuMTA4LjQ1L2FwaS9sb2dpbiIsImlhdCI6MTU3NjQ0NDI3NCwiZXhwIjoxNTc2NDgwMjc0LCJuYmYiOjE1NzY0NDQyNzQsImp0aSI6ImdodDV6MnBIN0VlT3FDd0IifQ.SbB251tflIZn7tGh4CGpSgEl3rasMf1twOVPonDOKDk";
  public userObject:any;

  constructor(
    private alertController: AlertController,
    private http: HttpClient) { }


  // SUPPORT CLASS FUNCTIONS
  async presentAlertMsg(msg:string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentAlertHandler(message:string, handler:any) {
    const alert = await this.alertController.create({
      message: message,
      buttons: [{
        text: 'Ok',
        handler: handler
      }]
    });

    await alert.present();
  }
  changeMode(isCustomer:boolean) {
    this.mode.next(isCustomer);
  }

  // API Session Data
  public allLoadsheets:any; public isLoadsheetCompleted:boolean;
  public allDeliveries:any; public isDeliveryCompleted:boolean; public detailedDelivery:any;
  public isNewConstruction:boolean = true;
  public allOrders = [];

  // API CLASS FUNCTIONS
  login(login:any) {
    const data = {
      email_id: login.email,
      password: login.password,
      device_token: login.device_token,
      device_type: login.device_type
    };


    return this.http.post(this.API_BASE_URL+'/login',data,{});
  }
  register(register:any) {
    let date = new Date()
    let timeStamp = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate() +' '+ date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds();

    const data = {
      first_name: register.firstName,
      last_name: register.lastName,
      email_id: register.emailId,
      id_number: register.idNo,
      designation: register.designation,
      contact_no: register.contactNo,
      password: register.password,
      device_token: register.device_token,
      device_type: register.device_type,
      time_stamp: timeStamp,
    };

    let URL:string;
    (this.customerMode) ? URL = this.API_BASE_URL+'/register-customer' : URL = this.API_BASE_URL+'/register-employee';

    return this.http.post(URL,data,{});
  }
  updateProfile(profile:any) {
    let date = new Date()
    let timeStamp = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate() +' '+ date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds();

    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
      data = {
        first_name: profile.firstName,
        last_name: profile.lastName,
        email_id: profile.emailId,
        id_number: profile.idNo,
        designation: profile.designation,
        device_token: profile.device_token,
        device_type: profile.device_type,
        time_stamp: timeStamp,
      };

    return this.http.post(this.API_BASE_URL+'/update-user-info',data,{headers});
  }

  getLoadsheetList() {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = { token: this.userToken };

    return this.http.post(this.API_BASE_URL+'/get-loadsheet',data,{headers});
  }
  getDeliveryList() {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = { token: this.userToken };

    return this.http.post(this.API_BASE_URL+'/get-delivery-list-mob',data,{headers});
  }
  getDeliveryDetail(id:number) {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = {
      token: this.userToken,
      delivery_id: id
    };

    return this.http.post(this.API_BASE_URL+'/get-delivery-detail',data,{headers});
  }
  getConstructionList(status:string) {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = {
      token: this.userToken,
      project_status: status
    };

    return this.http.post(this.API_BASE_URL+'/get-project-list',data,{headers});
  }
  getContractorList(id:number) {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = {
      token: this.userToken,
      project_id: id
    };

    return this.http.post(this.API_BASE_URL+'/contractor-list',data,{headers});
  }
  getQuestionList() {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken)

    return this.http.post(this.API_BASE_URL+'/get-question-list',{},{headers});
  }
  getCompletedConstructionList(id:number) {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = {
      token: this.userToken,
      project_id: id
    };

    return this.http.post(this.API_BASE_URL+'/get-construction-list',data,{headers});
  }
  getUploadedPdf() {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken);

    return this.http.get(this.API_BASE_URL+'/get-uploaded-pdf',{headers});
  }
  getMyMaintenanceReq() {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken);

    return this.http.get(this.API_BASE_URL+'/get-my-maintenance-requests',{headers});
  }
  requestMaintenance(id,gps,image1,image2,image3,firstname,surname,mobile,email) {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
      data = {
        construction_id: id,
        reason_for_request: 'Maintenance Needed',
        latitude: 12.22,
        longitude: 12.22,
        image_1:image1,
        image_2:image2,
        image_3:image3,
        firstname:firstname,
        surname:surname,
        mobile:mobile,
        email:email,
      }

    return this.http.get(this.API_BASE_URL+'/request-maintenance',{headers});
  }
  getQrCode(id:number) {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken);

    return this.http.get(this.API_BASE_URL+'/get-qrcode?construction_id='+id,{headers});
  }
  getLoadsheetOrderList(id:number) {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = { loadsheet_id:id };

    return this.http.post(this.API_BASE_URL+'/get-loadsheet-order-list',data,{headers});
  }
  getOrderDetails(id:number) {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = { order_id:id };

    return this.http.post(this.API_BASE_URL+'/get-order-detail',data,{headers});
  }

  public loadsheetData = {
    loadsheet_id: null,
    delivery_id: null,
    project_id: null,


    order_details: {
      order_id: null,
      product_details: {
        product_id: null,
        components: [],
      }
    },


    verify_loaded: {
      image_1: null, image_2: null, image_3: null,
      note: null
    },
    verify_delivered: {
      image_1: null, image_2: null, image_3: null,
      delivery_note: null
    },
    verify_construction: {
      image_1: null, image_2: null, image_3: null,
      const_note: null
    },


    driver_details: {
      driver_name: null, driver_surname: null,
      driver_sign: null
    },
    betram_emp_details: {
      emp_name: null, emp_surname: null,
      emp_mention_time: null,
      emp_sign: null
    },
    contractor_details: {
      cont_name: null, cont_surname: null,
      cont_sign: null,
    },
    beneficiary_details: {
      beneficiary_name: null, beneficiary_surname: null,
      beneficiary_sign: null,
    },

    beneficiary_id_no: null,
    beneficiary_stand_no: null,
    beneficiary_detail: null,
    // question_details: [],
    // contractor_id: null,
    // const_address: null,
    // const_latitude: null,
    // const_longitude: null,

    vehicle_reg_no: null,
    timeStamp: null
  }
  submitLoadsheet() {
    let date = new Date()
    let timeStamp = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate() +' '+ date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds();

    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = this.loadsheetData;
    data.timeStamp = timeStamp;

    return this.http.post(this.API_BASE_URL+'/submit-loadsheet',data,{headers});
  }
  submitDelivery() {
    let date = new Date()
    let timeStamp = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate() +' '+ date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds();

    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = this.loadsheetData;
    data.timeStamp = timeStamp;

    return this.http.post(this.API_BASE_URL+'/submit-delivery',data,{headers});
  }
  submitConstruction() {
    let date = new Date()
    let timeStamp = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate() +' '+ date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds();

    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = this.loadsheetData;
    data.timeStamp = timeStamp;

    return this.http.post(this.API_BASE_URL+'/submit-construction',data,{headers});
  }

}
