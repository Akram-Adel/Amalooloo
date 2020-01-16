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

  constructor(
    private router: Router,
    private general:GeneralService) { }

  ngOnInit() {
    let type:number;
    (this.general.constructionStatus == 'Construction') ? type = 2 : type = 1;
    this.general.getQuestionList(type).subscribe((res:any) => {
      this.questionList = res.result

      for (let i = 0; i < this.questionList.length; i++) {
        this.questionList[i].value = null;
        this.questionList[i].note = null;
        this.questionList[i].question_id = this.questionList[i].id;
      }

      this.isLoading = false;
      console.log(this.questionList);
    });
  }

  answer(id:number, value:string) {
    let index = _.findIndex(this.questionList, ['id', id]);
    this.questionList[index].value = value;
  }
  noteChanged(id:number, note:string) {
    let index = _.findIndex(this.questionList, ['id', id]);
    this.questionList[index].note = note;
  }

  next() {
    let index = _.findIndex(this.questionList, ['value', null]);

    if(index != -1) {
      this.general.presentAlertMsg('Please answer all the questions');
      return;
    }

    this.general.loadsheetData.question_details = this.questionList;
    this.router.navigate(['construction/construction-feedback']);
  }

}
