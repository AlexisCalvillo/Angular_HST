import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType} from '../shared/feedback';
import { flyInOut, visibility, expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style': 'display: block'

  },
  animations:[
    flyInOut(),
    expand(),
    visibility()
  ]
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback: Feedback;
  errMess: String;
  spinSh: boolean;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective;

  formErrors={
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages={
    'firstname':{
      'required': 'Pon tu nombre verta',
      'minlength': 'Más de dos caracteres',
      'maxlength': 'Pero tampoco te pases de 25'
    },
    'lastname':{
      'required': 'Pon tu apellido verta',
      'minlength': 'Más de dos caracteres',
      'maxlength': 'Pero tampoco te pases de 25'
    },
    'telnum':{
      'required': 'Pont tú número',
      'pattern': 'Solo números'
    },
    'email':{
      'required': 'Pon tu mail',
      'email': 'Pon uno real'
    }
  };
  constructor(private fb: FormBuilder,
    private fbService: FeedbackService) {
      this.createForm()
      this.spinSh=false;
   }

   
  ngOnInit() {
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    
    this.feedbackForm.valueChanges
    .subscribe(data=> this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?:any){
    if(!this.feedbackForm){ return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field]='';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for (const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field]+=messages[key]+ '';
            }
          }
        }
      }
    } 
  }

  resetFeedback(){
    this.feedback=null;
    this.spinSh=false;
  }

  onSubmit(){
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    var feedbackCopy;

    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    setTimeout(()=>{
      this.fbService.submitFeedback(this.feedback)
    .subscribe(feedback =>{
      this.feedback = feedback
    },
    errMess =>{
      this.feedback=null;
      this.errMess = <any>errMess;
    })
    this.spinSh=true;
    },1500)
    this.feedbackFormDirective.resetForm();
    setTimeout(()=>{
      this.resetFeedback();
    },5000);
    
  }


}
