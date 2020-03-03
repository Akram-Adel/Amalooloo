import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  API_BASE_URL = 'https://amalooloo.group/api'
  Image_BASE_URL = 'https://amalooloo.group/images'

  emailPattern:RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  private mode = new Subject<boolean>();
  customerMode$:Observable<boolean> = this.mode.asObservable();

  public customerMode:boolean;
  public notifications = [];

  public userToken:string;
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
  public navLat:any;public navlong;
  public allDeliveries:any; public isDeliveryCompleted:boolean; public detailedDelivery:any;
  public constructionID:number; public constructionNumber:number; public constructionStatus = "Construction";
  public isNewConstruction:boolean = true; public constructionType:string;
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


  getAllNotifications() {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken);

    return this.http.get(this.API_BASE_URL+`/get-user-notifications/${ this.userObject.id}`,{headers});
  }
  setAllNotificationsRead(notificationID:string) {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken);

    return this.http.get(this.API_BASE_URL+`/set-notification-read/${notificationID}`,{headers});
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
  getQuestionList(type:number) {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = {
      type: type
    };

    return this.http.post(this.API_BASE_URL+'/get-question-list',data,{headers});
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
  getUserConstructionList() {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = {
      contractor_id: this.userObject.id
    };

    return this.http.post(this.API_BASE_URL+'/get-construction-contractor-list',data,{headers});
  }
  getUploadedPdf() {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken);

    return this.http.get(this.API_BASE_URL+'/get-uploaded-pdf',{headers});
  }
  getAllMaintenance() {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = {
      user_id: this.userObject.id,
      token: this.userToken
    };

    return this.http.post(this.API_BASE_URL+'/get-all-maintenance-web',data,{headers});
  }
  getMaintenanceProjectList(id:number) {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = {
      user_id: this.userObject.id,
      maintenance_id: id,
      token: this.userToken
    };

    return this.http.post(this.API_BASE_URL+'/get-maintenance-project-list',data,{headers});
  }
  getMaintenanceConstructionList(id:number) {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = {
      user_id: this.userObject.id,
      project_id: id,
      token: this.userToken
    };

    return this.http.post(this.API_BASE_URL+'/get-maintenance-construction-list',data,{headers});
  }
  getMyMaintenanceReq() {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken);

    return this.http.get(this.API_BASE_URL+'/get-my-maintenance-requests',{headers});
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
  submitHealthCheck(data:any) {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken);

    return this.http.post(this.API_BASE_URL+'/create-health-check',data,{headers});
  }
  requestMaintenance(GPS:any ,image1:string ,image2:string ,image3:string, reason:string , quote:string) {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
      data = {
        construction_id: this.constructionID,
        latitude: GPS.coords.latitude.toString(),
        longitude: GPS.coords.longitude.toString(),
        image_1:image1,
        image_2:image2,
        image_3:image3,
        reason_for_request:reason,
        quote:quote,
      }

    return this.http.post(this.API_BASE_URL+'/request-maintenance',data,{headers});
  }

  public loadsheetData = {
    loadsheet_id: null,
    delivery_id: null,
    project_id: null,
    construction_id: null,
    maintenance_id: null,
    user_id: null,


    order_details: [{
      order_id: null,
      product_details: [{
        product_id: null,
        components: [],
        component_details: [],
      }]
    }],


    verify_loaded: {
      image_1: "null", image_2: "null", image_3: "null",
      note: null
    },
    verify_delivered: {
      image_1: "null", image_2: "null", image_3: "null",
      note: null
    },
    verify_construction: {
      image_1: "null", image_2: "null", image_3: "null",
      note: null
    },


    driver_details: {
      name: null, surname: null,
      sign: null
    },
    betram_emp_details: {
      name: null, surname: null,
      time: null,
      sign: null
    },
    contractor_details: {
      name: null, surname: null,
      sign: null,
    },
    beneficiary_details: {
      name: null, surname: null,
      sign: null,
    },

    beneficiary_id: null,
    beneficiary_stand_no: null,
    beneficiary_description: null,
    question_details: [{
      question_id: null,
      answer: null,
      note: null
    }],
    contractor_id: null,
    construction_address: null,
    const_latitude: null,
    const_longitude: null,

    vehicle_reg_no: null,
    timestamp: null
  }
  submitLoadsheet() {
    let date = new Date()
    let timeStamp = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate() +' '+ date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds();

    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = this.loadsheetData;
    data.timestamp = timeStamp;

    return this.http.post(this.API_BASE_URL+'/submit-loadsheet',data,{headers});
  }
  submitDelivery() {
    let date = new Date()
    let timeStamp = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate() +' '+ date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds();

    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = this.loadsheetData;
    data.timestamp = timeStamp;

    return this.http.post(this.API_BASE_URL+'/submit-delivery',data,{headers});
  }
  submitConstruction() {
    let date = new Date()
    let timeStamp = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate() +' '+ date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds();

    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = this.loadsheetData;
    data.timestamp = timeStamp;

    return this.http.post(this.API_BASE_URL+'/submit-construction',data,{headers});
  }
  submitMaintenance() {
    let date = new Date()
    let timeStamp = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate() +' '+ date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds();

    const headers = new HttpHeaders()
      .set("Authorization", "Bearer "+this.userToken),
    data = this.loadsheetData;
    data.timestamp = timeStamp;

    return this.http.post(this.API_BASE_URL+'/submit-maintenance',data,{headers});
  }
  dataCleanup() {
    this.loadsheetData = {
      loadsheet_id: null,
      delivery_id: null,
      project_id: null,
      construction_id: null,
      maintenance_id: null,
      user_id: null,


      order_details: [{
        order_id: null,
        product_details: [{
          product_id: null,
          components: [],
          component_details: [],
        }]
      }],


      verify_loaded: {
        image_1: "null", image_2: "null", image_3: "null",
        note: null
      },
      verify_delivered: {
        image_1: "null", image_2: "null", image_3: "null",
        note: null
      },
      verify_construction: {
        image_1: "null", image_2: "null", image_3: "null",
        note: null
      },


      driver_details: {
        name: null, surname: null,
        sign: null
      },
      betram_emp_details: {
        name: null, surname: null,
        time: null,
        sign: null
      },
      contractor_details: {
        name: null, surname: null,
        sign: null,
      },
      beneficiary_details: {
        name: null, surname: null,
        sign: null,
      },

      beneficiary_id: null,
      beneficiary_stand_no: null,
      beneficiary_description: null,
      question_details: [{
        question_id: null,
        answer: null,
        note: null
      }],
      contractor_id: null,
      construction_address: null,
      const_latitude: null,
      const_longitude: null,

      vehicle_reg_no: null,
      timestamp: null
    }
    this.allLoadsheets = null; this.isLoadsheetCompleted = null;
    this.allDeliveries = null; this.isDeliveryCompleted = null; this.detailedDelivery = null;
    this.constructionID = null; this.constructionNumber = null; this.constructionStatus = null;
    this.isNewConstruction = null; this.constructionType = null;
    this.allOrders = [];
  }

}
