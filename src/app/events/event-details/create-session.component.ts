import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession } from '../shared/event.model';

@Component({
    selector: 'create-session',
    templateUrl: './create-session.component.html'
})

export class CreateSessionComponent implements OnInit {

    newSessionForm: FormGroup;
    name: FormControl;
    presenter: FormControl;
    duration: FormControl;
    level: FormControl;
    abstract: FormControl;

    @Output() saveNewSession = new EventEmitter();
    @Output() cancelAddSession = new EventEmitter();

    ngOnInit() {
        this.name = new FormControl('', Validators.required);
        this.presenter = new FormControl('', Validators.required);
        this.duration = new FormControl('', Validators.required);
        this.level = new FormControl('', Validators.required);
        this.abstract = new FormControl('', [Validators.required, this.restrictedWords]);

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
    }

    private restrictedWords(control: FormControl): { [key: string]: any} {
        return control.value.includes('foo') ? {'restrictedWords': 'foo'} : null
    }

    saveSession(formValue){
        let session: ISession = {
            id: null,
            name: formValue.name,
            presenter: formValue.presenter,
            duration: +formValue.duration,
            level: formValue.level,
            abstract: formValue.abstract,
            voters: []
        }

        this.saveNewSession.emit(session);
    }

    cancel(){
        this.cancelAddSession.emit();
    }


}

