import {Component} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {FormGroup} from '@angular/forms';
import {WizardPage} from '../../wizard/wizard-page';
import {FileViewerWizard} from '../file-viewer-wizard';
import {WizardWidth} from "../../wizard/wizard-width.enum";
import {FileService} from "../../file/file.service";

@Component({
  selector: 'cca-file-viewer-page',
  templateUrl: './file-viewer-page.component.html',
  styleUrls: ['./file-viewer-page.component.scss']
})
export class FileViewerPageComponent extends WizardPage<FileViewerWizard> {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup({});

  src: string;
  srcHtml: SafeHtml;
  srcArray: ArrayBufferLike;

  constructor(private sanitizer: DomSanitizer,
              private fileService: FileService) {
    super();
    this.isCloseable     = true;
    this.isNextable      = false;
    this.closeButtonText = 'Close';
    this.width = WizardWidth.MAX;
  }

  ngOnInit(): void {
    if (this.wizard.model.fileMimeType === 'image/jpeg' || this.wizard.model.fileMimeType === 'image/png') {
      this.srcHtml = this.sanitizer.bypassSecurityTrustResourceUrl(`data:${this.wizard.model.fileMimeType};base64,${this.wizard.model.file}`);
    } else if (this.wizard.model.fileMimeType === 'application/pdf') {
      this.srcArray = this.fileService.base64ToArrayBuffer(this.wizard.model.file);
    }
  }
}
