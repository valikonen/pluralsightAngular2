import  { Component, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Component({
    selector: 'simple-modal',
    template: `
        <div id="{{ elementId }}" #modalcontainer class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" data-dismiss="modal"> <span>&times;</span> </button>
                        <h4 class="modal-title"> {{ title }} </h4>
                    </div>

                    <div class="modal-body" (click)="closeModal()">
                        <ng-content></ng-content>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .modal-body {
            height: 250px; 
            overflow-y: auto;
        }
    `]
})

export class SimpleModalComponent {
    
    @Input() title: string;
    @Input() elementId: string;
    @Input() canclose: any;

    @ViewChild('modalcontainer') containerEl: ElementRef;

    constructor(@Inject(JQ_TOKEN) private $: any) {
        
    }

    
    closeModal() {
        if( this.canclose.toLowerCase() === "true" ) {
            this.$(this.containerEl.nativeElement).modal('hide');
        }
    }

}