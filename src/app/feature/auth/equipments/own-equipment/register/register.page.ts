import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormStep } from 'src/app/core/models/Formstep';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SicaApiService } from 'src/app/core/services/sica-api.service';
import { Supplier } from 'src/app/core/models/Suplplier';
import { ToastService } from 'src/app/core/services/toast.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { BrandTool } from 'src/app/core/models/BrandTool';
import { CategoryTool } from 'src/app/core/models/CategoryTool';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  listProviders: Supplier[];
  listCategoryTool: CategoryTool[];
  listBrands: BrandTool[];
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

  constructor(
    private camera: Camera,
    private sicaApi: SicaApiService,
    private toastService: ToastService,
    private loading: LoadingService
  ) {}

  ngOnInit() {
    this.formBuild();
    this.getProviders();
    this.categoryTool();
  }

  changeSelect(event: any, formControl: string) {
    console.log(event, formControl);
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

  private getProviders(): void {
    // this.loading.initLoading('Obteniendo proveedores');
    this.sicaApi.getSupplier().subscribe(
      (sup) => {
        this.listProviders = sup;
        // this.loading.endLoading();
        this.getBrandsTools();
      },
      (err) => {
        this.loading.endLoading();
        this.toastService.createToast(
          'Ocurrió un error con proveedores',
          'danger'
        );
      }
    );
  }

  private getBrandsTools(): void {
    // this.loading.initLoading('Obteniendo  marcas');
    this.sicaApi.getBrandsTool().subscribe(
      (bran) => {
        this.loading.endLoading();
        this.listBrands = bran;
      },
      (err) => {
        this.loading.endLoading();
        this.toastService.createToast('Ocurrió un error con marcas', 'danger');
      }
    );
  }


  private categoryTool(): void {
    // this.loading.initLoading('Obteniendo  marcas');
    this.sicaApi.getCategoryTool().subscribe(
      (tool) => {
        this.loading.endLoading();
        this.listCategoryTool = tool;
      },
      (err) => {
        this.loading.endLoading();
        this.toastService.createToast('Ocurrió un error con marcas', 'danger');
      }
    );
  }

  private formBuild(): void {
    this.registerForm = new FormGroup({
      codeBar: new FormControl('', Validators.required),
    });
  }
}
