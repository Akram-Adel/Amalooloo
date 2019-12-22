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
  note:string;

  constructor(
    private router: Router,
    private general:GeneralService) { }

  ngOnInit() {
    this.general.getQuestionList().subscribe((res:any) => {
      this.questionList = res.result

      for (let i = 0; i < this.questionList.length; i++) {
        this.questionList[i].value = null;
      }

      this.isLoading = false;
      console.log(this.questionList);
    });
  }

  answer(id:number, value:string) {
    let index = _.findIndex(this.questionList, ['id', id]);
    this.questionList[index].value = value;
  }

  next() {
    let index = _.findIndex(this.questionList, ['value', null]);

    if(index != -1) {
      this.general.presentAlertMsg('Please answer all the questions');
      return;
    }

    this.general.loadsheetData.question_details[0].note = this.note;
    this.router.navigate(['construction/construction-feedback']);
  }

}
