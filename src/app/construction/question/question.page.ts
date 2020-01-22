import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as _ from 'lodash';

import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  isLoading = true;
  questionList:any;
  questionList_toSend:any = [];

  constructor(
    private router: Router,
    public general:GeneralService) { }

  ngOnInit() {
    let type:number;
    (this.general.constructionStatus == 'Construction') ? type = 2 : type = 1;
    this.general.getQuestionList(type).subscribe((res:any) => {
      this.questionList = res.result

      for (let i = 0; i < this.questionList.length; i++) {
        this.questionList_toSend.push({answer: null, note: 'null', question_id: null});
      }
      for (let i = 0; i < this.questionList.length; i++) {
        this.questionList[i].answer = null;
        this.questionList_toSend[i].answer = null;
        this.questionList_toSend[i].note = 'null';
        this.questionList_toSend[i].question_id = this.questionList[i].id.toString();
      }

      this.isLoading = false;
      console.log(this.questionList);
    });
  }

  answer(id:number, value:string) {
    let index = _.findIndex(this.questionList, ['id', id]);
    this.questionList[index].answer = value;
    this.questionList_toSend[index].answer = value;
  }
  noteChanged(id:number, note:string) {
    let index = _.findIndex(this.questionList, ['id', id]);
    this.questionList_toSend[index].note = note;
  }

  next() {
    let index = _.findIndex(this.questionList, ['answer', null]);

    if(index != -1) {
      this.general.presentAlertMsg('Please answer all the questions');
      return;
    }

    this.general.loadsheetData.question_details = this.questionList_toSend;
    this.router.navigate(['construction/construction-feedback']);
  }

}
