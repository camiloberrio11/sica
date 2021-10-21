import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormStep } from 'src/app/core/models/Formstep';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  };
  itemsForm: FormStep[] = [
    { title: 'Fotos', status: true },
    { title: 'Datos', status: false },
    { title: 'Factura', status: false },
  ];
  indexCurrentForm = 0;
  labelBtn = 'Continuar';

  constructor(private camera: Camera) {}

  ngOnInit() {
    this.formBuild();
  }

  currentForm(event: number) {
    this.indexCurrentForm = event;
    const updateList: FormStep[] = [];
    for (let index = 0; index < this.itemsForm?.length; index++) {
      const status = index <= event;
      const element = this.itemsForm[index];
      updateList.push({ title: element.title, status });
    }
    this.itemsForm = updateList;
  }

  handleNext() {
    this.indexCurrentForm = this.indexCurrentForm + 1;

    this.itemsForm = this.itemsForm.map((item) => {
      if (item?.title === this.itemsForm[this.indexCurrentForm]?.title) {
        item.status = true;
      }
      return item;
    });
    const existNext =
      this.itemsForm.filter((item) => item?.status === true)?.length ===
      this.itemsForm.length;
    if (existNext) {
      this.labelBtn = 'Guardar';
    }
  }

  capturePhotos(): void {
    this.camera.getPicture(this.options).then(
      (imageData) => {
        const base64Image = 'data:image/jpeg;base64,' + imageData;
        console.log(base64Image);
      },
      (err) => {
        console.warn(err);
        // Handle error
      }
    );
  }

  private formBuild(): void {
    this.registerForm = new FormGroup({
      codeBar: new FormControl('', Validators.required),
    });
  }
}
