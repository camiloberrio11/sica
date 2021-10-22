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
import { BodyRequestCreateTool } from 'src/app/core/models/Tool';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeScanResult } from 'src/app/core/models/BarcodeResult';



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
  isEndForm = false;

  constructor(
    private camera: Camera,
    private sicaApi: SicaApiService,
    private toastService: ToastService,
    private loading: LoadingService,
    private barcodeScanner: BarcodeScanner
  ) {}

  ngOnInit() {
    this.formBuild();
    this.getProviders();
    this.categoryTool();
  }

  scanCodeBar() {
    this.barcodeScanner
      .scan()
      .then((barcodeData: BarcodeScanResult) => {
        this.registerForm.patchValue({ codeBar: barcodeData?.text });
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  changeSelect(event: any, formControl: string) {
    const model = event?.detail?.value;
    if (model) {
      this.registerForm.patchValue({ [formControl]: model });
    }
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
    if (this.labelBtn === 'Guardar') {
      this.handleSaveRegister();
    }
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
      return;
    }
  }

  handleSaveRegister(): void {
    const values = this.registerForm?.value;
    console.log(values);
    const body: BodyRequestCreateTool = {
      invoice: {
        date: values?.invoiceDate,
        number: values?.invoiceNumber,
        supplier: values?.supplier,
        price: +values?.invoicePrice,
        warranty: +values?.warranty,
      },
      tool: {
        image:
          values?.photoOwn ||
          'https://res.cloudinary.com/dupegtamn/image/upload/v1634866658/tools_zx27zy.jpg',
        barcode: values?.codeBar,
        reference: values?.reference,
        serial: values?.serie,
        category: values?.categoryTool,
        brand: values?.brand,
        profile: '616b874008dbdcc901e43699',
      },
    };
    this.createTool(body);
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
      photoOwn: new FormControl('', Validators.required),
      categoryTool: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      reference: new FormControl('', Validators.required),
      serie: new FormControl('', Validators.required),
      supplier: new FormControl('', Validators.required),
      invoiceNumber: new FormControl('', Validators.required),
      invoiceDate: new FormControl('', Validators.required),
      invoicePrice: new FormControl('', Validators.required),
      warranty: new FormControl('', Validators.required),
    });
  }

  private createTool(body: BodyRequestCreateTool): void {
    this.loading.initLoading('Creando');
    this.sicaApi.saveTool(body).subscribe(
      (data) => {
        console.log(data);
        this.loading.endLoading();
        this.toastService.createToast('Se ha creado con éxito', 'success');
        this.itemsForm = [
          { title: 'Fotos', status: true },
          { title: 'Datos', status: false },
          { title: 'Factura', status: false },
        ];
        this.indexCurrentForm = 0;
        this.labelBtn = 'Continuar';
        this.isEndForm = false;
      },
      (err) => {
        this.loading.endLoading();
        this.toastService.createToast(
          'Ha ocurrido un error en la creación',
          'danger'
        );
      }
    );
  }
}
